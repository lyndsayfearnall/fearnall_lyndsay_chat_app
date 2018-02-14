const express = require('express'); // just like an include or require with PHP
const app = express(); // create an instance of our application via simpleExpress
const io = require('socket.io')();

app.use(express.static('public'));
//app.use([path,] callback [, callback...]) mounts specified middleware function or functions
//express.static(root,[options]) is a built in middleware function, serves static files. Root argument specifies root directory from which to serve static assets

//set up routes
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/users'));

//app.listen binds and listens for connections on specified host and port
const server = app.listen(3000, () => {
  console.log('listening on port 3000!');
});


//set up socket on the server
io.attach(server);

//listens for a connection, then fires function
io.on('connection', (socket) => { //socket refers to individual client making connection with server
  console.log(`${socket.id} has connected!`);
  io.emit('chat message', { for: 'everyone', msg : `${socket.id} is here!`});
  //'chat message' is the message that io. emits from the server, we listen for this event with js so we can do something with it

  //handle message sent from the client
  socket.on('chat message', msg => {
    io.emit('chat message', { for: 'everyone', msg})
  });

  // socket.on('typing', (socket) =>{
  //   socket.broadcast.emit('typing')
  // });

  socket.on('disconnect', (socket) => {
    console.log(`${socket.id} has disconnected!`);

    io.emit('disconnect message', `has left the building!`);
  
  });


});
