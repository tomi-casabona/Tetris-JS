import "./style.css";
import { BOARD_HEIGHT, BOARD_WIDTH, BLOCK_SIZE } from "./public/const";
import { EVENT_MOVEMENTS } from "./public/const";
import { canvas, context, $pause, audio, $start } from "./public/const";
import { piece } from "./public/const";
import { board } from "./public/helpers/createBoard";
//import { update } from "./public/helpers/update";
import { checkCollition } from "./public/helpers/checkCollition";
import { removeRows } from "./public/helpers/removeRows";
import { solidifyPiece } from "./public/helpers/solidifyPiece";
//import { startGame } from "./public/helpers/startGame";
import { updateScore } from "./public/helpers/updateScore";
import { draw } from "./public/helpers/draw";

// TODO : REFACTORICE !!!
// TODO : timer.
// TODO : proxima ficha.
// TODO : nombre jugador.

canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;
context.scale(BLOCK_SIZE, BLOCK_SIZE);
audio.volume = 0.3;
audio.loop = true;

let isStarted = false;

// Variables globales (o de módulo)
let dropCounter = 0;
let lastTime = 0;
let isPaused = true; // Asume que el juego comienza en pausa

export function update(time = 0) {
  if (isPaused) return;

  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;

  if (dropCounter > 1000) {
    piece.position.y++;
    dropCounter = 0;

    if (checkCollition(piece, board)) {
      piece.position.y--;
      solidifyPiece(piece);
      removeRows(board, updateScore);
      updateScore();
    }
  }

  draw(context, board, piece, canvas);
  window.requestAnimationFrame(update);
}

// Función para iniciar o reanudar el juego
export function startGame() {
  isPaused = false;
  $start.remove();
  lastTime = performance.now(); // Actualiza lastTime cuando se inicia o reanuda
  dropCounter = 0; // Reinicia el contador de caída
  window.requestAnimationFrame(update);
}

// Función para pausar el juego
export function pauseGame() {
  isPaused = true;
}

// on click y on keydown for pause or start
document.addEventListener("click", () => {
  if (isStarted === false) {
    startGame();

    isStarted = true;
  } else {
    isPaused = !isPaused;

    if (isPaused) {
      $pause.style.display = "grid";
      audio.pause();
    } else {
      $pause.style.display = "none";
      update();
      audio.play();
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (isStarted === false) {
      startGame();
      isStarted = true;
    } else {
      isPaused = !isPaused;

      if (isPaused) {
        $pause.style.display = "grid";
        audio.pause();
      } else {
        $pause.style.display = "none";
        dropCounter = 0;
        lastTime = performance.now(); // Reiniciar lastTime al reanudar
        update();
        audio.play();
      }
    }
  }
});

// on key down for move
document.addEventListener("keydown", (event) => {
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
});
