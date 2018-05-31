# Play by Play

<!-- TOC -->

- [Play by Play](#play-by-play)
  - [First, an important disclaimer](#first-an-important-disclaimer)
  - [Exercise 0: Getting a Tessel to Blink](#exercise-0-getting-a-tessel-to-blink)
  - [Exercise 1: Working with Johnny-Five](#exercise-1-working-with-johnny-five)
    - [How to Bread Board](#how-to-bread-board)
    - [Wiring Up the LED for the Breadboard](#wiring-up-the-led-for-the-breadboard)
    - [Fading the LED](#fading-the-led)
  - [Exercise 2: Working with a Button](#exercise-2-working-with-a-button)
    - [Getting the Web Involved](#getting-the-web-involved)
    - [Exercise 3: Rainbow LEDs](#exercise-3-rainbow-leds)
    - [Dynamically Posting Colors From the Web](#dynamically-posting-colors-from-the-web)
    - [Dynamically Posting Colors From the Web](#dynamically-posting-colors-from-the-web-1)
  - [Exercise 4: Weather Station](#exercise-4-weather-station)
    - [Weather and Sockets](#weather-and-sockets)
    - [Remote Servers](#remote-servers)
  - [Exercise 5: Light Sensor](#exercise-5-light-sensor)
    - [With WebSockets](#with-websockets)
  - [Door Switch](#door-switch)
    - [Hitting a Third Party API](#hitting-a-third-party-api)
  - [LCD (No Sound System)](#lcd-no-sound-system)
    - [LCD and WebSockets](#lcd-and-websockets)
    - [LCD and Streaming Data](#lcd-and-streaming-data)

<!-- /TOC -->

## First, an important disclaimer

What follows are [Steve's][me] notes for this workshop. They are written for him as the primary audience, but they're posted here because they _might_ be helpful to you. **Warning**: They might also contain spoilers (not to mention typos and partially coherent sentences). You've been warned.

[me]: https://twitter.com/stevekinney

**Slides**: Show the slides for "About the Tessel 2"

## Exercise 0: Getting a Tessel to Blink

- `00-tessel-intro` contains the default "Hello World" code that makes some of the built-in LEDs on the device blink.
- Run it by typing `t2 run 00-tessel-intro`

Here is the code that's built-in to this example:

```js
'use strict';

const tessel = require('tessel');

setInterval(() => {
  tessel.led[2].toggle();
  tessel.led[3].toggle();
}, 100);

console.log("I'm blinking! (Press CTRL + C to stop)");
```

Before we start the `setInterval` loop, let's turn on one of LEDs first and see how that changes things.

```js
tessel.led[2].on();
```

When you kill the program, one of the lights might still be on. If this bothers you. Modify the script to them both off and run it again.

Very cool.

## Exercise 1: Working with Johnny-Five

Johnny-Five is a helpful abstraction and set of JavaScript bindings for a wide range of hardware. It's what we'll primarily be using today.

Let's get an LED blinking.

**Hardware**: Take an LED from the kit. (Your choice on the color.) Take the short end and plug it into the very first GPIO port. This is the ground. Take the other

```js
const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel(),
});

board.on('ready', () => {
  const led = new five.Led('a0');
  led.blink(500);
});
```

500 is the number of milliseconds.

- Spend a few seconds adjusting the time.
- Try 50. Try 2000.

**Stop for a minute**: Make use of Visual Studio. What are some of the other methods on LEDs?

There is clearly some fun stuff here. Let's take a look at the wonderful [docs](http://johnny-five.io/);

### How to Bread Board

(Switch over to the slides.)

### Wiring Up the LED for the Breadboard

Now that we're breadboard masters. (There is a branding opportunity here, Marc.) Let's wire up a breadboard.

Once we're wired up, let's fire up that code we had before.

Everything should work pretty much the same.

### Fading the LED

What happens if we try this code?

```js
board.on('ready', () => {
  const led = new five.Led('a0');
  led.pulse(500);
});
```

_KABOOM!_ But, in the chaos, there is helpfulness.

```
Error: Pin Error: 0 is not a valid PWM pin (Led)
```

(Show slides on PWM.)

Now, let's rewire our board to use either port 5 or 6 and update our code accordingly.

(Change code first for camera reasons.)

```js
board.on('ready', () => {
  const led = new five.Led('a5');
  led.pulse(500);
});
```

## Exercise 2: Working with a Button

(Show the diagram for the wiring.)

Let's start by wiring this up similar to the diagram.

- Buttons are not polarized. So, don't stress out about it.
- `isPullup` triggers

```js
board.on('ready', () => {
  const led = new five.Led('a0');
  const button = new five.Button({
    pin: 'a2',
    isPullup: true,
  });

  button.on('down', () => {
    led.on();
  });

  button.on('up', () => {
    led.off();
  });
});
```

`pressed` and `released` are aliases for `down` and `up`, respectively.

```js
button.on('press', () => console.log('Pressed!'));
button.on('release', () => console.log('Released!'));
button.on('hold', () => console.log('Hold!'));
```

### Getting the Web Involved

It turns out that JavaScript is not just for the hardware. It also works with the web! One of the most exciting things about working with hardware with JavaScript is that it makes it super easy to integrate with web servers and APIs.

```js
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

button.on('down', () => {
  isPressed = true;
});

button.on('up', () => {
  isPressed = false;
});

app.get('/', (req, res) => {
  res.status(200).send(getMessage());
});

http.listen(port, () => {
  console.log('Your server is up and running on Port ' + port + '. Good job!');
});
```

To figure out the IP address of your Tessel, you can do `t2 wifi`.

- Visit the website.
- Now, how down the button and visit the website.

That's right. You controlled a website with your finger. Nice job.

### Exercise 3: Rainbow LEDs

Rainbow LEDs are kind of a cheat—they're really just three LEDs and you can blend.

Let's cycle between them.

```js
board.on('ready', () => {
  const led = new five.Led.RGB({
    pins: {
      red: 'a5',
      green: 'a6',
      blue: 'b5',
    },
  });

  var index = 0;
  const colors = ['red', 'green', 'blue'];

  board.loop(500, () => {
    led.color(colors[index++ % colors.length]);
  });
});
```

Take a few minutes and try some other ridiculous CSS colors. You're worth it. Try some hex codes.

### Dynamically Posting Colors From the Web

```js
const five = require('johnny-five');
const Tessel = require('tessel-io');
const board = new five.Board({
  io: new Tessel(),
});

const path = require('path');

board.on('ready', () => {
  const led = new five.Led.RGB({
    pins: {
      red: 'a5',
      green: 'a6',
      blue: 'b5',
    },
  });

  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express();
  const http = require('http').Server(app);
  const port = process.env.PORT || 80;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

  app.post('/', (req, res) => {
    const { color } = req.body;
    console.log('Setting color: %s', color);
    led.color(color);
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

  http.listen(port, () => {
    console.log(
      'Your server is up and running on Port ' + port + '. Good job!',
    );
  });
});
```

For funzies—do a bad thing™ and remove the response in the `POST` request. This will cause the browser to not reload the page, which has an interesting effect.

### Dynamically Posting Colors From the Web

So, we cheated with some real time stuff—but what if we just used WebSockets. Remember, this is all just JavaScript. So anything we can do in either the browser or in Node is fair game.

- Take a tour of the code
- Look at `public/index.html`
- Look at `public/script.js`

Server-side implementation:

```js
io.on('connection', (socket) => {
  socket.on('colorChange', color => {
    led.color(color);
  });
});
```

(The rest is in the file already.)

## Exercise 4: Weather Station

- It's called the BME280.
- Support out of the box from Johnny-Five's `Multi` class.
- It uses the I2C protocol.
  - This isn't necessary knowledge for working with it.
  - It's basically a serially protocol that involves a lot fewer wires.

Let's wire it up!

Once it's wired up, we can have to vomit to the console.

```js
board.on('ready', () => {
  const monitor = new five.Multi({
    controller: 'BME280',
  });

  monitor.on('change', () => {
    const temperature = monitor.thermometer.fahrenheit;
    const pressure = monitor.barometer.pressure;
    const relativeHumidity = monitor.hygrometer.relativeHumidity;

    console.log({ temperature, pressure, relativeHumidity });
  });
});
```

We can make that a little less nuts by using Lodash's throttle and Barcli.

```js
const Barcli = require('barcli');
const throttle = require('lodash/throttle');

const graphs = {
  temperature: new Barcli({ label: 'Temperature', range: [0, 120] }),
  pressure: new Barcli({ label: 'Pressure', range: [0, 100] }),
  relativeHumidity: new Barcli({ label: 'Relative Humidity', range: [0, 100] }),
};

board.on('ready', () => {
  const monitor = new five.Multi({
    controller: 'BME280',
  });

  const handleChange = throttle(() => {
    graphs.temperature.update(monitor.thermometer.fahrenheit);
    graphs.pressure.update(monitor.barometer.pressure);
    graphs.relativeHumidity.update(monitor.hygrometer.relativeHumidity);
  }, 500);

  monitor.on('change', handleChange);
});
```

### Weather and Sockets

Take a tour of the files in the public directory.

```js
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
```

### Remote Servers

We have been sending requests to our device. But, it can go the other way as well. Again, it's just node. We can actually send information out to remove servers.

I have one set up on Glitch. Let's take a look.

https://glitch.com/edit/#!/available-airbus

Cool, so let's talk to this server.

We're going to want to trottle this request, because it's not polite to DDOS Glitch, but here is what the request looks like.

```js
request
  .post('https://available-airbus.glitch.me/current-weather')
  .send(data)
  .set('accept', 'json')
  .end((err, res) => {
    console.log('Updating server', data);
  });
```

Don't hit my server. Hit the remix button and make your own version, please. 😃

## Exercise 5: Light Sensor

Working with a light sensor is suspiciously easy.

(It's actually called a photoresistor, but whatever.)

```js
const light = new five.Light('a7');

light.on('change', () => console.log(light.level));
```

### With WebSockets

You've probably figured out by now that this never gets old for me.

On the server:

```js
io.on('connection', socket => {
  light.on('change', () => {
    io.sockets.emit('light changed', light.level);
  });
});
```

On the client:

```js
socket.on('light changed', light => {
  const v = 255 * light;
  document.body.style.backgroundColor = `rgb(${v}, ${v}, ${v})`;
});
```

## Door Switch

```js
board.on('ready', () => {
  const door = new five.Switch({
    pin: 'a2',
    invert: true, // I don't think I need this.
  });

  door.on('open', () => console.log('open'));
  door.on('close', () => console.log('close'));
});
```

### Hitting a Third Party API

I'm not biased or anything, but let's hit the SendGrid API. (Take people through getting a key.)

Let's make a message.

```js
const openMessage = {
  to: 'tessel-practice-run-totally-mine@mailinator.com',
  from: 'tesselrun@stevekinney.net',
  subject: 'The Door Has Been Opened',
  text: 'Everything we feared is happening.',
  html: '<p><strong>Return home!</strong> Everything we feared is happening.<p>',
};
```

To call the API.

```js
door.on('open', () => {
  console.log('Going to post a tweet about the door being opened.');
  sendgrid
    .send(openMessage)
    .then(() => console.log('Success!'))
    .catch(() => console.error('Error!'));
});
```

## LCD (No Sound System)

The wiring for this one is going to take a bit.

```js
board.on('ready', () => {
  var lcd = new five.LCD({
    pins: ['a2', 'a3', 'a4', 'a5', 'a6', 'a7'],
  });

  lcd.cursor(0, 0).print('Hello');
  lcd.cursor(1, 0).print('World');
});
```

What about some emoji action?

```js
lcd.print(":heart:");
```

You can see all of the predefined characters [here](http://johnny-five.io/api/lcd/#predefined-characters).

How about scrolling?

```js
lcd.autoscroll().print("Bloop").print("Bleep");
```

### LCD and WebSockets

<!-- Insert example with WebSockets here.-->

### LCD and Streaming Data

<!-- Insert example with Tweets here.-->
