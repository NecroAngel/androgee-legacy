const request = require('request')

class DiscordUtils {
  // addMember (member) {
  //   const msg = '**' + member.user.username + '**' + ' has joined the server.'
  //   try {
  //     member.guild.defaultChannel.sendMessage(msg)
  //       .then(console.log(msg))
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  // removeMember (member) {
  //   const msg = '**' + member.user.username + '**' + ' has left the server.'
  //   console.log(msg)
  //   try {
  //     const debugChannel = member.client.channels.find('id', process.env.DEBUG_CHANNEL)
  //     debugChannel.sendMessage(msg)
  //       .then(console.log(msg))
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  // banMember (guild, user) {
  //   const msg = '**' + user.username + '**' + ' has been ' + '**banned**.'
  //   try {
  //     guild.channels.defaultChannel.sendMessage(msg)
  //       .then(console.log(msg))
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  messageOperator (message, androgee) {
    switch (true) {
      case message.content.includes('~help'): {
        message.reply('Not Implemented Yet.')
        break
      }
      case message.content.includes('~fortune'): {
        const exec = require('child_process').exec
        exec('fortune', (error, stdout, stderr) => {
          if (stderr !== null) {
            message.reply(stderr)
          } else if (error !== null) {
            message.reply(error.message)
          } else { message.reply(stdout) }
        })
        break
      }
      case message.content.includes('~cat'): {
        if (message.content.includes('pic')) {
          getCatPic()
          .then((res) => {
            message.reply(res)
          })
        } else if (message.content.includes('gif')) {
          getCatGif()
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
        getNorrisQuote()
        .then((res) => {
          message.reply(res)
        })
        break
      }
      case message.content.includes('~rust'): {
        if (message.content.includes('admin')) {
          if (message.member.roles.find('id', process.env.DEMIGOD_ROLE)) {
            rustCommand()
            return
          }
        }
        if (message.channel.id === process.env.RUST_CHANNEL || message.channel.id === process.env.DEBUG_CHANNEL) {
          if (message.member.roles.find('id', process.env.HEROES_ROLE)) {
            androgee.redis.get(message.member.user.username, (err, reply) => {
              if (!err) {
                if (reply === null) {
                  androgee.redis.set(message.member.user.username, 1, androgee.redis.print)
                } else if (parseInt(reply) >= 3) {
                  message.reply('You must wait a bit longer to use this command again.')
                } else if (parseInt(reply) < 3) {
                  let number = parseInt(reply)
                  androgee.redis.set(message.member.user.username, ++number, androgee.redis.print)
                }
              } else {
                console.log('Getting user from Redis errored out with: ' + err)
              }
            })
            rustCommand()
            return
          } else {
            message.reply('You must have the **Heroes** role to perform this action.')
          }
        }

        break
      }
      case message.content.includes('~minecraft'): {
        if (message.channel.id === process.env.MINECRAFT_CHANNEL || message.channel.id === process.env.DEBUG_CHANNEL) {
          if (message.member.roles.find('id', process.env.HEROES_ROLE)) {
            const CommandFactory = require('./../factories/commandFactory.js')
            new CommandFactory(message)
          } else {
            message.reply('You must have the **Heroes** role to perform this action.')
          }
        }
        break
      }
      case message.content.includes('~gmod'): {
        if (message.channel.id === process.env.DEBUG_CHANNEL) {
          if (message.member.roles.find('id', process.env.HEROES_ROLE)) {
            const CommandFactory = require('./../factories/commandFactory.js')
            new CommandFactory(message)
          } else {
            message.reply('You must have the **Heroes** role to perform this action.')
          }
        }
        break
      }
    }
    function rustCommand () {
      if (androgee.rustConnection !== undefined) {
        const CommandFactory = require('./../factories/commandFactory.js')
        new CommandFactory(message, androgee.rustConnection)
      }
    }
    // function getCatPic () {
    //   function fetchPic () {
    //     return new Promise((resolve, reject) => {
    //       request.get('http://thecatapi.com/api/images/get?format=src&type=jpg', function () {
    //         if (this.response.statusCode !== 200) {
    //           fetchPic()
    //         } else {
    //           resolve(this.href)
    //         }
    //       })
    //     })
    //   }
    //   return new Promise((resolve, reject) => {
    //     fetchPic()
    //     .then(function (res) {
    //       resolve(res + ' :tiger:')
    //     })
    //   })
    // }
    // function getCatGif () {
    //   function fetchGif () {
    //     return new Promise((resolve, reject) => {
    //       request.get('http://thecatapi.com/api/images/get?format=src&type=gif', function () {
    //         if (this.response.statusCode !== 200) {
    //           fetchGif()
    //         } else {
    //           resolve(this.href)
    //         }
    //       })
    //     })
    //   }
    //   return new Promise((resolve, reject) => {
    //     fetchGif()
    //       .then(function (res) {
    //         resolve(res + ' :cat:')
    //       })
    //   })
    // }
    function getNorrisQuote () {
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
  }
}
module.exports = DiscordUtils
