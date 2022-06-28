const socket = io();

const welcon = document.querySelector('welcome');
const form = welcome.querySelector('form');

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector('input');
  socket.emit('enter_room', { payload: input.value }, () => {
    console.log('server is done!');
  });
  input.value = '';
}

form.addEventListener('submit', handleRoomSubmit);
