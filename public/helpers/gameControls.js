import { $pause, audio } from "../const";
import {
  getIsPaused,
  getIsStarted,
  setIsPaused,
  setIsStarted,
} from "./gameState";

export function handleGameControls(startGame, pauseGame, resumeGame) {
  document.addEventListener("click", () => {
    if (getIsStarted() === false) {
      startGame();
      audio.play();
      setIsStarted(true);
    } else {
      setIsPaused(!getIsPaused());
      if (getIsPaused() === true) {
        $pause.style.display = "grid";
        audio.pause();
        pauseGame();
      } else {
        $pause.style.display = "none";
        audio.play();
        resumeGame();
      }
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      if (getIsStarted() === false) {
        startGame();
        audio.play();
        setIsStarted(true);
      } else {
        setIsPaused(!getIsPaused());
        if (getIsPaused() === true) {
          $pause.style.display = "grid";
          audio.pause();
          pauseGame();
        } else {
          $pause.style.display = "none";
          audio.play();
          resumeGame();
        }
      }
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "r") {
      window.location.reload();
    }
  });
}
