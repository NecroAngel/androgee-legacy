

class Events {
  constructor (rustConnection, discordConnection) {
    this.discordConnection = discordConnection
    this.rustConnection = rustConnection
    this.discordEvents()
    this.rustEvents()
  }
  discordEvents () {

    this.discordConnection.on('message', (message) => {
      switch (true) {
        case message.content.includes('~cat'): {
          capabilities.cats(message)
            .then(console.log(message.member.user.username + ' requested a cat!'))
          break
        }
        case message.content.includes('~minecraft'): {
          capabilities.minecraft(message)
          break
        }
        case message.content.includes('~bootstrap'): {
          capabilities.pollMinecraftServer(this.discordConnection)
          break
        }
        case message.content.includes('~gmod'): {
          capabilities.gmod(message)
          break
        }

      }
    })
  }
  rustEvents () {

  }
}
module.exports = Events
