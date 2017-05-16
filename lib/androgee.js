const Events = require('./events.js')

class EgeeBot {
  connect (token) {
    const ConnectionFactory = require('./connectionfactory.js')
    Events.connect(new ConnectionFactory().getDiscordConnection(token))
  }
}
module.exports = EgeeBot
