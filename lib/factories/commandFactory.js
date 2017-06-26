const Command = require('.././command.js')

class CommandFactory {
  getMinecraftList () {
    const command = new Command('minecraft')
    command.exec('list')
  }
  setMinecraftTime (timeNormalized) {
    const command = new Command('minecraft')
    if (timeNormalized === 'night') {
      timeNormalized = '12000'
    } else {
      timeNormalized = '0'
    }
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
