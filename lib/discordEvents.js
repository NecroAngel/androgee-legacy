class DiscordEvents {
  constructor (discordConnection) {
    const Capabilities = require('./capabilities.js')
    const capabilities = new Capabilities()
    discordConnection.on('guildMemberAdd', (member) => {
      const msg = '**' + member.user.username + '**' + ' has joined the server.'
      member.guild.defaultChannel.sendMessage(msg)
      .then(console.log(msg))
      .then(this.memberAdd = true)
    })
    discordConnection.on('guildMemberRemove', (member) => {
      const msg = '**' + member.user.username + '**' + ' has left the server.'
      console.log(msg)
      const debugChannel = discordConnection.channels.find('id', '268141230091796481')
      debugChannel.sendMessage(msg)
    })
    discordConnection.on('guildBanAdd', (guild, user) => {
      const msg = '**' + user.username + '**' + ' has been ' + '**banned**.'
      guild.channels.defaultChannel.sendMessage(msg)
        .then(console.log(msg))
        .then(this.banAdd = true)
    })
    discordConnection.on('guildBanRemove', (guild, user) => {
      const msg = '**' + user.username + '**' + ' is no longer banned'
      guild.channels.defaultChannel.sendMessage(msg)
        .then(console.log(msg))
        .then(this.banRemove = true)
    })
    discordConnection.on('message', (message) => {
      switch (true) {
        case message.content.includes('~debug'): {
          console.log('breakpoint hit')
          break
        }
        case message.content.includes('~cat'): {
          if (message.content.includes('pic')) {
            capabilities.getCatPic()
            .then((res) => {
              message.reply(res)
            })
          } else if (message.content.includes('gif')) {
            capabilities.getCatGif()
              .then((res) => {
                message.reply(res)
              })
          } else {
            message.reply('Try catpic or catgif instead')
          }
          console.log(message.member.user.username + ' requested a cat!')
          break
        }
        case message.content.includes('~chucknorris'): {
          capabilities.getNorrisQuote()
          .then((res) => {
            message.reply(res)
          })
          break
        }
        case message.content.includes('~rust'): {
          if (this.rustConnection.socket !== undefined) {
            capabilities.rust(message, this.rustConnection)
          } else {
            console.log('Rust websocket was null')
          }
          break
        }
      }
    })
  }
}

module.exports = DiscordEvents
