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
import { overlayScoreTable } from "./high-score-table.js";
import { enterScoreInTable } from "./high-score-table.js";
import { createScoreButton } from "./high-score-table.js";

export const main = document.createElement("main");
main.className = "main";

document.body.appendChild(main);
document.body.appendChild(overlayGameOver);
document.body.appendChild(overlayScoreTable);

createSidebar();

generateRowHints();
generateColumnHints();
createGrid();
createScoreButton();

changeTemplate();
fillCells();
resetGame();
startTimer();
showSolution();
randomGame();
//enterScoreInTable();
