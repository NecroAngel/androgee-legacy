const ConnectionFactory = require('./connectionfactory.js')
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
    this.discordConnection = this.connectDiscord()
    this.initialRustConnection = this.connectRust()
  }

  connectRust () {
    return new RustEvents(new ConnectionFactory().getRustConnection(), this)
  }

  connectDiscord () {
    return new DiscordEvents(new ConnectionFactory().getDiscordConnection(), this)
  }
}
module.exports = Androgee
