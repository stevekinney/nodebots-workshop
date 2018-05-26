const path = require('path');

const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel(),
});

const throttle = require('lodash/throttle');

board.on('ready', () => {
  const express = require('express');
  const app = express();
  const http = require('http').Server(app);
  const io = require('socket.io')(http);
  const port = process.env.PORT || 80;

  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

  const monitor = new five.Multi({
    controller: 'BME280',
  });

  const handleChange = throttle(() => {
    const temperature = monitor.thermometer.fahrenheit;
    const pressure = monitor.barometer.pressure;
    const relativeHumidity = monitor.hygrometer.relativeHumidity;

    io.sockets.emit('weather updated', {
      temperature,
      pressure,
      relativeHumidity,
    });
  }, 500);

  monitor.on('change', handleChange);

  http.listen(port, function() {
    console.log(
      'Your server is up and running on Port ' + port + '. Good job!',
    );
  });
});
