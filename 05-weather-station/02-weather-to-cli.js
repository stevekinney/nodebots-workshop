const Tessel = require('tessel-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new Tessel(),
});

const Barcli = require('barcli');
const throttle = require('lodash/throttle');

// Some code here!

board.on('ready', () => {
  const monitor = new five.Multi({
    controller: 'BME280',
  });

  // More code here!
});
