class TestData {
  constructor() {
    this.discord = require('discord.js')
    this.message = {
      attachments: new this.discord.Collection(),
      author: {
        sendMessage: () => {
          return new Promise((resolve, reject) => { })
        }
      },
      channel: {
        id: ''
      },
      client: { },
      content: '',
      createdTimestap: 1,
      delete: () => {
        return new Promise((resolve, reject) => { })
      },
      edit: () => { },
      editedTimestamp: null,
      embeds: [],
      id: '1',
      member: {
        joinedTimestamp: new Date(),
        guild: {
          channels: {
            find: () => {
              return {
                sendMessage: () => {
                  return new Promise((resolve, reject) => { })
                }
              }
            }
          }
        },
        user: {
          username: ''
        },
        _roles: []
      },
      mentions: { },
      pin: () => { },
      pinned: false,
      reply: () => { },
      system: false,
      tts: false,
      unpin: () => { }
    }
  }
}

module.exports = TestData
