class MinecraftEvents {
  constructor (androgee) {
    this.androgee = androgee
    this.minecraftPlayers = ''
  }
  listLoop (self) {
    // self is a reference to this (the class) because JS callback scopes are fucking retarded
    self.androgee.connectionFactory.getMinecraftConnection().exec('list', function (res) {
      if (res.body === self.minecraftPlayers) {
        console.log('Nobody has joined')
      } else if (res.body.length < self.minecraftPlayers.length) {
        console.log('Somebody has left')
      } else {
        console.log('Somebody has joined')
        const debug = self.androgee.discordConnection.client.channels.find('id', process.env.DEBUG_CHANNEL)
        if (res.body !== 'There are 0/20 players online:') {
          debug.sendMessage(res.body)
        }
      }
      self.minecraftPlayers = res.body
    }).connect()
  }
  help (message) {

  }
  kick (message) {

  }
  ban (message) {

  }
  teleport (message) {
    this.androgee.connectionFactory.getMinecraftConnection().exec('tp blank blank', function (res) {
    }).connect()
  }
  setTime (message) {
    this.androgee.connectionFactory.getMinecraftConnection().exec('time set 9', function (res) {
      let blank = res
    }).connect()
  }
  roulette (message) {
    this.androgee.connectionFactory.getMinecraftConnection().exec('execute @r ~ ~ ~ summon minecraft:lightning_bolt', function (res) {
    }).connect()
  }
}

module.exports = MinecraftEvents
