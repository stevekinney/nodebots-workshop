const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel()
});

board.on('ready', () => {
  const led = new five.Led('a0');
  // led.blink(2000);
  led.pulse(733);
});