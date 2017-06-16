const Command = require('.././command.js')

class CommandFactory {
  getMinecraftList () {
    let command = new Command('minecraft')
    command.exec('list')
  }
  setMinecraftTime () {
    let command = new Command('minecraft')
    command.exec('time set 9')
      .then((res) => {
        console.log(res)
      })
  }
}

module.exports = CommandFactory
