const Command = require('.././command.js')

class CommandFactory {
  constructor (command) {
    switch (true) {
      case command === undefined:
        break
      case command.includes('minecraft'):
        switch (true) {
          case command.includes('time'):
            this.setMinecraftTime(command)
            break
        }
        break
      case command.includes('terraria'):
        break
      case command.includes('gmod'):
        break
      default:
        console.log('Command not found.')
    }
  }
  setMinecraftTime (arg) {
    let timeNormalized = arg.slice(16).toLowerCase()
    if (timeNormalized === 'night') {
      timeNormalized = '12000'
    } else if (timeNormalized === 'day') {
      timeNormalized = '0'
    } else {
      console.log('Argument was an invalid value')
      return
    }
    const command = new Command('minecraft')
    command.exec('say time was set to ' + timeNormalized + ' from the Discord server')
    command.exec('time set ' + timeNormalized)
      .then((res) => { console.log(res) })
  }
  setMinecraftWeather () {
    const command = new Command('minecraft')
    command.exec('say weather was changed from the Discord server')
    command.exec('toggledownfall')
      .then((res) => {
        console.log(res)
      })
  }
}

module.exports = CommandFactory
