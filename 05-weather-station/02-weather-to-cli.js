const Tessel = require('tessel-io')
const five = require('johnny-five')
const board = new five.Board({
  io: new Tessel()
})

const Barcli = require('barcli')
const throttle = require('lodash/throttle')

const graphs = {
  temperature: new Barcli({ label: 'Temperature', range: [0, 120] }),
  pressure: new Barcli({ label: 'Pressure', range: [0, 100] }),
  relativeHumidity: new Barcli({ label: 'Relative Humidity', range: [0, 100] })
}

board.on('ready', () => {
  const monitor = new five.Multi({
    controller: 'BME280'
  })

  const handleChange = throttle(() => {
    graphs.temperature.update(monitor.thermometer.fahrenheit)
    graphs.pressure.update(monitor.barometer.pressure)
    graphs.relativeHumidity.update(monitor.hygrometer.relativeHumidity)
  }, 500)

  monitor.on('change', handleChange)
})
