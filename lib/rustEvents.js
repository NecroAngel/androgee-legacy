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
        const rustChannel = androgee.discordConnection.client.channels.find('id', process.env.RUST_CHANNEL)
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
    message.reply('Current options are: **time**')
  }
  kick (message) {
    let username = message.content.substring(11, message.content.length)
    if (username !== '') {
      this.wRcon.run('kick ' + username)
      message.reply('just kicked ' + username + ' from the server.')
    }
  }
  ban (message) {
    let username = message.content.substring(11, message.content.length)
    if (username !== '') {
      this.wRcon.run('ban ' + username)
      message.reply('just ban ' + username + ' from the server.')
    }
  }
  teleport (message) {
    let usernames = message.content.substring(11, message.content.length)
    if (usernames !== '') {
      let username01 = usernames.match(/^[^\s]+/)
      let username02 = usernames.match(/(\w+)$/)
      this.wRcon.run('teleport ' + username01 + ' ' + username02)
      message.reply('just teleported ' + username01 + ' to ' + username02)
    }
  }
  setTime (message) {
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
  }
}

module.exports = RustEvents
