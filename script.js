const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

resetButton.addEventListener("click", resetGame);

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !isGameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `🎉 Player ${currentPlayer} wins! 🎉`;
    triggerConfetti();
    isGameActive = false;
  } else if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winConditions.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => (cell.textContent = ""));
}

// Confetti Celebration 🎉
function triggerConfetti() {
  const end = Date.now() + 1000;
  const colors = ['#bb0000', '#ffffff', '#00e5ff', '#ff4081'];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

