const Tessel = require('tessel-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new Tessel(),
});

const throttle = require('lodash/throttle');

board.on('ready', () => {
  const soil = new five.Sensor('a7');

  soil.on('change', throttle(() => {
    console.log('Soil Moisture', soil.value);
  }), 500);
});
