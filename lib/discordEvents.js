const request = require('request')

class DiscordEvents {
  constructor (discordConnection, androgee) {
    this.client = discordConnection
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
            this.getCatPic()
            .then((res) => {
              message.reply(res)
            })
          } else if (message.content.includes('gif')) {
            this.getCatGif()
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
          this.getNorrisQuote()
          .then((res) => {
            message.reply(res)
          })
          break
        }
        case message.content.includes('~rust'): {
          switch (true) {
            case message.content.includes('time'): {
              break
            }
            case message.content.includes('kick'): {
              break
            }
            case message.content.includes('ban'): {
              break
            }
            case message.content.includes('teleport'): {
              break
            }
            default: {
            }
          }
        }
      }
    })
  }
  getCatPic () {
    function fetchPic () {
      return new Promise((resolve, reject) => {
        request.get('http://thecatapi.com/api/images/get?format=src&type=jpg', function () {
          if (this.response.statusCode !== 200) {
            fetchPic()
          } else {
            resolve(this.href)
          }
        })
      })
    }
    return new Promise((resolve, reject) => {
      fetchPic()
        .then(function (res) {
          resolve(res + ' :tiger:')
        })
    })
  }
  getCatGif () {
    function fetchGif () {
      return new Promise((resolve, reject) => {
        request.get('http://thecatapi.com/api/images/get?format=src&type=gif', function () {
          if (this.response.statusCode !== 200) {
            fetchGif()
          } else {
            resolve(this.href)
          }
        })
      })
    }
    return new Promise((resolve, reject) => {
      fetchGif()
        .then(function (res) {
          resolve(res + ' :cat:')
        })
    })
  }
  getNorrisQuote () {
    function Get () {
      return new Promise((resolve, reject) => {
        request.get('http://api.icndb.com/jokes/random?exclude=[explicit]', function () {
          if (this.response.statusCode !== 200) {
            Get()
          } else {
            resolve(JSON.parse(this.response.body).value.joke)
          }
        })
      })
    }
    return new Promise((resolve, reject) => {
      Get()
        .then(function (res) {
          resolve(res + ' :cat:')
        })
    })
  }
}

module.exports = DiscordEvents
