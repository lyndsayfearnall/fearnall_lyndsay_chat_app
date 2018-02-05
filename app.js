const express = require('express'); // just like an include or require with PHP
const app = express(); // create an instance of our application via simpleExpress
const io = require('socket.io')();

app.use(express.static('public'));

//set up routes
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/users'));

const server = app.listen(3000, () => {
  console.log('listening on port 3000!');
});

io.attach(server);

io.on('connection', (socket) => {
  console.log('a user has connected!');
  io.emit('chat message', { for: 'everyone', msg : `${socket.id} is here!`});
  //'chat message' is the message that io. emits from the server, we listen for this event with js so we can do something with it

  //handle message sent from the client
  socket.on('chat message', msg => {
    io.emit('chat message', { for: 'everyone', msg})
  });

  socket.on('disconnect', (socket) => {
    console.log('a user has disconnected!');

    io.emit('disconnect message', `${socket.id} has left the building!`);
  });


});
