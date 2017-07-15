const ConnectionFactory = require('./factories/connectionFactory.js')
const DiscordListeners = require('./listeners/discordListeners.js')
const RustListeners = require('./listeners/rustListeners.js')
const Redis = require('redis')

class Androgee {
  constructor () {
    // Since Redis is required, we do a simple check for it
    const exec = require('child_process').exec
    exec('which redis-server ', (error, stdout, stderr) => {
      if (error !== null) {
        console.log('Something went wrong while looking for Redis: ' + error)
      } else if (stdout.includes('no redis-server in')) {
        console.log('Redis-server was not found. Exiting...')
        process.exit()
      }
    })

    // Establish a connection to Redis and setup error handling
    this.redis = Redis.createClient()
    this.redis.on('error', function (err) { console.log('Redis errored out with the following: ' + err) })

    // Maintain references to open connections
    this.rustConnection = this.connectRust()
    this.discordConnection = this.connectDiscord()

    // Flush Redis and begin our loops
    this.refreshRedis(this)
    setInterval(this.refreshRedis, 3600000, this)
    setInterval(this.minecraftRequestLoop, 60000, this)
  }
  refreshRedis (self) {
    let existingPlayers = 'There are 0/20 players online:'
    self.redis.get('minecraftPlayers', (err, reply) => {
      if (!err) {
        if (reply !== undefined) { existingPlayers = reply }
        self.redis.flushall((err) => {
          if (!err) {
            console.log('Redis flushed.')
          } else {
            console.log('Failed to flush Redis: ' + err)
          }
        })
        self.redis.set('minecraftPlayers', existingPlayers)
      } else {
        console.log('Failed to reset Minecraft players in Redis: ' + err)
      }
    })
  }
  minecraftRequestLoop (self) {
    self.redis.get('minecraftPlayers', (err, reply) => {
      if (!err) {
        const diff = require('fast-diff')
        const client = new ConnectionFactory('minecraft').exec('list', (res) => {
          if (res.body.length > reply.length) {
            var playerListDif = diff(res.body, reply)
            try {
              if (playerListDif.length >= 4) {
                var newPlayers = playerListDif[4][1]
                if (newPlayers.startsWith(',')) {
                  newPlayers = newPlayers.slice(2)
                }
                let msg = 'The following player(s) have joined: ' + '``' + newPlayers + '``'
                console.log(msg)
                self.discordConnection.client.channels.find('id', process.env.MINECRAFT_CHANNEL).sendMessage(msg)
              }
            } catch (err) {
              console.log('The diff function failed: ' + err)
            }
          }
          self.redis.set('minecraftPlayers', res.body)
        }).connect()
        client.on('error', function (err) {
          console.log(err)
        })
      } else {
        console.log('Minecraft list loop errored out: ' + err)
      }
    })
  }
  connectRust () {
    const connection = new RustListeners(new ConnectionFactory('rust'), this)
    return connection
  }
  connectDiscord () {
    return new DiscordListeners(new ConnectionFactory('discord'), this)
  }
}
module.exports = Androgee
