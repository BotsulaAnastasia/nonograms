import { templates } from "./templates.js";
import { currentTemplate } from "./sidebar.js";

const gridWidth = templates[currentTemplate].width;
const gridHeight = templates[currentTemplate].height;

import { columnHints } from "./hints.js";
import { rowHints } from "./hints.js";

export const table = document.createElement("table");
table.className = "grid";

// Create table header
const thead = document.createElement("thead");
const trTop = document.createElement("tr");
const thEmpty = document.createElement("th");

thEmpty.className = "empty-cell";

trTop.appendChild(thEmpty);

// Fill table header
for (let i = 0; i < gridWidth; i++) {
  const thTop = document.createElement("th");
  const thTopFill = document.createElement("div");

  thTop.className = "top-cell";
  thTop.setAttribute("data-column", i);

  thTopFill.className = "top-cell__hints";

  // Fill top cells with hints
  columnHints[i].forEach((el) => {
    const colHint = document.createElement("span");
    colHint.innerText = el;
    thTopFill.appendChild(colHint);
  });

  thTop.appendChild(thTopFill);
  trTop.appendChild(thTop);
}

// Create and fill table body
const tbody = document.createElement("tbody");

let cellInd = 0;

for (let i = 0; i < gridHeight; i++) {
  // Create left cells
  const trBody = document.createElement("tr");
  const thLeft = document.createElement("th");
  const thLeftFill = document.createElement("div");

  trBody.setAttribute("data-row", i);

  thLeft.className = "left-cell";
  thLeftFill.className = "left-cell__hints";

  // Fill left cells with hints
  rowHints[i].forEach((el) => {
    const rowHint = document.createElement("span");
    rowHint.innerText = el;
    thLeftFill.appendChild(rowHint);
  });

  thLeft.appendChild(thLeftFill);
  trBody.appendChild(thLeft);

  // Create main cells
  for (let j = 0; j < gridWidth; j++) {
    const tdBody = document.createElement("td");
    const tdBodyFill = document.createElement("div");

    tdBody.className = "main-cell";
    tdBodyFill.className = "main-cell__fill";

    tdBody.setAttribute("data-index", cellInd++);
    tdBody.setAttribute("data-column", j);
    tdBody.setAttribute("data-row", i);

    tdBody.appendChild(tdBodyFill);
    trBody.appendChild(tdBody);
  }

  tbody.appendChild(trBody);
}

thead.appendChild(trTop);
table.appendChild(thead);
table.appendChild(tbody);
