const ws = new WebSocket('ws://localhost:5000');

const userNameForm = document.getElementById('username-form');
const messageForm = document.getElementById('messafe-form');
const chatarea = document.getElementById('chatarea');

let userName = null;

const mockMessage = (name, message) => {
  const mMessage = `
    <p>
      <span>${name}</span>
      <span>${message}</span>
    </p>
  `;
  return mMessage;
};

const userNameFormHandler = (e) => {
  e.preventDefault();
  userName = e.target.elements.username.value;
};

const messageFormHandler = (e) => {
  e.preventDefault();
  const message = e.target.elements.message.value;
  chatarea.insertAdjacentHTML('beforeend', mockMessage(userName, message))
  const data = {
    name: userName,
    message
  };
  ws.send(JSON.stringify(data));
  e.target.reset();
};

ws.onmessage = ({ data }) => {
  const { name, message } = JSON.parse(data);
  chatarea.insertAdjacentHTML('beforeend', mockMessage(name, message))

};

userNameForm.addEventListener('submit', userNameFormHandler);
messageForm.addEventListener('submit', messageFormHandler);