import { createSidebar, currentTemplate, changeTemplate } from "./sidebar.js";
import { createGrid } from "./game-grid.js";
import { generateRowHints, generateColumnHints } from "./hints.js";

createSidebar();

generateRowHints();
generateColumnHints();
createGrid();

changeTemplate();
