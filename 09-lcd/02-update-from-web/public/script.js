const inputs = document.querySelectorAll('.message-input');

for (const input of inputs) {
  input.addEventListener('change', () => {
    console.log({ [input.name]: input.value });
  });
}
