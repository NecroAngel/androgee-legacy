const ConnectionFactory = require('./factories/connectionFactory.js')

class Command {
  constructor (server) {
    switch (true) {
      case (server === 'minecraft'):
        this.connection = new ConnectionFactory('minecraft')
    }
  }
  exec (command) {
    return new Promise((resolve, reject) => {
      this.connection.exec(command, (response) => {
        resolve(response)
      }).connect()
    })
  }
}

module.exports = Command
