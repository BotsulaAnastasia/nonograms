import { templates } from "./templates.js";
import { generateRowHints, generateColumnHints } from "./hints.js";
import { createGrid } from "./game-grid.js";
import { resetTimer, pauseTimer, stopTimer } from "./stopwatch.js";
import { openModal } from "./modal-windows.js";

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
  this.classList.remove("--negative");
  this.classList.toggle("--positive");
  fillUserSolution();
}

function fillCellsContextMenu() {
  this.classList.remove("--positive");
  this.classList.toggle("--negative");
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

function gameOver(sol, userSol) {
  if (sol.toString() === userSol.toString()) {
    pauseTimer();
    showSolutionFunc();
    openModal();
  }
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
