const socket = io();

const temperature = document.getElementById('temperature');
const pressure = document.getElementById('pressure');
const relativeHumidity = document.getElementById('relative-humidity');

socket.on('weather updated', data => {
  temperature.textContent = data.temperature;
  pressure.textContent = data.pressure;
  relativeHumidity.textContent = data.relativeHumidity;
});
