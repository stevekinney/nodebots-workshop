const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel(),
});

board.on('ready', function() {
  const led = new five.Led('a0');
  const button = new five.Button({
    pin: 'a2',
    isPullup: true,
  });

  button.on('down', function() {
    led.on();
  });

  button.on('up', function() {
    led.off();
  });
});
