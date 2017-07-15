const RustUtils = require('./../utils/rustUtils.js')

class RustListeners {
  constructor (rustConnection, androgee) {
    this.wRcon = rustConnection
    this.rustUtils = new RustUtils()
    rustConnection.on('connect', () => {
      console.log('CONNECTED TO RUST SERVER')
    })
    rustConnection.on('disconnect', () => {
      console.log('DISCONNECTED FROM RUST SERVER')
      androgee.connectRust()
    })
    rustConnection.on('message', (msg) => {
      try {
        this.rustUtils.messageOperator(msg, androgee, rustConnection)
      } catch (err) {
        console.log('Something in the Rust message listener failed: ' + err)
      }
    })
    rustConnection.on('error', (err) => {
      console.log('ERROR:', err)
    })
  }
}

module.exports = RustListeners
