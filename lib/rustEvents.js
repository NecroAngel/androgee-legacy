class RustEvents {
  constructor (rustConnection) {
    rustConnection.on('connect', function () {
      console.log('CONNECTED')
    })
    rustConnection.on('disconnect', function () {
      console.log('DISCONNECTED')
    })
    // rustConnection.on('message', function (msg) {
    //   const rustChannel = this.channels.find('id', '305770795693506565')
    //   if (msg.message.includes('joined [')) {
    //     const playerName = msg.message.match(/([^/]*)\s*\s/)
    //     const playerNameNormalized = playerName.pop().trim()
    //     const discordAnnoucement = playerNameNormalized.replace('joined', 'logged in to')
    //     const serverAnnoucement = playerName.pop().trim() + ' the server'

    //     rustConnection.run('say ' + serverAnnoucement)
    //     rustChannel.sendMessage(discordAnnoucement + ' the Rust server')
    //   }
    //   console.log('MESSAGE:', msg)
    // })
    rustConnection.on('error', function (err) {
      console.log('ERROR:', err)
    })
  }
}

module.exports = RustEvents
