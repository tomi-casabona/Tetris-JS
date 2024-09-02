import { $score } from "../const";

export function setDifficult() {
  let score = parseInt($score.innerText);
  let difficult;
  score < 50
    ? (difficult = 1000)
    : score >= 50 && score < 100
    ? (difficult = 750)
    : score >= 100 && score < 150
    ? (difficult = 500)
    : (difficult = 200);
  return difficult;
}
