import { templates } from "./templates.js";
import { currentTemplate } from "./grid-events.js";

export const rowHints = [];
export const columnHints = [];

export function generateRowHints() {
  rowHints.length = 0;
  const solution = templates[currentTemplate].solution;
  for (let i = 0; i < solution.length; i++) {
    const hint = [];
    let count = 0;
    for (let j = 0; j < solution[i].length; j++) {
      if (solution[i][j] === 1) {
        count++;
      }

      if (solution[i][j] !== 1 && count !== 0) {
        hint.push(count);
        count = 0;
      }

      if (j === solution[i].length - 1) {
        if (solution[i][j] === 1) {
          hint.push(count);
        }
        if (hint.length === 0) {
          hint.push(0);
        }
      }
    }
    rowHints.push(hint);
  }
}

export function generateColumnHints() {
  columnHints.length = 0;
  const solution = templates[currentTemplate].solution;
  for (let i = 0; i < solution.length; i++) {
    const hint = [];
    let count = 0;
    for (let j = 0; j < solution[i].length; j++) {
      if (solution[j][i] === 1) {
        count++;
      }

      if (solution[j][i] !== 1 && count !== 0) {
        hint.push(count);
        count = 0;
      }

      if (j === solution.length - 1) {
        if (solution[j][i] === 1) {
          hint.push(count);
        }
        if (hint.length === 0) {
          hint.push(0);
        }
      }
    }
    columnHints.push(hint);
  }
}
