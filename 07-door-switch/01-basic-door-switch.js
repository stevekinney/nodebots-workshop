const Tessel = require('tessel-io')
const five = require('johnny-five')
const board = new five.Board({
  io: new Tessel()
})

board.on('ready', () => {
  const door = new five.Switch({
    pin: 'a2',
    invert: true
  })

  door.on('open', () => console.log('open'))
  door.on('close', () => console.log('close'))
})
