import { createSidebar } from "./sidebar.js";
import { createGrid } from "./game-grid.js";
import { generateRowHints, generateColumnHints } from "./hints.js";
import { changeTemplate, fillCells } from "./grid-events.js";

export const main = document.createElement("main");
main.className = "main";

document.body.appendChild(main);

createSidebar();

generateRowHints();
generateColumnHints();
createGrid();

changeTemplate();
fillCells();
