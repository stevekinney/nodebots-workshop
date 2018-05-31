var five = require('johnny-five');
var Tessel = require('tessel-io');
var board = new five.Board({
  io: new Tessel(),
});

const env = require('./env');
const Twitter = require('node-tweet-stream');

const t = new Twitter(env.twitter);

board.on('ready', () => {
  const lcd = new five.LCD({
    pins: ['a2', 'a3', 'a4', 'a5', 'a6', 'a7'],
  });

  t.on('tweet', tweet => {
    const text = tweet.text;
    const firstSixteen = text.slice(0, 16);
    const secondSixteen = text.slice(17);

    lcd.cursor(0, 0).print(firstSixteen);
    lcd.cursor(1, 0).print(secondSixteen);
  });

  t.track('#nodebots');
});
