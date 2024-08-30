import { EVENT_MOVEMENTS, piece } from "../const";
import { checkCollition } from "./checkCollition";
import { removeRows } from "./removeRows";
import { solidifyPiece } from "./solidifyPiece";
import { updateScore } from "./updateScore";

export function handleMovement(event, piece, board) {
  if (event.key === EVENT_MOVEMENTS.LEFT) {
    piece.position.x--;
    if (checkCollition(piece, board)) {
      piece.position.x++;
    }
  }
  if (event.key === EVENT_MOVEMENTS.RIGHT) {
    piece.position.x++;
    if (checkCollition(piece, board)) {
      piece.position.x--;
    }
  }
  if (event.key === EVENT_MOVEMENTS.DOWN) {
    piece.position.y++;
    if (checkCollition(piece, board)) {
      piece.position.y--;
      solidifyPiece(piece);
      removeRows(board, updateScore);
    }
  }
}
export function handleRotation(event, piece, board) {
  if (event.key === EVENT_MOVEMENTS.UP) {
    const rotated = [];
    for (let i = 0; i < piece.shape[0].length; i++) {
      const row = [];
      for (let j = piece.shape.length - 1; j >= 0; j--) {
        row.push(piece.shape[j][i]);
      }
      rotated.push(row);
    }
    const previousShape = piece.shape;
    piece.shape = rotated;
    if (checkCollition(piece, board)) {
      piece.shape = previousShape;
    }
  }
}
