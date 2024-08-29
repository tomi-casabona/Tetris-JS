import "./style.css";
import { BOARD_HEIGHT, BOARD_WIDTH, BLOCK_SIZE } from "./public/const";
import { EVENT_MOVEMENTS } from "./public/const";
import { canvas, context, $score, $start, $pause, audio } from "./public/const";
import { piece, PIECES } from "./public/const";
import { board } from "./public/helpers/createBoard";

// TODO : timer.
// TODO : proxima ficha.
// TODO : nombre jugador.

canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;
context.scale(BLOCK_SIZE, BLOCK_SIZE);
audio.volume = 0.5;
audio.loop = true;

let score = 0;
let dropCounter = 0;
let lastTime = 0;
let isPaused = false;
let isStarted = false;

function update(time = 0) {
  if (isPaused) return;

  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;

  if (dropCounter > 1000) {
    piece.position.y++;
    dropCounter = 0;

    if (checkCollition()) {
      piece.position.y--;
      solidifyPiece();
      removeRows();
    }
  }
  draw();
  window.requestAnimationFrame(update);
}

function draw() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = "yellow";
        context.fillRect(x, y, 1, 1);
      }
    });
  });

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        context.fillStyle = "red";
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1);
      }
    });
  });

  $score.innerText = score;
}

// removeRow

function removeRows() {
  const rowsToRemove = [];

  board.forEach((row, y) => {
    if (row.every((value) => value === 1)) {
      rowsToRemove.push(y);
    }
  });

  rowsToRemove.forEach((y) => {
    board.splice(y, 1);
    const newRow = Array(BOARD_WIDTH).fill(0);
    board.unshift(newRow);
    score += 10;
  });
}

// on key down
document.addEventListener("keydown", (event) => {
  if (event.key === EVENT_MOVEMENTS.LEFT) {
    piece.position.x--;
    if (checkCollition()) {
      piece.position.x++;
    }
  }
  if (event.key === EVENT_MOVEMENTS.RIGHT) {
    piece.position.x++;
    if (checkCollition()) {
      piece.position.x--;
    }
  }
  if (event.key === EVENT_MOVEMENTS.DOWN) {
    piece.position.y++;
    if (checkCollition()) {
      piece.position.y--;
      solidifyPiece();
      removeRows();
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
    if (checkCollition()) {
      piece.shape = previousShape;
    }
  }
});

function checkCollition() {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value !== 0 && board[y + piece.position.y]?.[x + piece.position.x] !== 0
      );
    });
  });
}

function solidifyPiece() {
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

  if (checkCollition()) {
    window.alert("Game Over!!!");
    board.forEach((row) => row.fill(0));
  }
}
function startGame() {
  update();
  $start.remove();
  audio.play();
}

document.addEventListener("click", () => {
  if (isStarted === false) {
    startGame();
    isStarted = true;
  } else {
    isPaused = !isPaused;

    if (isPaused) {
      $pause.style.display = "grid";
      audio.pause();
    }
    if (!isPaused) {
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
      }
      if (!isPaused) {
        $pause.style.display = "none";

        update();
        audio.play();
      }
    }
  }
});
