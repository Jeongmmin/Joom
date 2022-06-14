const messageList = document.querySelector('ul');
const nickFrom = document.querySelector('#nickname');
const messageForm = document.querySelector('#message');

const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = {type, payload};
  return JSON.stringify(msg);
}

// 메세지 받기
socket.addEventListener('open', () => {
  console.log('connented to Server ✅');
});

socket.addEventListener('message', (message) => {
  const li = document.createElement('li');
  li.innerHTML = message.data;
  messageList.append(li);
  // console.log('New message: ', message.data);
});

socket.addEventListener('close', () => {
  console.log('Disconnented from Server ❌');
});

// setTimeout(() => {
//   socket.send('hello from the browser!');
// }, 10000);

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector('input');
  socket.send(makeMessage('new_message', input.value));
  input.value = '';
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickFrom.querySelector('input');
  socket.send(makeMessage('nickname', input.value));
  alert('success!✅')
  input.value = '';
}

messageForm.addEventListener('submit', handleSubmit);
nickFrom.addEventListener('submit', handleNickSubmit);
