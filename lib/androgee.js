const ConnectionFactory = require('./factories/connectionFactory.js')
const MinecraftFactory = require('./factories/minecraftFactory.js')
const DiscordEvents = require('./discordEvents.js')
const RustEvents = require('./rustEvents.js')
const Comm = require('./factories/commandFactory.js')

class Androgee {
  constructor () {
    let blank = new Comm()
    blank.setMinecraftTime()
    this.minecraftPlayers = 'There are 0/20 players online:'
    this.connectionFactory = new ConnectionFactory()
    this.minecraftFactory = new MinecraftFactory()

    this.discordConnection = this.connectDiscord()
    this.rustConnection = this.connectRust()
    setInterval(this.minecraftFactory.execList, 60000, this)
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
