const Command = require('.././command.js')

class CommandFactory {
  constructor (command, androgee) {
    switch (true) {
      case command === undefined:
        break
      case command.includes('minecraft'):
        switch (true) {
          case command.includes('time'):
            this.setMinecraftTime(command)
            break
          case command.includes('weather'):
            this.setMinecraftWeather()
            break
        }
        break
      case command.includes('terraria'):
        this.getTerrariaPlayers()
        break
      case command.includes('gmod'):
        this.getGmodPlayers()
        break
      default:
        console.log('Command not found.')
    }
  }
  getTerrariaPlayers () {
    const command = new Command('terraria')
    command.exec('playing')
      .then((res) => {
        console.log(res)
      })
  }
  getGmodPlayers () {
    const command = new Command('gmod')
    command.exec('status')
      .then((res) => {
        console.log(res)
      })
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
