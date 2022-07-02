const socket = io();

const welcome = document.getElementById('welcome');
const Enterform = welcome.querySelector('#enter');
const nameForm = welcome.querySelector('#name');
const room = document.getElementById('room');
const setName = welcome.querySelector('h3');

room.hidden = true;
setName.hidden = true;

let roomName;

function addMessage(message) {
  const ul = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector('#msg input');
  const value = input.value;
  socket.emit('new_message', input.value, roomName, () => {
    addMessage(`You: ${value}`);
    input.value = '';
  });
}

function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = welcome.querySelector('#name input');
  socket.emit('nickname', input.value);
  setName.innerText = `Hi ${input.value}`;
  input.value = '';
  setName.hidden = false;
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName}`;
  const msgForm = room.querySelector('#msg');
  // const nameForm = room.querySelector('#name');
  msgForm.addEventListener('submit', handleMessageSubmit);
  // nameForm.addEventListener('submit', handleNicknameSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = Enterform.querySelector('input');
  socket.emit('enter_room', input.value, showRoom);
  roomName = input.value;
  input.value = '';
}

Enterform.addEventListener('submit', handleRoomSubmit);
nameForm.addEventListener('submit', handleNicknameSubmit);

socket.on('welcome', (user) => {
  addMessage(`${user} joined! 😆`);
});

socket.on('bye', (left) => {
  addMessage(`${left} left! 😥`);
});

socket.on('new_message', addMessage);

socket.on('room_change', (rooms) => {
  const roomList = welcome.querySelector('ul');
  roomList.innerText = '';
  if (rooms.length === 0) {
    return;
  }
  rooms.forEach((room) => {
    const li = document.createElement('li');
    li.innerText = room;
    roomList.append(li);
  });
});
