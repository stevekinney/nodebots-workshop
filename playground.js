var five = require('johnny-five');
var Tessel = require('tessel-io');
var board = new five.Board({
  io: new Tessel(),
});

const throttle = require('lodash/throttle');
const Barcli = require('Barcli');

const graphs = {
  temperature: new Barcli({ label: 'Temperature', range: [0, 120] }),
  pressure: new Barcli({ label: 'Pressure', range: [0, 100] }),
  relativeHumidity: new Barcli({ label: 'Relative Humidity', range: [0, 100] }),
};

board.on('ready', () => {
  const monitor = new five.Multi({
    controller: 'BME280',
  });

  const handleChange = throttle(() => {
    const temperature = monitor.thermometer.fahrenheit;
    const pressure = monitor.barometer.pressure;
    const relativeHumidity = monitor.hygrometer.relativeHumidity;

    graphs.temperature.update(temperature);
    graphs.pressure.update(pressure);
    graphs.relativeHumidity.update(relativeHumidity);
  }, 470);

  monitor.on('change', handleChange);
});
