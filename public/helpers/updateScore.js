import { $score } from "../const";

export function updateScore() {
  const currentScore = parseInt($score.innerText, 10);
  const newScore = currentScore + 10;
  $score.innerText = newScore;
}
