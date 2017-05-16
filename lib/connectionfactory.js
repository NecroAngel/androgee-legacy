class ConnectionFactory {
  getRustConnection () {
    const WebRcon = require('webrconjs')
    const wRcon = new WebRcon(process.env.RUST_IP, process.env.RUST_PORT)
    wRcon.connect(process.env.RUST_PASSWORD)
    return wRcon
  }
  getMinecraftConnection () {
    const SimpleRcon = require('simple-rcon')
    return new SimpleRcon({
      host: process.env.MINECRAFT_IP,
      port: process.env.MINECRAFT_PORT,
      password: process.env.MINECRAFT_PASSWORD
    })
  }
  getGmodConnection () {
    const SimpleRcon = require('simple-rcon')
    return new SimpleRcon({
      host: process.env.GMOD_IP,
      port: process.env.GMOD_PORT,
      password: process.env.GMOD_PASSWORD
    })
  }
}

module.exports = ConnectionFactory
