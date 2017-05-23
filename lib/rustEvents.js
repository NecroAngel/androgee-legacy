class RustEvents {
  constructor (rustConnection, androgee) {
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
}

module.exports = RustEvents
