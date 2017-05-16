class Capabilities {
  constructor () {
    this.players = ''
    const ConnectionFactory = require('./connectionfactory.js')
    new ConnectionFactory().getMinecraftConnection().exec('list', function (res) {
      Capabilities.players = res.body
    }).connect()
  }
  cats (message) {
    const request = require('request')
    function getPic () {
      request.get('http://thecatapi.com/api/images/get?format=src&type=jpg', function () {
        if (this.response.statusCode !== 200) {
          getPic()
        } else {
          message.reply(this.href + ' :cat:')
          .then(msg => console.log(message.author.username + ' requested a cat pic'))
          .catch(console.error)
        }
      })
    }
    function getGif () {
      request.get('http://thecatapi.com/api/images/get?format=src&type=gif', function () {
        if (this.response.statusCode !== 200) {
          getGif()
        } else {
          message.reply(this.href + ' (these don\'t always embed correctly) :tiger:')
          .then(msg => console.log(message.author.username + ' requested a cat gif'))
          .catch(console.error)
        }
      })
    }
    if (message.content.includes('pic')) {
      this.pic = true
      getPic()
    } else if (message.content.includes('gif')) {
      this.gif = true
      getGif()
    } else {
      message.reply('Try catpic or catgif instead')
    }
    return new Promise((resolve, reject) => { })
  }
  pollMinecraftServer (client) {
    const ConnectionFactory = require('./connectionfactory.js')
    let requestLoop = setInterval(function() {
      new ConnectionFactory().getMinecraftConnection().exec('list', function (res) {
        if (res.body === Capabilities.players) {
          console.log('Nobody has joined')
        } else if (res.body.length < Capabilities.players.length) {
          console.log('Somebody has left')
        } else {
          console.log('Somebody has joined')
          let me = client.channels.find('id', '266680335574630401')
          me.sendMessage(res.body)
        }
        Capabilities.players = res.body
      }).connect()
    }, 60000)
  }
  minecraft (message) {
  }
  gmod (message) {
    const ConnectionFactory = require('./connectionfactory.js')
    let blank = new ConnectionFactory().getGmodConnection().exec('users', function (res) {
      let trimmer = res.body.replace(/(\r\n|\n|\r)/gm, '')
      let sub = trimmer.substr(24, res.body.length)
      let myMatch = sub.match(/Egee/)
      message.reply(res.body)
    })
    blank.connect()
    blank.close()
  }
  rust (message, wRcon) {
    //uptime
    switch (true) {
      case message.content.includes('time'):
        if (message.channel.id === '305770795693506565' || message.channel.id === '268141230091796481') {
          if (message.member.roles.find('id', '187670843051081730')) {
            let msg = message.member.nickname + ' just set the time to '
            if (message.content.includes('day')) {
              const msgDay = msg + 'day'
              wRcon.run('env.time 9')
              wRcon.run('say ' + msgDay)
              message.reply('setting time to day...')
            } else if (message.content.includes('night')) {
              const msgNight = msg + 'night'
              wRcon.run('env.time 23')
              wRcon.run('say ' + msgNight)
              message.reply('setting time to night...')
            }
          }
        }
        break
      case message.content.includes('kick'):
        const cmd = message.content.slice(6, message.content.length)
        wRcon.run(cmd)
        break
      case message.content.includes('ban'):
        wRcon.run('env.time 9')
        break
      case message.content.includes('teleport'):
        if (message.channel.id === '305770795693506565' || message.channel.id === '268141230091796481') {
          if (message.member.roles.find('id', '187670843051081730')) {
          }
        }
        break
    }
  }
}
module.exports = new Capabilities()
