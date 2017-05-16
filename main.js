if (process.argv[2] == null) {
  console.log('You forgot to provide the Discord server token.')
  process.exit()
}

const Androgee = require('./lib/androgee.js')
new Androgee().connect(process.argv[2])
