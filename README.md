# Tic-Tac-Toe Game Readme

This README provides an overview of the Tic-Tac-Toe game implemented using Node.js and socket.io. The game allows two players to connect and play against each other in a browser-based environment.

## Game Logic

The game logic is implemented in the `gameLogic.js` file. Here's an explanation of the different functions and what they do:

- `handleConnection(io, socket)`: Handles a player's connection to the game. It initializes the game board and checks if there are enough players to start. If there's only one player, it shows a waiting message. If there are two players, the game starts.

- `handleMove(io, row, col)`: Handles a player's move. It checks if the move is valid and it's the player's turn. If the move is valid, it updates the board, notifies all players about the updated board, and checks if there's a winner. If there's a winner, it notifies all players about the winner and resets the board. If the game ends in a tie, it notifies all players about the tie. Otherwise, it updates the current player and switches the turn.

- `handleDisconnect(io)`: Handles a player's disconnection. It adjusts the player count and performs necessary actions based on the remaining players. If one player remains, it notifies the remaining player about the disconnection and resets the board. If no players remain, it shows a waiting message, indicating that the game is waiting for another player to join.

- `checkWinner()`: Checks the game board for a winner. It examines rows, columns, and diagonals to find a winning pattern. If a winner is found, it returns the sign ('X' or 'O') of the winner. If there's no winner but the board is full, it returns 'tie'. Otherwise, it returns null.

- `isBoardFull()`: Checks if the game board is full, i.e., all cells are occupied. It iterates through all cells and returns true if they are all occupied, and false otherwise.

- `resetBoard()`: Resets the game board by emptying all cells.