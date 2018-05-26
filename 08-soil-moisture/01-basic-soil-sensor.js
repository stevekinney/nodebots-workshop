const Tessel = require('tessel-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new Tessel(),
});

const throttle = require('lodash/throttle');

board.on('ready', () => {
  // Our code here!
});
