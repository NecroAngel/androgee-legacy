beforeEach(() => {
  let TestData = require('../data/testdata')
  this.discord = require('discord.js')
  this.client = new this.discord.Client()
  this.event = require('../lib/events.js')
  this.capabilities = require('../lib/capabilities')
  this.testdata = new TestData()
})
describe('connect method', () => {
  describe('guildMemberAdd event', () => {
    it('alerts #general if a new user joins the guild', (done) => {
      this.event.connect(this.client)
      this.client.emit('guildMemberAdd', this.testdata.message.member)

      expect(this.event.memberAdd).toBe(true)

      done()
    })
  })
  describe('guildMemberRemove event', () => {
    it('alerts #general if a user leaves the guild', (done) => {
      this.event.connect(this.client)
      this.client.emit('guildMemberRemove', this.testdata.message.member)

      expect(this.event.memberRemove).toBe(true)

      done()
    })
  })
  describe('guildBanAdd event', () => {
    it('alerts #general if a user is banned', (done) => {
      this.event.connect(this.client)
      this.client.emit('guildBanAdd', this.testdata.message.member.guild, this.testdata.message.member.user)

      expect(this.event.banAdd).toBe(true)

      done()
    })
  })
  describe('guildBanRemove event', () => {
    it('alerts #general if a user is no longer banned', (done) => {
      this.event.connect(this.client)
      this.client.emit('guildBanRemove', this.testdata.message.member.guild, this.testdata.message.member.user)

      expect(this.event.banRemove).toBe(true)

      done()
    })
  })
  describe('message', () => {
    it('calls the Cats method if message includes ~cat', (done) => {
      this.testdata.message.content = '~catpic'
      spyOn(this.capabilities, 'cats').and.callThrough()

      this.event.connect(this.client)
      this.client.emit('message', this.testdata.message)
      expect(this.capabilities.cats).toHaveBeenCalled()
      done()
    })
  })
})
