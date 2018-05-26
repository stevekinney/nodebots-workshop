const socket = io();

const temperatureMetric = document.getElementById('temperature');
const pressureMetric = document.getElementById('pressure');
const relativeHumidityMetric = document.getElementById('relative-humidity');

socket.on('weather updated', data => {
  const { temperature, pressure, relativeHumidity } = data;
  temperatureMetric.textContent = temperature;
  pressureMetric.textContent = pressure;
  relativeHumidityMetric.textContent = relativeHumidity;
});
