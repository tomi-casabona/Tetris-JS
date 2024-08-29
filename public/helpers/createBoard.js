
import { BOARD_HEIGHT, BOARD_WIDTH } from "../const";

 function createBoard(width, height) {
    return Array(height)
      .fill()
      .map(() => Array(width).fill(0));
  }

  export const board = createBoard(BOARD_WIDTH, BOARD_HEIGHT);
