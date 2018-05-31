const socket = io();
const colorPicker = document.getElementById('color-picker');

colorPicker.addEventListener('change', () => {
  console.log({ color: colorPicker.value });
  socket.emit('color change', { color: colorPicker.value });
});
