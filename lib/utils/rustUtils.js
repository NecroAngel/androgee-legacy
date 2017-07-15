class RustUtils {
  messageOperator (msg, androgee, rustConnection) {
    const rustChannel = androgee.discordConnection.client.channels.find('id', process.env.RUST_CHANNEL)
    const debugChannel = androgee.discordConnection.client.channels.find('id', process.env.DEBUG_CHANNEL)
    switch (true) {
      case (msg.message.includes('joined [')):
        const playerName = msg.message.match(/([^/]*)\s*\s/)
        const playerNameNormalized = playerName.pop().trim()
        const discordAnnoucement = playerNameNormalized.replace('joined', 'logged in to')
        const serverAnnoucement = playerName.pop().trim() + ' the server'
        rustConnection.run('say ' + serverAnnoucement)
        rustChannel.sendMessage(discordAnnoucement + ' the Rust server')
        break
      case (msg.message.includes('[EAC]')):
        debugChannel.sendMessage(msg.message)
        break
      case (msg.message.includes('Hack')):
        debugChannel.sendMessage(msg.message)
        break
      case (msg.message.includes('Saving') === false):
        console.log(msg.message + ' - ' + Date.now()) // add moment.js for this
        break
    }
  }
}

module.exports = RustUtils
