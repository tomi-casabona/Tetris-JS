// gameState.js
let isStarted = false;
let isPaused = true;

export function getIsStarted() {
  return isStarted;
}

export function setIsStarted(value) {
  isStarted = value;
}

export function getIsPaused() {
  return isPaused;
}

export function setIsPaused(value) {
  isPaused = value;
}
