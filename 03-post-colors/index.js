const path = require('path');

const five = require('johnny-five')
const Tessel = require('tessel-io')
const board = new five.Board({
  io: new Tessel()
})

board.on('ready', () => {
  const led = new five.Led.RGB({
    pins: {
      red: 'a5',
      green: 'a6',
      blue: 'b5'
    }
  })

  const express = require('express')
  const bodyParser = require('body-parser');
  const app = express()
  const http = require('http').Server(app)
  const port = process.env.PORT || 80

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'))
  })

  app.post('/', function (req, res) {
    const { color } = req.body;
    console.log('Setting color: %s', color);
    led.color(color);
    res.sendFile(path.join(__dirname, '/public/index.html'))
  })

  http.listen(port, function () {
    console.log('Your server is up and running on Port ' + port + '. Good job!')
  })
})

