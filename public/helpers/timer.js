import { update } from "../../main";
import { $start } from "../const";
import { getIsPaused, setIsPaused } from "./gameState";

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let lastTime;

export function updateTimer() {
  if (!getIsPaused()) {
    const currentTime = performance.now();
    elapsedTime = Math.floor((currentTime - startTime) / 1000);
    document.getElementById("timer").innerText = `${elapsedTime} segundos`;
  }
}

export function startGame() {
  setIsPaused(false);
  $start.remove();
  lastTime = performance.now();
  startTime = performance.now();
  timerInterval = setInterval(updateTimer, 1000);
  window.requestAnimationFrame(update);
}

export function pauseGame() {
  setIsPaused(true);
  clearInterval(timerInterval);
}

export function resumeGame() {
  setIsPaused(false);
  startTime = performance.now() - elapsedTime * 1000;
  timerInterval = setInterval(updateTimer, 1000);
  window.requestAnimationFrame(update);
}
