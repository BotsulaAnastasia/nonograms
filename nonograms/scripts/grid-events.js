import { templates } from "./templates.js";
import { generateRowHints, generateColumnHints } from "./hints.js";
import { createGrid } from "./game-grid.js";
import { resetTimer, pauseTimer } from "./stopwatch.js";
import { openModal } from "./modal-windows.js";

export let currentTemplate = "Camel";
let oldTemplate = currentTemplate;

let userSolution = [];

export function changeTemplate() {
  document.querySelectorAll(".level-name").forEach((el) => {
    el.addEventListener("click", () => {
      oldTemplate = currentTemplate;
      currentTemplate = el.firstChild.textContent.replace(" ", "_");
      if (currentTemplate !== oldTemplate) {
        userSolution.length = 0;
        const oldGrid = document.querySelector(".grid-wrapper");
        oldGrid.remove();
        generateRowHints();
        generateColumnHints();
        createGrid();
        fillCells();
        resetTimer();
      }
    });
  });
}

export function fillCells() {
  const cells = document.querySelectorAll(".main-cell__fill");
  cells.forEach((cell) => {
    cell.addEventListener("click", (event) => {
      cell.classList.remove("--negative");
      cell.classList.toggle("--positive");
      fillUserSolution();
    });
    cell.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      cell.classList.remove("--positive");
      cell.classList.toggle("--negative");
    });
  });
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
    openModal();
  }
}

export function resetGame() {
  const resetBtn = document.querySelector(".btn-reset-game");
  resetBtn.addEventListener("click", () => {
    const canReset = confirm("Are you sure you want to reset the game?");
    if (canReset) {
      const cells = document.querySelectorAll(".main-cell__fill");
      cells.forEach((cell) => {
        cell.classList.remove("--negative");
        cell.classList.remove("--positive");
      });

      userSolution.length = 0;
      resetTimer();
    }
  });
}

export function showSolution() {
  const solutionBtn = document.querySelector(".btn-solution");
  solutionBtn.addEventListener("click", () => {
    const cells = document.querySelectorAll(".main-cell__fill");
    const solution = templates[currentTemplate].solution.flat();
    for (let i = 0; i < solution.length; i++) {
      if (solution[i] === 0) {
        cells[i].classList.add("--negative");
      } else {
        cells[i].classList.add("--positive");
      }
    }
    /* cells.forEach((cell) => {
      cell.removeEventListener("click", (event) => {
        cell.classList.remove("--negative");
        cell.classList.toggle("--positive");
        fillUserSolution();
      });
      cell.removeEventListener("contextmenu", (event) => {
        event.preventDefault();
        cell.classList.remove("--positive");
        cell.classList.toggle("--negative");
      });
    }); */
    resetTimer();
  });
}
