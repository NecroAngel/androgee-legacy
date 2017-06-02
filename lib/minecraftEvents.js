class MinecraftEvents {
  constructor (androgee) {
    this.androgee = androgee
    this.minecraftPlayers = 'There are 0/20 players online:'
  }
  listLoop (self) {
    // self is a reference to this (the class) because JS callback scopes are fucking retarded
    self.androgee.connectionFactory.getMinecraftConnection().exec('list', (res) => {
      if (res.body === self.minecraftPlayers) {
        console.log('Nobody has joined')
      } else if (res.body.length < self.minecraftPlayers.length) {
        console.log('Somebody has left')
      } else {
        console.log('Somebody has joined')
        self.androgee.discordConnection.client.channels.find('id', process.env.MINECRAFT_CHANNEL).sendMessage(res.body)
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
