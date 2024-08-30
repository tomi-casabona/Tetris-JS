import "./style.css";
import { BOARD_HEIGHT, BOARD_WIDTH, BLOCK_SIZE } from "./public/const";
import { canvas, context, $pause, audio, $start } from "./public/const";
import { piece } from "./public/const";
import { board } from "./public/helpers/createBoard";
import { checkCollition } from "./public/helpers/checkCollition";
import { removeRows } from "./public/helpers/removeRows";
import { solidifyPiece } from "./public/helpers/solidifyPiece";
import { updateScore } from "./public/helpers/updateScore";
import { draw } from "./public/helpers/draw";
import { handleGameControls } from "./public/helpers/gameControls";
import { pauseGame, resumeGame, startGame } from "./public/helpers/timer";
import { handleMovement, handleRotation } from "./public/helpers/movement";
import { getIsPaused } from "./public/helpers/gameState";

canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;
context.scale(BLOCK_SIZE, BLOCK_SIZE);
audio.volume = 0.3;
audio.loop = true;

let dropCounter = 0;
let lastTime = 0;

// Actualiza el juego
export function update(time = 0) {
  if (getIsPaused()) return;
  const deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;

  if (dropCounter > 700) {
    piece.position.y++;
    dropCounter = 0;

    if (checkCollition(piece, board)) {
      piece.position.y--;
      solidifyPiece(piece, board);
      removeRows(board);
      updateScore();
    }
  }

  draw(context, board, piece, canvas);
  window.requestAnimationFrame(update);
}

handleGameControls(startGame, pauseGame, resumeGame);

document.addEventListener("keydown", (event) => {
  handleMovement(event, piece, board);
  handleRotation(event, piece, board);
});
