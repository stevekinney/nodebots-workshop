const Tessel = require('tessel-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new Tessel(),
});

const request = require('superagent');
const throttle = require('lodash/throttle');

board.on('ready', () => {
  const monitor = new five.Multi({
    controller: 'BME280',
  });

  const handleChange = throttle(() => {
    const temperature = monitor.thermometer.fahrenheit;
    const pressure = monitor.barometer.pressure;
    const relativeHumidity = monitor.hygrometer.relativeHumidity;

    const data = { temperature, pressure, relativeHumidity };

    request
      .post('https://available-airbus.glitch.me/current-weather')
      .send(data)
      .set('accept', 'json')
      .end((err, res) => {
        console.log('Updating server', data);
      });
  }, 1000);

  monitor.on('change', handleChange);
});
