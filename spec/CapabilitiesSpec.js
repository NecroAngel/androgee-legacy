beforeEach(() => {
  let TestData = require('../data/testdata')
  this.dictionary = require('../data/dictionary')
  this.capabilities = require('../lib/capabilities')
  this.testdata = new TestData()
})

describe('the cats method', () => {
  it('enters catPIC logic if message contains the word "pic" ', () => {
    this.testdata.message.content = '~catpic'
    this.capabilities.cats(this.testdata.message)
    expect(this.capabilities.pic).toBe(true)
  })
  it('enters catGIF logic if message contains the word "gif" ', () => {
    this.testdata.message.content = 'catgif'
    this.capabilities.cats(this.testdata.message)
    expect(this.capabilities.gif).toBe(true)
  })
  it('alerts user if message contains neither "pic" or "gif" ', () => {
    this.testdata.message.content = 'cat'
    spyOn(this.testdata.message, 'reply')
    this.capabilities.cats(this.testdata.message)
    expect(this.testdata.message.reply).toHaveBeenCalledWith('Try catpic or catgif instead')
  })
})
