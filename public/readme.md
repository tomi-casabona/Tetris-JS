# TETRIS - JS

This is a Tetris game developed in pure JavaScript, inspired by the Midudev project. While following the base structure of the original project, I have introduced several improvements and refactorings to enhance both functionality and user experience. The result is a polished, classic Tetris game that runs entirely in the browser.

### How to play Tetris.

Tetris is a puzzle game where the goal is to clear lines by stacking falling blocks, called Tetriminos, that come in different shapes. Each Tetrimino can be rotated and moved left or right as it falls. When a row is completely filled with blocks, it clears from the board, and you earn points. The game ends when the blocks stack up to the top of the screen. The challenge is to keep clearing lines while managing the increasing speed of the falling blocks.

### Controls.

- "Arrow Up" = Rotate piece.
- "Arrow Down" = Move piece down.
- "Arrow Left" = Move piece to the left.
- "Arrow Right" = Move piece to the right.
- "Enter or Click" = Start game / Pause game.
- "R" = Refresh page.

## Play DEMO on vercel.

Check out the live version of the game deployed on Vercel:
[Tetris Game on Vercel](https://tetris-js-tomascasabona.vercel.app/)

### How to install.

To get started with this project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tomi-casabona/Tetris-JS
   ```
2. **Navigate to the project directory:**
   ```bash
   cd TETRIS-JS
   ```
3. **Install the dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```

This will start a local development server, and you can view the game by opening your browser and navigating to the local server address (typically `http://localhost:3000` or similar).

No additional dependencies are required since the game is built entirely with vanilla JavaScript, HTML, and CSS.
