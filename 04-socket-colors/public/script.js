const socket = io();

const colorPicker = document.getElementById('color-picker')

colorPicker.addEventListener('change', (event) => {
  const color = event.target.value;
  console.log({ color });
  socket.emit('colorChange', color);
});
