const Events = require('./events.js')

class EgeeBot {
  connect (token) {
    const connfac = require('./connectionfactory.js')
    Events.connect(new connfac().getDiscordConnection(token))
  }
}
module.exports = EgeeBot
