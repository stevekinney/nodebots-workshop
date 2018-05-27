const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel(),
});

const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 80;

let isPressed = false;

const getMessage = () => {
  if (isPressed) return 'The button is currently being pressed';
  return 'Nobody is pressing the button.';
};

const button = new five.Button({
  pin: 'a2',
  isPullup: true,
});

button.on('down', function() {
  isPressed = true;
});

button.on('up', function() {
  isPressed = false;
});

app.get('/', function(req, res) {
  res.status(200).send(getMessage());
});

http.listen(port, function() {
  console.log('Your server is up and running on Port ' + port + '. Good job!');
});
