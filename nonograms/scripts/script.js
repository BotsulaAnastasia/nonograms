import { createSidebar } from "./sidebar.js";
import { createGrid } from "./game-grid.js";
import { generateRowHints, generateColumnHints } from "./hints.js";
import {
  changeTemplate,
  fillCells,
  resetGame,
  showSolution,
  randomGame,
} from "./grid-events.js";
import { startTimer } from "./stopwatch.js";
import { overlayGameOver } from "./modal-windows.js";

export const main = document.createElement("main");
main.className = "main";

document.body.appendChild(main);
document.body.appendChild(overlayGameOver);

createSidebar();

generateRowHints();
generateColumnHints();
createGrid();

changeTemplate();
fillCells();
resetGame();
startTimer();
showSolution();
randomGame();
