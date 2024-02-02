import { generateRowHints, generateColumnHints } from "./hints.js";
import { createGrid } from "./game-grid.js";

export let currentTemplate = "Camel";
let oldTemplate = currentTemplate;

export function changeTemplate() {
  document.querySelectorAll(".level-name").forEach((el) => {
    el.addEventListener("click", () => {
      oldTemplate = currentTemplate;
      currentTemplate = el.firstChild.textContent.replace(" ", "_");
      if (currentTemplate !== oldTemplate) {
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
    });
    cell.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      cell.classList.remove("--positive");
      cell.classList.toggle("--negative");
    });
  });
}
