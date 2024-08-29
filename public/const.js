// 1) inicializar el canvas

export const canvas = document.querySelector("canvas");
export const context = canvas.getContext("2d");
export const $score = document.getElementById("score");
export const $start = document.getElementById("start");
export const $pause = document.getElementById("paused");

// 2) Board
export const BLOCK_SIZE = 20;
export const BOARD_WIDTH = 14;
export const BOARD_HEIGHT = 30;

// First Piece

export const piece = {
  position: { x: 6, y: 0 },
  shape: [
    [1, 1],
    [1, 1],
  ],
};

// ARRAY OF PEICES
export const PIECES = [
  [
    [1, 1],
    [1, 1],
  ],
  [[1, 1, 1, 1]],
  [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
];

// 4) Piece Movements

export const EVENT_MOVEMENTS = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  DOWN: "ArrowDown",
  UP: "ArrowUp",
};

export const audio = new Audio("/tetris.mp3");
