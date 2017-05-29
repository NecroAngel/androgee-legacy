const ConnectionFactory = require('./connectionfactory.js')
const MinecraftEvents = require('./minecraftEvents.js')
const DiscordEvents = require('./discordEvents.js')
const RustEvents = require('./rustEvents.js')

class Androgee {
  constructor () {
    this.connectionFactory = new ConnectionFactory()

    this.discordConnection = this.connectDiscord()
    this.rustConnection = this.connectRust()
    this.minecraftConnection = this.connectMinecraft()
    setInterval(this.minecraftConnection.listLoop, 60000, this.minecraftConnection)
  }

  connectRust () {
    let connection = new RustEvents(new ConnectionFactory().getRustConnection(), this)
    this.rustConnection = connection
    return connection
  }
  connectDiscord () {
    return new DiscordEvents(new ConnectionFactory().getDiscordConnection(), this)
  }
  connectMinecraft () {
    return new MinecraftEvents(this)
  }
}
module.exports = Androgee
