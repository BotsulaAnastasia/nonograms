import { createSidebar, currentTemplate, changeTemplate } from "./sidebar.js";
import { createGrid } from "./game-grid.js";
import { generateRowHints, generateColumnHints } from "./hints.js";

export const main = document.createElement("main");
main.className = "main";

document.body.appendChild(main);

createSidebar();

generateRowHints();
generateColumnHints();
createGrid();

changeTemplate();
