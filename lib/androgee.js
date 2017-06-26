const ConnectionFactory = require('./factories/connectionFactory.js')
const DiscordEvents = require('./discordEvents.js')
const RustEvents = require('./rustEvents.js')
const Redis = require('redis')

class Androgee {
  constructor () {
    this.redis = Redis.createClient()
    this.redis.on('error', function (err) { console.log('Redis errored out with the following: ' + err) })
    this.initRedis()

    this.connectionFactory = new ConnectionFactory()

    this.discordConnection = this.connectDiscord()
    this.rustConnection = this.connectRust()
    setInterval(this.minecraftRequestLoop, 60000, this)
  }

  initRedis () {
    this.redis.set('defaultPlayers', 'There are 0/20 players online:', Redis.print)
  }
  connectRust () {
    let rust = new RustEvents(new ConnectionFactory().getRustConnection(), this)
    if (rust !== undefined) {
      return rust
    }
  }
  connectDiscord () {
    return new DiscordEvents(new ConnectionFactory().getDiscordConnection(), this)
  }
  minecraftRequestLoop (self) {
    // self is a scoped reference to this (the androgee class)
    self.redis.get('defaultPlayers', function (err, reply) {
      if (!err) {
        const diff = require('fast-diff')
        let client = self.connectionFactory.getMinecraftConnection().exec('list', (res) => {
          if (res.body.length > reply.length) {
            var playerListDif = diff(res.body, reply)
            if (playerListDif.length >= 4) {
              var newPlayers = playerListDif[4][1]
              if (newPlayers.startsWith(',')) {
                newPlayers = newPlayers.slice(2)
              }
              let msg = 'The following player(s) have joined: ' + '``' + newPlayers + '``'
              console.log(msg)
              // self.discordConnection.client.channels.find('id', process.env.MINECRAFT_CHANNEL).setTopic(msg)
              self.discordConnection.client.channels.find('id', process.env.MINECRAFT_CHANNEL).sendMessage(msg)
            }
          }
          self.redis.set('defaultPlayers', res.body)
        }).connect()
        client.on('error', function (err) {
          console.log(err)
        })
      } else {
        console.log('Minecraft list loop errored out: ' + err)
      }
    })
  }
}
module.exports = Androgee
