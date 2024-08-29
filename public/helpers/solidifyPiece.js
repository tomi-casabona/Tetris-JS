import { board } from "./createBoard";
import { checkCollition } from "./checkCollition";
import { PIECES, BOARD_WIDTH } from "../const";

export function solidifyPiece(piece) {
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
    window.alert("Game Over!!!");
    board.forEach((row) => row.fill(0));
  }
}
