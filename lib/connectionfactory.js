const WebRcon = require('webrconjs')
const DiscordJs = require('discord.js')
const SimpleRcon = require('simple-rcon')

class ConnectionFactory {
  getDiscordConnection () {
    const discord = new DiscordJs.Client()
    discord.login(process.env.DISCORD_TOKEN)
    return discord
  }
  getRustConnection () {
    const wRcon = new WebRcon(process.env.RUST_IP, process.env.RUST_PORT)
    wRcon.connect(process.env.RUST_PASSWORD)
    return wRcon
  }
  getMinecraftConnection () {
    return new SimpleRcon({
      host: process.env.MINECRAFT_IP,
      port: process.env.MINECRAFT_PORT,
      password: process.env.MINECRAFT_PASSWORD
    })
  }
  getGmodConnection () {
    return new SimpleRcon({
      host: process.env.GMOD_IP,
      port: process.env.GMOD_PORT,
      password: process.env.GMOD_PASSWORD
    })
  }
}

module.exports = ConnectionFactory