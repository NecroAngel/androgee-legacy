const ConnectionFactory = require('./factories/connectionFactory.js')
const DiscordListeners = require('./listeners/discordListeners.js')
const RustListeners = require('./listeners/rustListeners.js')
const Redis = require('redis')

class Androgee {
  constructor () {
    const exec = require('child_process').exec
    exec('redis-server -v', (error, stdout, stderr) => {
      if (error !== null) {
        console.log('Something went wrong while looking for Redis: ' + error)
      } else if (stdout.includes('Redis server v=') === false) {
        console.log('Redis-server was not found and is required for Androgee to operate. Exiting...')
        process.exit()
      }
    })
    this.redis = Redis.createClient()
    this.redis.on('error', function (err) { console.log('Redis errored out with the following: ' + err) })
    this.initRedis()

    this.discordConnection = this.connectDiscord()
    this.rustConnection = this.connectRust()
    setInterval(this.minecraftRequestLoop, 60000, this)
  }
  initRedis () {
    this.redis.set('minecraftPlayers', 'There are 0/20 players online:', Redis.print)
  }
  minecraftRequestLoop (self) {
    // self is a scoped reference to this (the androgee class)
    self.redis.get('minecraftPlayers', function (err, reply) {
      if (!err) {
        const diff = require('fast-diff')
        let client = new ConnectionFactory('minecraft').exec('list', (res) => {
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
                //self.discordConnection.client.channels.find('id', process.env.MINECRAFT_CHANNEL).sendMessage(msg)
              }
            } catch (err) {
              console.log('The diff function failed again: ' + err)
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
    return new RustListeners(new ConnectionFactory('rust'), this)
  }
  connectDiscord () {
    return new DiscordListeners(new ConnectionFactory('discord'), this)
  }
}
module.exports = Androgee
