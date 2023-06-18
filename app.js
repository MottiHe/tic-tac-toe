const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const gameLogic = require('./gameLogic');

app.use(express.static('public'));

io.on('connection', socket => {
  gameLogic.handleConnection(io, socket);

  socket.on('move', (row, col) => {
    gameLogic.handleMove(io, row, col);
  });

  socket.on('disconnect', () => {
    gameLogic.handleDisconnect(io);
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
