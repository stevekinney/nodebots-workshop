const path = require('path');

const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel(),
});

board.on('ready', () => {
  // Our code here!
});
