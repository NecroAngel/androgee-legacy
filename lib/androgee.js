const ConnectionFactory = require('./factories/connectionFactory.js')
const MinecraftFactory = require('./factories/minecraftFactory.js')
const DiscordEvents = require('./discordEvents.js')
const RustEvents = require('./rustEvents.js')
const Redis = require('redis')
// const Comm = require('./factories/commandFactory.js')

class Androgee {
  constructor () {
    // let blank = new Comm()
    // blank.setMinecraftTime()

    this.redis = Redis.createClient()

    this.redis.on('error', function (err) {
      console.log(err)
    })

    this.redis.set('defaultPlayers', 'There are 0/20 players online:', Redis.print)

    // this.minecraftPlayers = client.get('defaultPlayers', function (reply) { return reply })
    this.connectionFactory = new ConnectionFactory()
    this.minecraftFactory = new MinecraftFactory()

    this.discordConnection = this.connectDiscord()
    this.rustConnection = this.connectRust()
    setInterval(this.minecraftFactory.execList, 1000, this)
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
}
module.exports = Androgee
