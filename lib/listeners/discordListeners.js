const DiscordUtils = require('./../utils/discordUtils.js')

class DiscordListeners {
  constructor (discordConnection, androgee) {
    this.client = discordConnection
    this.discordUtils = new DiscordUtils()
    discordConnection.on('guildMemberAdd', (member) => {
      this.discordUtils.addMember(member)
    })
    discordConnection.on('guildMemberRemove', (member) => {
      this.discordUtils.removeMember(member)
    })
    discordConnection.on('guildBanAdd', (guild, user) => {
      this.discordUtils.banMember(guild, user)
    })
    discordConnection.on('message', (message) => {
      this.discordUtils.messageOperator(message, androgee)
    })
  }
}

module.exports = DiscordListeners
