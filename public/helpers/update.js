import { draw } from "./draw.js";
import { piece, context, canvas } from "../const.js";
import { board } from "./createBoard.js";
import { checkCollition } from "./checkCollition.js";
import { solidifyPiece } from "./solidifyPiece.js";
import { removeRows } from "./removeRows.js";
import { updateScore } from "./updateScore.js";


// // Variables globales (o de módulo)
// let dropCounter = 0;
// let lastTime = 0;
// let isPaused = true; // Asume que el juego comienza en pausa

// export function update(time = 0) {
//   if (isPaused) return;

//   const deltaTime = time - lastTime;
//   lastTime = time;

//   dropCounter += deltaTime;

//   if (dropCounter > 1000) {
//     piece.position.y++;
//     dropCounter = 0;

//     if (checkCollition()) {
//       piece.position.y--;
//       solidifyPiece();
//       removeRows();
//       updateScore();
//     }
//   }

//   draw(context, board, piece, canvas);
//   window.requestAnimationFrame(update);
// }

// // Función para iniciar o reanudar el juego
// export function startGame() {
//   isPaused = false;
//   lastTime = performance.now(); // Actualiza lastTime cuando se inicia o reanuda
//   dropCounter = 0; // Reinicia el contador de caída
//   window.requestAnimationFrame(update);
// }

// // Función para pausar el juego
// export function pauseGame() {
//   isPaused = true;
// }

// export function update(isPaused, lastTime, dropCounter) {
//   if (isPaused) return;

//   const time = performance.now();
//   const deltaTime = time - lastTime;
//   lastTime = time;
//   dropCounter += deltaTime;

//   if (dropCounter > 1000) {
//     piece.position.y++;
//     dropCounter = 0;

//     if (checkCollition(piece, board)) {
//       piece.position.y--;
//       solidifyPiece(piece);
//       removeRows(board, updateScore);
//     }
//   }

//   draw(context, board, piece, canvas);

//   if (isPaused === false) {
//     window.requestAnimationFrame(() => update(isPaused, lastTime, dropCounter));
//   }
// }
