const Command = require('.././command.js')

class CommandFactory {
  constructor (message, rustConnection) {
    this.wRcon = rustConnection.wRcon
    switch (true) {
      case message.content === undefined:
        break
      case message.content.includes('rust'):
        switch (true) {
          case message.content.includes('time'): {
            this.rustTime(message)
            break
          }
        }
        break
      case message.includes('rust admin'):
        switch (true) {
          case message.content.includes('kick'): {
            this.rustKick(message)
            break
          }
          case message.content.includes('ban'): {
            this.rustBan(message)
            break
          }
          case message.content.includes('teleport'): {
            this.rustTeleport(message)
            break
          }
          case message.content.includes('say'): {
            this.rustSay(message)
            break
          }
        }
        break
      case message.includes('minecraft'):
        switch (true) {
          case message.includes('time'):
            this.setMinecraftTime(message)
            break
          case message.includes('weather'):
            this.setMinecraftWeather()
            break
        }
        break
      case message.includes('gmod'):
        this.getGmodPlayers(message)
        break
      default:
        console.log('Command not found.')
    }
  }
  getGmodPlayers (message) {
    const command = new Command('gmod')
    command.exec('status')
      .then((res) => {
        message.reply(res.body)
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
  rustSay (message) {
    const normalizedInput = message.content.substring(10)
    this.wRcon.run('say ' + normalizedInput)
  }
  rustKick (message) {
    let username = message.content.substring(11, message.content.length)
    if (username !== '') {
      this.wRcon.run('kick ' + username)
      message.reply('just kicked ' + username + ' from the server.')
    }
  }
  rustBan (message) {
    let username = message.content.substring(10, message.content.length)
    if (username !== '') {
      this.wRcon.run('ban ' + username)
      message.reply('just ban ' + username + ' from the server.')
    }
  }
  rustTeleport (message) {
    const usernames = message.content.substring(15, message.content.length)
    if (usernames !== '') {
      const username01 = usernames.match(/^[^\s]+/)
      const username02 = usernames.match(/(\w+)$/)
      this.wRcon.run('teleport ' + username01 + ' ' + username02[0])
      this.wRcon.run('say ' + message.author.username + ' just teleported ' + username01 + ' to ' + username02[0] + ' from the Discord server')
      message.reply('just teleported ' + username01 + ' to ' + username02[0])
    }
  }
  rustTime (message) {
    const msg = message.author.username + ' just set the time to '
    if (message.content.includes('day')) {
      const msgDay = msg + 'day'
      this.wRcon.run('env.time 9')
      this.wRcon.run('say ' + msgDay + ' from the Discord server')
      message.reply('setting time to day...')
    } else if (message.content.includes('night')) {
      const msgNight = msg + 'night'
      this.wRcon.run('env.time 23')
      this.wRcon.run('say ' + msgNight)
      message.reply('setting time to night...')
    }
  }
}

module.exports = CommandFactory
