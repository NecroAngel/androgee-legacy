const ConnectionFactory = require('./factories/connectionFactory.js')
const MinecraftFactory = require('./factories/minecraftFactory.js')
const MinecraftEvents = require('./minecraftEvents.js')
const DiscordEvents = require('./discordEvents.js')
const RustEvents = require('./rustEvents.js')

class Androgee {
  constructor () {
    this.minecraftPlayers = 'There are 0/20 players online:'
    this.connectionFactory = new ConnectionFactory()
    this.minecraftFactory = new MinecraftFactory()

    this.discordConnection = this.connectDiscord()
    this.rustConnection = this.connectRust()
    this.minecraftConnection = this.connectMinecraft()
    setInterval(this.minecraftFactory.execList, 60000, this)
  }

  connectRust () {
    return new RustEvents(new ConnectionFactory().getRustConnection(), this)
  }
  connectDiscord () {
    return new DiscordEvents(new ConnectionFactory().getDiscordConnection(), this)
  }
  connectMinecraft () {
    return new MinecraftEvents(this)
  }
}
module.exports = Androgee
