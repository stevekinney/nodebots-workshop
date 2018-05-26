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

const openMessage = {
  to: 'tessel-practice-run-totally-mine@mailinator.com',
  from: 'tesselrun@stevekinney.net',
  subject: 'The Door Has Been Opened',
  text: 'Everything we feared is happening.',
  html: '<p><strong>Return home!</strong> Everything we feared is happening.<p>',
};

const closeMessage = {
  to: 'tessel-practice-run-totally-mine@mailinator.com',
  from: 'tesselrun@stevekinney.net',
  subject: 'The Door Has Been Opened',
  text: 'Everything we feared is happening.',
  html: '<p><strong>Return home!</strong> Everything we feared is happening.<p>',
};

board.on('ready', () => {
  const door = new five.Switch({
    pin: 'a2',
    invert: true,
  });

  door.on('open', () => {
    console.log('Going to post a tweet about the door being opened.');
    sendgrid
      .send(openMessage)
      .then(() => console.log('Success!'))
      .catch(() => console.error('Error!'));
  });

  door.on('close', () => {
    console.log('Closed.');
  });
});
