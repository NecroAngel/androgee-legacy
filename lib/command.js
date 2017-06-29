const ConnectionFactory = require('./factories/connectionFactory.js')

class Command {
  constructor (server) {
    this.connection = new ConnectionFactory(server)
  }
  exec (command) {
    return new Promise((resolve, reject) => {
      this.connection.exec(command, (response) => {
        resolve(response)
      }).connect()
      this.connection.on('error', (err) => {
        console.log(err)
      })
      this.connection.close()
    })
  }
}

module.exports = Command
