class MinecraftEvents {
  constructor (minecraftConnect, androgee) {
    minecraftConnect.exec('list', function (res) {
      if (res.body === androgee.minecraftPlayers) {
        console.log('Nobody has joined')
      } else if (res.body.length < androgee.minecraftPlayers.length) {
        console.log('Somebody has left')
      } else {
        console.log('Somebody has joined')
        const debug = androgee.discordConnection.client.channels.find('id', '266680335574630401')
        if (res.body !== 'There are 0/20 players online:') {
          debug.sendMessage(res.body)
        }
      }
      androgee.minecraftPlayers = res.body
    }).connect()
  }
}

module.exports = MinecraftEvents
