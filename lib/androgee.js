class EgeeBot {
  constructor (discord, token) {
    const Events = require('./events.js')
    discord.login(token)
    Events.connect(discord)
  }
}
module.exports = EgeeBot
