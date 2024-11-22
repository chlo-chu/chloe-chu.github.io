// start the board as an array of 9 empty strings
let board = ["", "", "", "", "", "", "", "", ""];
// 3x3 tic tac toe grid, each position starts empty ("") //

// set the current player (X goes first)
let currentPlayer = "X";
// this variable tracks which player's turn

// game status flag
let gameActive = true;
// flag controls if game is ongoing. if false, game stops (after win or draw)

// winning combinations
const winPatterns = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal
  [2, 4, 6]  // Diagonal
];

// function to handle a player's move
function makeMove(index) {
  if (board[index] === "" && gameActive) {
    // checks if selected cell is empty and game is still active

    // update the board and UI
    board[index] = currentPlayer;
    document.getElementById(index).innerText = currentPlayer;
    document.getElementById(index).classList.add("taken");
    // when placed mark in chosen cell, disable further clicks on that cell

    // check for win or draw
    if (checkWin()) {
      showPopup(`${currentPlayer} Wins!`);
      document.getElementById("status").innerText = `Player ${currentPlayer} wins!`;
      gameActive = false;
      return;
      // if current player wins, show pop-up and stop game
    }

    if (checkDraw()) {
      showPopup("It's a Draw!");
      document.getElementById("status").innerText = "It's a draw! Try again";
      gameActive = false;
      return;
      // if it's a draw, show pop-up and stop game
    }

    // switch players
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("status").innerText = `Player ${currentPlayer}'s turn`;
    // switches turn to next player
  }
}

// function to check for a win
function checkWin() {
  for (let i = 0; i < winPatterns.length; i++) {
    // loops through each winning combination
    const [a, b, c] = winPatterns[i];
    if (board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer) {
      // if all three cells in winning combination are filled by current player, return true
      return true;
    }
  }
  return false;
  // if no winning combination found, return false
}

// function to check for a draw
function checkDraw() {
  return board.every(cell => cell !== "");
  // checks if all cells are filled, if it is then game is a draw
}

// function to restart the game
function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  document.getElementById("status").innerText = "Player X's turn";
  // resets the board, start player "X", and set gameActive to true

  // clear the board
  for (let i = 0; i < board.length; i++) {
    const cell = document.getElementById(i);
    cell.innerText = "";
    cell.classList.remove("taken");
    // resets each cell in html, removes all marks and "taken" class
  }

  // hide the pop-up
  document.getElementById("popup").classList.remove("show");
  // hides the pop-up by removing "show" class
}

// function to display a colorful pop-up
function showPopup(message) {
  const popup = document.getElementById("popup");
  popup.innerText = message;
  popup.classList.add("show");
  // sets the message in pop-up and shows it on screen
}
