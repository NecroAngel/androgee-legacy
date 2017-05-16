if (process.argv[2] == null) {
  console.log('You forgot to provide the Discord server token.')
  process.exit()
}

const DiscordJs = require('discord.js')
const Androgee = require('./lib/androgee.js')

new Androgee(new DiscordJs.Client(), process.argv[2])
