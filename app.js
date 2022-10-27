const ws = new require('ws'); 
const websocketserver = new ws.Server({ port: 5000 });

const users = [];

websocketserver.on('connection', (newUser) => {
  // console.log('New connection succesful');
  // newUser.send("Welcome to chat");

  users.push(newUser);

  newUser.on('message', (data) => {
    const message = JSON.parse(data);
    users.forEach(user => {
      if (user !== newUser) {
        user.send(JSON.stringify(message));
      } 
    });
  });
});