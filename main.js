import "./style.css";
import { BOARD_HEIGHT, BOARD_WIDTH, BLOCK_SIZE } from "./public/const";
import { EVENT_MOVEMENTS } from "./public/const";
import { canvas, context, $pause, audio, $start } from "./public/const";
import { piece } from "./public/const";
import { board } from "./public/helpers/createBoard";
import { checkCollition } from "./public/helpers/checkCollition";
import { removeRows } from "./public/helpers/removeRows";
import { solidifyPiece } from "./public/helpers/solidifyPiece";
import { updateScore } from "./public/helpers/updateScore";
import { draw } from "./public/helpers/draw";

canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;
context.scale(BLOCK_SIZE, BLOCK_SIZE);
audio.volume = 0.3;
audio.loop = true;

let isStarted = false;
let dropCounter = 0;
let lastTime = 0;
let isPaused = true;
let startTime = 0;
let elapsedTime = 0;
let timerInterval;

function updateTimer() {
  if (!isPaused) {
    const currentTime = performance.now();
    elapsedTime = Math.floor((currentTime - startTime) / 1000); // Tiempo en segundos
    document.getElementById("timer").innerText = `${elapsedTime} segundos`;
  }
}

// Actualiza el juego
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
  updateTimer(); // Actualiza el temporizador
  window.requestAnimationFrame(update);
}

// Función para iniciar o reanudar el juego
export function startGame() {
  isPaused = false;
  $start.remove();
  lastTime = performance.now(); // Actualiza lastTime cuando se inicia o reanuda
  startTime = performance.now(); // Inicia el temporizador
  dropCounter = 0; // Reinicia el contador de caída
  window.requestAnimationFrame(update);
}

// Función para pausar el juego
export function pauseGame() {
  isPaused = true;
  clearInterval(timerInterval); // Detén el temporizador al pausar el juego
}

// Función para reanudar el juego
export function resumeGame() {
  isPaused = false;
  startTime = performance.now() - elapsedTime * 1000; // Ajusta el tiempo de inicio al tiempo transcurrido
  timerInterval = setInterval(updateTimer, 1000); // Reanuda el temporizador
}

// on click y on keydown para pausar o iniciar
document.addEventListener("click", () => {
  if (isStarted === false) {
    startGame();
    isStarted = true;
  } else {
    isPaused = !isPaused;

    if (isPaused) {
      $pause.style.display = "grid";
      audio.pause();
      pauseGame(); // Pausa el juego y el temporizador
    } else {
      $pause.style.display = "none";
      resumeGame(); // Reanuda el juego y el temporizador
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
        pauseGame(); // Pausa el juego y el temporizador
      } else {
        $pause.style.display = "none";
        resumeGame(); // Reanuda el juego y el temporizador
        audio.play();
      }
    }
  }
});

// on key down para mover
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

// Recargar página
document.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    window.location.reload();
  }
});
