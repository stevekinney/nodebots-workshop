const Tessel = require('tessel-io')
const five = require('johnny-five')

const board = new five.Board({
  io: new Tessel()
})

board.on('ready', () => {
  const led = new five.Led.RGB({
    pins: {
      red: 'a5',
      green: 'a6',
      blue: 'b5'
    }
  })

  var index = 0
  const colors = ['red', 'green', 'blue']

  board.loop(500, () => {
    led.color(colors[index++ % colors.length]);
  });
})
