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
    new DiscordEvents(new ConnectionFactory().getDiscordConnection())
    // new RustEvents(new ConnectionFactory().getRustConnection())
  }

  healthCheck () {
    setInterval(function () {
      if (discordRef.channels.size > 1) {
        console.log('Still connected')
      } else {
        console.log('bot disconnected for some reason')
      }
      if (rustRef.socket !== null) {
        console.log('Rust is still connected')
      } else {
        console.log('rust disconnected')
        this.connectRust()
      }
    }, 60000)
  }
}
module.exports = Androgee
