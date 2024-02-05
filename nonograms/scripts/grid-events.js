import { templates } from "./templates.js";
import { generateRowHints, generateColumnHints } from "./hints.js";
import { createGrid } from "./game-grid.js";

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
    alert("You win!");
  }
}
