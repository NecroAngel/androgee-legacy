const ConnectionFactory = require('./connectionfactory.js')
const MinecraftEvents = require('./minecraftEvents.js')
const DiscordEvents = require('./discordEvents.js')
const RustEvents = require('./rustEvents.js')

class Androgee {
  constructor () {
    if (process.env.DISCORD_TOKEN === undefined) {
      console.log('Missing Discord Token..')
      process.exit()
    }
    if (process.env.RUST_IP === undefined) {
      console.log('Missing Rust IP..')
      process.exit()
    }
    this.minecraftPlayers = ''
    this.discordConnection = this.connectDiscord()
    this.rustConnection = this.connectRust()
    setInterval(this.connectMinecraft, 60000, this)
  }

  connectRust () {
    let connection = new RustEvents(new ConnectionFactory().getRustConnection(), this)
    this.rustConnection = connection
    return connection
  }
  connectDiscord () {
    return new DiscordEvents(new ConnectionFactory().getDiscordConnection(), this)
  }
  connectMinecraft (context) {
    return new MinecraftEvents(new ConnectionFactory().getMinecraftConnection(), context)
  }
}
module.exports = Androgee
