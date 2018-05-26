const Tessel = require('tessel-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new Tessel(),
});

board.on('ready', () => {
  // Our code here!
});
