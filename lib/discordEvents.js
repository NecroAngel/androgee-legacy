const request = require('request')

class DiscordEvents {
  constructor (discordConnection, androgee) {
    this.client = discordConnection
    this.name = ''
    discordConnection.on('guildMemberAdd', (member) => {
      const msg = '**' + member.user.username + '**' + ' has joined the server.'
      try {
        member.guild.defaultChannel.sendMessage(msg)
        .then(console.log(msg))
        .then(this.memberAdd = true)
      } catch (err) {
        console.log(err)
      }
    })
    discordConnection.on('guildMemberRemove', (member) => {
      const msg = '**' + member.user.username + '**' + ' has left the server.'
      console.log(msg)
      try {
        const debugChannel = discordConnection.channels.find('id', process.env.DEBUG_CHANNEL)
        debugChannel.sendMessage(msg)
      } catch (err) {
        console.log(err)
      }
    })
    discordConnection.on('guildBanAdd', (guild, user) => {
      const msg = '**' + user.username + '**' + ' has been ' + '**banned**.'
      try {
        guild.channels.defaultChannel.sendMessage(msg)
          .then(console.log(msg))
          .then(this.banAdd = true)
      } catch (err) {
        console.log(err)
      }
    })
    discordConnection.on('guildBanRemove', (guild, user) => {
      const msg = '**' + user.username + '**' + ' is no longer banned'
      try {
        guild.channels.defaultChannel.sendMessage(msg)
          .then(console.log(msg))
          .then(this.banRemove = true)
      } catch (err) {

      }
    })
    discordConnection.on('message', (message) => {
      switch (true) {
        case message.content.includes('~fortune'): {
          const exec = require('child_process').exec
          exec('fortune', function (error, stdout, stderr) {
            message.reply(stdout)
          })
          break
        }
        case message.content.includes('~cowsay'): {
          const exec = require('child_process').exec
          exec('fortune -s | cowsay', function (error, stdout, stderr) {
            message.reply('\n' + '``' + stdout + '``')
          })
          break
        }
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
          if (message.channel.id === process.env.RUST_CHANNEL || message.channel.id === process.env.DEBUG_CHANNEL) {
            if (androgee.rustConnection !== undefined) {
              switch (true) {
                case message.content.includes('time'): {
                  if (message.member.roles.find('id', process.env.HEROES_ROLE)) {
                    androgee.rustConnection.setTime(message)
                  } else {
                    message.reply('You must have the **Heroes** role to perform this action.')
                  }
                  break
                }
                case message.content.includes('kick'): {
                  if (message.member.roles.find('id', '231828331195006976')) {
                    androgee.rustConnection.kick(message)
                  } else {
                    message.reply('You must have the **Demigods** role to perform this action.')
                  }
                  break
                }
                case message.content.includes('ban'): {
                  if (message.member.roles.find('id', '231828331195006976')) {
                    androgee.rustConnection.ban(message)
                  } else {
                    message.reply('You must have the **Demigods** role to perform this action.')
                  }
                  break
                }
                case message.content.includes('teleport'): {
                  if (message.channel.id === process.env.RUST_CHANNEL) {
                    if (message.member.roles.find('id', '231828331195006976')) {
                      androgee.rustConnection.teleport(message)
                    } else {
                      message.reply('You must have the **Demigods** role to perform this action.')
                    }
                  }
                  break
                }
                default: {
                  if (message.channel.id === process.env.RUST_CHANNEL || message.channel.id === process.env.DEBUG_CHANNEL) {
                    androgee.rustConnection.help(message)
                  }
                }
              }
            } else {
              message.reply('Unable to connect to Rust server.')
            }
            this.name = message.author.username
          }
          break
        }
        case message.content.includes('~minecraft'): {
          if (message.channel.id === process.env.MINECRAFT_CHANNEL || message.channel.id === process.env.DEBUG_CHANNEL) {
            if (message.member.roles.find('id', process.env.HEROES_ROLE)) {
              const CommandFactory = require('./factories/commandFactory.js')
              new CommandFactory(message.content)
            } else {
              message.reply('You must have the **Heroes** role to perform this action.')
            }
          }
          this.name = message.author.username
          break
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
          resolve(res)
        })
    })
  }
  getFortune () {
    const sys = require('sys')
    const exec = require('child_process').exec
    let blank
    let child = exec('fortune', function (error, stdout, stderr) {
      blank = stdout
    })
    return blank
  }
}

module.exports = DiscordEvents
