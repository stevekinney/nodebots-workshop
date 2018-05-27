var five = require('johnny-five');
var Tessel = require('tessel-io');
var board = new five.Board({
  io: new Tessel(),
});

board.on('ready', () => {
  const light = new five.Light('a7');

  light.on('change', () => console.log(light.level));
});
