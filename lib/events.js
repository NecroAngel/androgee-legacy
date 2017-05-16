class Events {
  static connect (client, wRcon) {
    const capabilities = require('./capabilities.js')
    const ConnectionFactory = require('./connectionfactory')
    this.disconnected = true
    if (this.disconnected === true) {
      wRcon = new ConnectionFactory().getRustConnection()
      this.disconnected = false
    }
    client.on('guildMemberAdd', (member) => {
      const msg = '**' + member.user.username + '**' + ' has joined the server.'
      member.guild.defaultChannel.sendMessage(msg)
        .then(console.log(msg))
        .then(this.memberAdd = true)
    })
    client.on('guildMemberRemove', (member) => {
      const msg = '**' + member.user.username + '**' + ' has left the server.'
      console.log(msg)
      const debugChannel = client.channels.find('id', '268141230091796481')
      debugChannel.sendMessage(msg)
    })
    client.on('guildBanAdd', (guild, user) => {
      const msg = '**' + user.username + '**' + ' has been ' + '**banned**.'
      guild.channels.defaultChannel.sendMessage(msg)
        .then(console.log(msg))
        .then(this.banAdd = true)
    })
    client.on('guildBanRemove', (guild, user) => {
      const msg = '**' + user.username + '**' + ' is no longer banned'
      guild.channels.defaultChannel.sendMessage(msg)
        .then(console.log(msg))
        .then(this.banRemove = true)
    })
    client.on('message', (message) => {
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
          capabilities.pollMinecraftServer(client)
          break
        }

        case message.content.includes('~gmod'): {
          capabilities.gmod(message)
          break
        }
        case message.content.includes('~rust'): {
          capabilities.rust(message, wRcon)
          break
        }
      }
    })
    wRcon.on('connect', function () {
      console.log('CONNECTED')
    })
    wRcon.on('disconnect', function () {
      console.log('DISCONNECTED')
      this.disconnected = true
    })
    wRcon.on('message', function (msg) {
      const rustChannel = client.channels.find('id', '305770795693506565')
      if (msg.message.includes('joined [')) {
        const playerName = msg.message.match(/([^/]*)\s*\s/)
        const playerNameNormalized = playerName.pop().trim()
        const discordAnnoucement = playerNameNormalized.replace('joined', 'logged in to')
        const serverAnnoucement = playerName.pop().trim() + ' the server'

        wRcon.run('say ' + serverAnnoucement)
        rustChannel.sendMessage(discordAnnoucement + ' the Rust server')
      }
      console.log('MESSAGE:', msg)
    })
    wRcon.on('error', function (err) {
      console.log('ERROR:', err)
    })
  }
}
module.exports = Events
