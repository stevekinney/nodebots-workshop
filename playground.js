var five = require('johnny-five');
var Tessel = require('tessel-io');
var board = new five.Board({
  io: new Tessel(),
});

const env = require('./env');
const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(env.sendgrid);

const throttle = require('lodash/throttle');

const openMessage = {
  to: 'tessel-run@mailinator.com',
  from: 'steves-tessel@stevekinney.net',
  subject: 'The Door Has Been Opened',
  text: 'Everything we feared is happening now.',
  html: '<p>Everything we feared is happening now.</p>',
};

board.on('ready', () => {
  const door = new five.Switch({
    pin: 'a2',
    invert: true,
  });

  const handleOpen = throttle(() => {
    console.log('ALERTING EVERYONE TO THE TERRIBLE EVENT!');
    sendgrid
      .send(openMessage)
      .then(() => console.log('Sent the warning email. Preparing to panic.'))
      .catch(() => console.log('Something went terribly, terribly wrong'));
  }, 2000);

  door.on('open', handleOpen);
  door.on('close', () => console.log('close'));
});
