const Tessel = require('tessel-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new Tessel(),
});

const sendgrid = require('@sendgrid/mail');

const env = require('../env');
sendgrid.setApiKey(env.sendgrid);

if (!env.sendgrid) {
  throw new Error('You need to put a SendGrid API key into env.json');
}

// Our code here!

board.on('ready', () => {
  // More code here!
});
