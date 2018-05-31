var five = require('johnny-five');
var Tessel = require('tessel-io');
var board = new five.Board({
  io: new Tessel(),
});

board.on('ready', () => {
  const led = new five.Led('a0');

  const button = new five.Button({
    pin: 'a2',
    isPullup: true,
  });

  button.on('press', () => led.on());
  button.on('release', () => led.off());
});
