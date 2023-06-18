let playerCount = 0;
let currentPlayer = 'X';
let board = [['', '', ''], ['', '', ''], ['', '', '']];

let waitingForPlayer = false;

function handleConnection(io, socket) {
  playerCount++;

  socket.emit('initialBoard', board);

  if (playerCount === 1) {
    socket.emit('waitingForPlayer');
    waitingForPlayer = true;
  } else if (playerCount === 2) {
    io.emit('startGame');
    waitingForPlayer = false;
  }
}

function handleMove(io, row, col) {
  if (playerCount === 2 && !waitingForPlayer && row >= 0 && row < 3 && col >= 0 && col < 3 && board[row][col] === '') {
    board[row][col] = currentPlayer;
    io.emit('updateBoard', board);

    const winner = checkWinner();
    if (winner) {
      io.emit('gameOver', winner);
      resetBoard();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function handleDisconnect(io) {
  playerCount--;

  if (playerCount === 1) {
    io.emit('opponentDisconnected');
    resetBoard();
  } else if (playerCount === 0) {
    playerCount = 0;
    io.emit('waitingForPlayer');
    waitingForPlayer = true;
  }
}

function checkWinner() {
  // Check rows
  for (let row = 0; row < 3; row++) {
    if (board[row][0] !== '' && board[row][0] === board[row][1] && board[row][0] === board[row][2]) {
      return board[row][0];
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (board[0][col] !== '' && board[0][col] === board[1][col] && board[0][col] === board[2][col]) {
      return board[0][col];
    }
  }

  // Check diagonals
  if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return board[0][0];
  }

  if (board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    return board[0][2];
  }

  if (isBoardFull()) {
    return 'tie';
  }

  return null;
}

function isBoardFull() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === '') {
        return false;
      }
    }
  }
  return true;
}

function resetBoard() {
  board = [['', '', ''], ['', '', ''], ['', '', '']];
}

module.exports = {
  handleConnection,
  handleMove,
  handleDisconnect
};
