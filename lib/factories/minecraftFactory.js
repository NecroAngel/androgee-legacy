const ConnectionFactory = require('./connectionFactory.js')

// This class needs to be rethought because its not actually an _object_ factory
class MinecraftFactory {
  execList (androgee) {
    try {
      androgee.connectionFactory.getMinecraftConnection().exec('list', (res) => {
        if (res.body.length > androgee.minecraftPlayers.length) {
          console.log(res.body)
          androgee.discordConnection.client.channels.find('id', process.env.MINECRAFT_CHANNEL).sendMessage(res.body)
        }
        androgee.minecraftPlayers = res.body
      }).connect()
    } catch (err) {
      console.log(err)
    }
  }
  execTimeSet () {
    try {
      new ConnectionFactory().getMinecraftConnection().exec('time set 9', (res) => { }).connect()
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = MinecraftFactory
