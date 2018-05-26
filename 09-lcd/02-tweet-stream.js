var five = require('johnny-five');
var Tessel = require('tessel-io');
var board = new five.Board({
  io: new Tessel(),
});

const env = require('../env');

if (
  !env.twitter.consumer_key ||
  !env.twitter.consumer_secret ||
  !env.twitter.token ||
  !env.twitter.token_secret
)
  throw new Error('You must configure your Twitter keys in env.json.');

const Twitter = require('node-tweet-stream');
const t = (t = new Twitter(env.twitter));

t.on('tweet', tweet => {
  console.log('tweet received', tweet);
});

t.on('error', err => {
  console.log('Oh no', { err });
});

t.track('#fem-nodebots');

board.on('ready', () => {
  // Our code here!
});
