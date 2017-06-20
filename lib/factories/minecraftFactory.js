const ConnectionFactory = require('./connectionFactory.js')

// This class needs to be rethought because its not actually an _object_ factory
class MinecraftFactory {
  execList (androgee) {
    androgee.redis.get('defaultPlayers', function (err, reply) {
      if (!err) {
        const diff = require('fast-diff')
        let client = androgee.connectionFactory.getMinecraftConnection().exec('list', (res) => {
          if (res.body.length > reply.length) {
            var playerListDif = diff(res.body, reply)
            if (playerListDif.length > 3) {
              var newPlayers = playerListDif[4][1]
              if (newPlayers.startsWith(',')) {
                newPlayers = newPlayers.slice(2)
              }
              let msg = 'The following player(s) have joined: ' + '``' + newPlayers + '``'
              console.log(msg)
              androgee.discordConnection.client.channels.find('id', process.env.MINECRAFT_CHANNEL).sendMessage(msg)
            }
          }
          androgee.redis.set('defaultPlayers', res.body)
        }).connect()
        client.on('error', function (err) {
          console.log(err)
        })
      } else {
        console.log('Minecraft list loop errored out: ' + err)
      }
    })
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
