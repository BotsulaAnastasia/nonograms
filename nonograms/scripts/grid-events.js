import { templates } from "./templates.js";
import { generateRowHints, generateColumnHints } from "./hints.js";
import { createGrid } from "./game-grid.js";
import {
  resetTimer,
  pauseTimer,
  stopTimer,
  startTimer,
  continueTimer,
  seconds,
  minutes,
} from "./stopwatch.js";
import { openModal } from "./modal-windows.js";
import { saveResultsToLocalStorage } from "./high-score-table.js";

export let currentTemplate = "Camel";
let oldTemplate = currentTemplate;

let userSolution = [];

export function changeTemplate() {
  document.querySelectorAll(".level-name").forEach((el) => {
    el.firstChild.addEventListener("click", () => {
      oldTemplate = currentTemplate;
      currentTemplate = el.firstChild.textContent.replace(" ", "_");
      if (currentTemplate !== oldTemplate) {
        userSolution.length = 0;
        newGame();
      }
    });
  });
}

function newGame() {
  const oldGrid = document.querySelector(".grid-wrapper");
  oldGrid.remove();
  generateRowHints();
  generateColumnHints();
  createGrid();
  fillCells();
  resetTimer();
}

export function fillCells() {
  const cells = document.querySelectorAll(".main-cell__fill");
  cells.forEach((cell) => {
    cell.addEventListener("click", fillCellsClick);

    cell.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
    cell.addEventListener("contextmenu", fillCellsContextMenu);
  });
}

function fillCellsClick() {
  if (this.classList.contains("--positive")) {
    this.classList.remove("--positive");
    clearCellSound();
  } else {
    this.classList.remove("--negative");
    this.classList.add("--positive");
    paintBlackSound();
  }
  fillUserSolution();
}

function fillCellsContextMenu() {
  if (this.classList.contains("--negative")) {
    this.classList.remove("--negative");
    clearCellSound();
  } else {
    this.classList.remove("--positive");
    this.classList.toggle("--negative");
    crossOutSound();
  }
}

const soundOfPaintCell = new Audio("./assets/sounds/paint-black.mp3");
const soundOfCrossOut = new Audio("./assets/sounds/cross-out.mp3");
const soundOfClearCell = new Audio("./assets/sounds/clear-cell.mp3");
const soundOfWinGame = new Audio("./assets/sounds/game-over.mp3");
export const sounds = [
  soundOfPaintCell,
  soundOfCrossOut,
  soundOfClearCell,
  soundOfWinGame,
];

function paintBlackSound() {
  soundOfPaintCell.play();
}

function crossOutSound() {
  soundOfCrossOut.play();
}

function clearCellSound() {
  soundOfClearCell.play();
}

function fillUserSolution() {
  const gridWidth = templates[currentTemplate].width;
  const gridHeight = templates[currentTemplate].height;
  const solution = templates[currentTemplate].solution;

  userSolution = Array(gridHeight)
    .fill()
    .map(() => Array(gridWidth).fill(0));

  const positiveCells = document.querySelectorAll(".--positive");

  positiveCells.forEach((el) => {
    const columnInd = el.parentElement.getAttribute("data-column");
    const rowInd = el.parentElement.getAttribute("data-row");
    userSolution[rowInd][columnInd] = 1;
  });

  gameOver(solution, userSolution);
}

// Win game
function gameOver(sol, userSol) {
  if (sol.toString() === userSol.toString()) {
    gameOverSound();
    pauseTimer();
    showSolutionFunc();
    openModal();
    saveResultsToLocalStorage();
  }
}

function gameOverSound() {
  soundOfWinGame.play();
}

export function resetGame() {
  const resetBtn = document.querySelector(".btn-reset-game");
  resetBtn.addEventListener("click", () => {
    const canReset = confirm("Are you sure you want to reset the game?");
    if (canReset) {
      clearCells();
      userSolution.length = 0;
      resetTimer();
      fillCells();
    }
  });
}

function clearCells() {
  const cells = document.querySelectorAll(".main-cell__fill");
  cells.forEach((cell) => {
    cell.classList.remove("--negative");
    cell.classList.remove("--positive");
  });
}

export function showSolution() {
  const solutionBtn = document.querySelector(".btn-solution");
  solutionBtn.addEventListener("click", () => {
    resetTimer();
    showSolutionFunc();
  });
}

function showSolutionFunc() {
  clearCells();
  const cells = document.querySelectorAll(".main-cell__fill");
  const solution = templates[currentTemplate].solution.flat();
  for (let i = 0; i < solution.length; i++) {
    if (solution[i] === 0) {
      cells[i].classList.add("--negative");
    } else {
      cells[i].classList.add("--positive");
    }
  }
  stopTimer();
  removeCellsEventListeners();
}

function removeCellsEventListeners() {
  const cells = document.querySelectorAll(".main-cell__fill");
  cells.forEach((cell) => {
    cell.removeEventListener("click", fillCellsClick);
    cell.removeEventListener("contextmenu", fillCellsContextMenu);
  });
}

function getRandomTemplate() {
  const templateNames = Object.keys(templates);
  const max = templateNames.length - 1;
  const min = 0;
  const randomInd = Math.floor(Math.random() * (max - min + 1)) + min;
  currentTemplate = templateNames[randomInd];
  console.log(currentTemplate);
}

export function randomGame() {
  const randomGameBtn = document.querySelector(".btn-random-game");
  randomGameBtn.addEventListener("click", () => {
    getRandomTemplate();
    newGame();
  });
}

const blackCellsInd = JSON.parse(localStorage.getItem("blackCellsIndex")) || [];
const cellsWithCrossInd =
  JSON.parse(localStorage.getItem("cellsWithCrossIndex")) || [];
let savedTemplateName =
  JSON.parse(localStorage.getItem("currentTemplateName")) || "";
export const savedTimer =
  JSON.parse(localStorage.getItem("currentTimerResult")) || [];

export function saveGame() {
  const saveGameBtn = document.querySelector(".btn-save-game");
  saveGameBtn.addEventListener("click", () => {
    savedTemplateName = currentTemplate;
    localStorage.setItem(
      "currentTemplateName",
      JSON.stringify(savedTemplateName)
    );

    blackCellsInd.length = 0;
    cellsWithCrossInd.length = 0;
    savedTimer.length = 0;

    const blackCells = document.querySelectorAll(".main-cell__fill.--positive");
    const cellsWithCross = document.querySelectorAll(
      ".main-cell__fill.--negative"
    );

    blackCells.forEach((el) => {
      const columnInd = el.parentElement.getAttribute("data-column");
      const rowInd = el.parentElement.getAttribute("data-row");
      blackCellsInd.push([rowInd, columnInd]);
      localStorage.setItem("blackCellsIndex", JSON.stringify(blackCellsInd));
    });
    cellsWithCross.forEach((el) => {
      const columnInd = el.parentElement.getAttribute("data-column");
      const rowInd = el.parentElement.getAttribute("data-row");
      cellsWithCrossInd.push([rowInd, columnInd]);
      localStorage.setItem(
        "cellsWithCrossIndex",
        JSON.stringify(cellsWithCrossInd)
      );
    });
    pauseTimer();
    stopTimer();
    removeCellsEventListeners();

    savedTimer.push(minutes, seconds);
    localStorage.setItem("currentTimerResult", JSON.stringify(savedTimer));

    const continueGameBtn = document.querySelector(".btn-continue-game");
    continueGameBtn.classList.remove("--desabled");
    continueGameBtn.addEventListener("click", continueGame);

    alert(
      'The game has been saved successfully! Click "Continue Game" to continue this game'
    );
  });
}

export function continueGame() {
  const continueGameBtn = document.querySelector(".btn-continue-game");
  continueGameBtn.classList.add("--desabled");

  currentTemplate = savedTemplateName;
  const oldGrid = document.querySelector(".grid-wrapper");
  oldGrid.remove();
  generateRowHints();
  generateColumnHints();
  createGrid();
  fillCells();

  continueTimer();

  for (let i = 0; i < blackCellsInd.length; i++) {
    const rowInd = blackCellsInd[i][0];
    const columnInd = blackCellsInd[i][1];
    const cell = document.querySelector(
      `[data-row="${rowInd}"][data-column="${columnInd}"]`
    );
    cell.firstChild.classList.add("--positive");
  }
  for (let i = 0; i < cellsWithCrossInd.length; i++) {
    const rowInd = cellsWithCrossInd[i][0];
    const columnInd = cellsWithCrossInd[i][1];
    const cell = document.querySelector(
      `[data-row="${rowInd}"][data-column="${columnInd}"]`
    );
    cell.firstChild.classList.add("--negative");
  }

  continueGameBtn.removeEventListener("click", continueGame);
}
