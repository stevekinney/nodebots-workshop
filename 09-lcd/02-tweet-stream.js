const env = require('../env');

if (!env.twitter)
  throw new Error('You must configure your Twitter keys in env.json.');

const Twitter = require('node-tweet-stream');
const t = (t = new Twitter(env.twitter));

t.on('tweet', tweet => {
  console.log('tweet received', tweet);
});

t.on('error', err => {
  console.log('Oh no', { err });
});

t.track('pizza');
