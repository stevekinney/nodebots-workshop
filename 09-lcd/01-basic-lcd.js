var five = require('johnny-five');
var Tessel = require('tessel-io');
var board = new five.Board({
  io: new Tessel(),
});

board.on('ready', () => {
  var lcd = new five.LCD({
    pins: ['a2', 'a3', 'a4', 'a5', 'a6', 'a7'],
  });

  lcd.cursor(0, 0).print('Hello');
  lcd.cursor(1, 0).print('World');
});
