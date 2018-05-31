var five = require('johnny-five');
var Tessel = require('tessel-io');
var board = new five.Board({
  io: new Tessel(),
});

board.on('ready', () => {
  const monitor = new five.Multi({
    controller: 'BME280',
  });

  monitor.on('change', () => {
    const temperature = monitor.thermometer.fahrenheit;
    const pressure = monitor.barometer.pressure;
    const relativeHumidity = monitor.hygrometer.relativeHumidity;

    console.log({ temperature, pressure, relativeHumidity });
  });
});
