const socket = io();

const temperatureMetric = document.getElementById('temperature');
const pressureMetric = document.getElementById('pressure');
const relativeHumidityMetric = document.getElementById('relative-humidity');

socket.on('light changed', light => {
  const v = 255 * light;
  document.body.style.backgroundColor = `rgb(${v}, ${v}, ${v})`;
});
