import { modalText } from "./modal-windows.js";

export const stopwatch = document.createElement("div");
stopwatch.className = "stopwatch";
stopwatch.textContent = "00:00";

let seconds = 0;
let minutes = 0;
let interval;

function updateTime() {
  seconds++;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
  stopwatch.innerText = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export function startTimer() {
  const cells = document.querySelectorAll(".main-cell__fill");
  cells.forEach((cell) => {
    cell.addEventListener("mousedown", start);
  });
}

function start() {
  const cells = document.querySelectorAll(".main-cell__fill");
  interval = setInterval(updateTime, 1000);
  cells.forEach((cell) => {
    cell.removeEventListener("mousedown", start);
  });
}

export function pauseTimer() {
  clearInterval(interval);
  modalText.innerHTML = `Great! You have solved the nonogram! Your total time is <span>${stopwatch.textContent}</span>`;
}

export function resetTimer() {
  clearInterval(interval);
  seconds = 0;
  minutes = 0;
  stopwatch.textContent = "00:00";
  startTimer();
}
