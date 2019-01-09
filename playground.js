const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel()
});

board.on('ready', () => {
  const led = new five.Led('a0');
  // led.pulse(733);
  const button = new five.Button({
    pin: 'a2',
    isPullup: true
  });

  button.on('press', () => led.on());
  button.on('release', () => led.off());
});