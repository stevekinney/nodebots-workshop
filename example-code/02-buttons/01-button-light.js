const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel(),
});

board.on('ready', function() {
  // Our code here!
});
