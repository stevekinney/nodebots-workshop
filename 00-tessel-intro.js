'use strict';

const tessel = require('tessel');

tessel.led[2].on();
tessel.led[3].off();

setInterval(() => {
  tessel.led[2].toggle();
  tessel.led[3].toggle();
}, 100);

console.log("I'm blinking! (Press CTRL + C to stop)");
