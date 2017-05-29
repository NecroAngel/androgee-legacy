class MinecraftEvents {
  constructor (minecraftConnect, androgee) {
    this.connection = minecraftConnect
    this.connection.exec('list', function (res) {
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
  help (message) {

  }
  kick (message) {

  }
  ban (message) {

  }
  teleport (message) {

  }
  setTime (message) {
    this.connection.exec('time set 9', function (res) {
    }).connect()
  }
  roulette (message) {
    this.connection.exec('execute @r ~ ~ ~ summon minecraft:lightning_bolt', function (res) {
    }).connect()
  }
}

module.exports = MinecraftEvents
