class RustEvents {
  constructor (rustConnection, androgee) {
    this.wRcon = rustConnection
    rustConnection.on('connect', function () {
      console.log('CONNECTED')
    })
    rustConnection.on('disconnect', function () {
      console.log('DISCONNECTED')
      androgee.connectRust()
    })
    rustConnection.on('message', function (msg) {
      if (msg.message.includes('joined [')) {
        const rustChannel = androgee.discordConnection.client.channels.find('id', '305770795693506565')
        const playerName = msg.message.match(/([^/]*)\s*\s/)
        const playerNameNormalized = playerName.pop().trim()
        const discordAnnoucement = playerNameNormalized.replace('joined', 'logged in to')
        const serverAnnoucement = playerName.pop().trim() + ' the server'

        rustConnection.run('say ' + serverAnnoucement)
        rustChannel.sendMessage(discordAnnoucement + ' the Rust server')
      }
      console.log('MESSAGE:', msg)
    })
    rustConnection.on('error', function (err) {
      console.log('ERROR:', err)
    })
  }
  help (message) {
    if (message.channel.id === '305770795693506565' || message.channel.id === '268141230091796481') {
      message.reply('Current options are: **time**')
    }
  }
  kick (message) {
    if (message.channel.id === '305770795693506565' || message.channel.id === '268141230091796481') {
      if (message.member.roles.find('id', '231828331195006976')) {
        let username = message.content.substring(11, message.content.length)
        if (username !== '') {
          this.wRcon.run('kick ' + username)
          message.reply('just kicked ' + username + ' from the server.')
        }
      } else {
        message.reply('You must have the **Demigods** role to perform this action.')
      }
    }
  }
  ban (message) {
    if (message.channel.id === '305770795693506565' || message.channel.id === '268141230091796481') {
      if (message.member.roles.find('id', '231828331195006976')) {
        let username = message.content.substring(11, message.content.length)
        if (username !== '') {
          this.wRcon.run('ban ' + username)
          message.reply('just ban ' + username + ' from the server.')
        }
      } else {
        message.reply('You must have the **Demigods** role to perform this action.')
      }
    }
  }
  teleport (message) {
    if (message.channel.id === '305770795693506565' || message.channel.id === '268141230091796481') {
      if (message.member.roles.find('id', '231828331195006976')) {
        let usernames = message.content.substring(11, message.content.length)
        if (usernames !== '') {
          let username01 = usernames.match(/^[^\s]+/)
          let username02 = usernames.match(/(\w+)$/)
          this.wRcon.run('teleport ' + username01 + ' ' + username02)
          message.reply('just teleported ' + username01 + ' to ' + username02)
        }
      } else {
        message.reply('You must have the **Demigods** role to perform this action.')
      }
    }
  }
  setTime (message) {
    if (message.channel.id === '305770795693506565' || message.channel.id === '268141230091796481') {
      if (message.member.roles.find('id', '231828331195006976')) {
        let msg = message.member.nickname + ' just set the time to '
        if (message.content.includes('day')) {
          const msgDay = msg + 'day'
          this.wRcon.run('env.time 9')
          this.wRcon.run('say ' + msgDay)
          message.reply('setting time to day...')
        } else if (message.content.includes('night')) {
          const msgNight = msg + 'night'
          this.wRcon.run('env.time 23')
          this.wRcon.run('say ' + msgNight)
          message.reply('setting time to night...')
        }
      } else {
        message.reply('You must have the **Heros** role to perform this action.')
      }
    }
  }
}

module.exports = RustEvents
