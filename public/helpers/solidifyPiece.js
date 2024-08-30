import { checkCollition } from "./checkCollition";
import { PIECES, BOARD_WIDTH, $gameOver, $pause } from "../const";
import { setIsPaused } from "./gameState";

export function solidifyPiece(piece, board) {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        board[y + piece.position.y][x + piece.position.x] = 1;
      }
    });
  });
  piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)];
  piece.position.x = BOARD_WIDTH / 2 - 1;
  piece.position.y = 0;

  // Game over

  if (checkCollition(piece, board)) {
    setIsPaused(true);
    $pause.style.display = "none";
    $gameOver.style.display = "grid";
    document.addEventListener("click", reloadPage);
    document.addEventListener("keydown", reloadPage);
  }
}
function reloadPage() {
  window.location.reload();
}
