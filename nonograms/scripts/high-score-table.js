import { currentTemplate } from "./grid-events.js";
import { templates } from "./templates.js";
import { main } from "./script.js";

let results = JSON.parse(localStorage.getItem("yourNonogramGameResults")) || [];

export function saveResultsToLocalStorage() {
  const stopwatch = document.querySelector(".stopwatch");
  const level = templates[currentTemplate].width;

  results.unshift([
    `${level}x${level}`,
    currentTemplate,
    stopwatch.textContent,
  ]);

  if (results.length > 5) {
    results.pop();
  }
  localStorage.setItem("yourNonogramGameResults", JSON.stringify(results));
}

// Create high score table
export const overlayScoreTable = document.createElement("div");
const scoreTable = document.createElement("div");
const scoreTableContent = document.createElement("div");
const tableTitle = document.createElement("h2");
const closeBtn = document.createElement("button");
const closeBtnText = document.createElement("span");

overlayScoreTable.className = "overlay overlay_score-table";

scoreTable.className = "modal score-table";
scoreTableContent.className = "modal-content";
tableTitle.className = "modal-text score-table__title";
closeBtn.className = "modal-btn";
closeBtnText.className = "modal-btn__text";

tableTitle.innerText = "High score";
closeBtnText.innerText = "Close";

closeBtn.appendChild(closeBtnText);
scoreTableContent.appendChild(tableTitle);

const resultLists = [];
const levels = ["5x5", "10x10", "15x15"];
for (let i = 0; i < levels.length; i++) {
  const levelEl = document.createElement("div");
  const levelElTitle = document.createElement("span");
  const resultList = document.createElement("ul");

  resultLists.push(resultList);

  levelEl.className = `score-table__level ${levels[i]}-level`;
  levelElTitle.className = "level-title";

  levelElTitle.innerText = `${levels[i]}`;

  levelEl.appendChild(levelElTitle);
  levelEl.appendChild(resultList);
  scoreTableContent.appendChild(levelEl);
}

scoreTableContent.appendChild(closeBtn);
scoreTable.appendChild(scoreTableContent);
overlayScoreTable.appendChild(scoreTable);

export function enterScoreInTable() {
  for (let i = 0; i < levels.length; i++) {
    const filteredResults = results.filter((el) => el.includes(levels[i]));
    for (let j = 0; j < filteredResults.length; j++) {
      const result = document.createElement("li");
      result.className = "score";

      const resultRecord = document.createElement("span");
      resultRecord.innerText = `${j + 1}. ${filteredResults[j][1].replace(
        "_",
        " "
      )} - ${filteredResults[j][2]}`;

      result.appendChild(resultRecord);
      resultLists[i].appendChild(result);
    }
  }
}

// Score button
export function createScoreButton() {
  const mainButtons = document.createElement("div");
  const scoreBtn = document.createElement("button");
  const scoreBtnText = document.createElement("span");

  mainButtons.className = "main-buttons";
  scoreBtn.className = "score-btn";
  scoreBtnText.innerText = "High score";

  scoreBtn.appendChild(scoreBtnText);
  mainButtons.appendChild(scoreBtn);
  main.appendChild(mainButtons);

  scoreBtn.addEventListener("click", openScoreModal);
  closeBtn.addEventListener("click", closeScoreModal);
  overlayScoreTable.addEventListener("click", closeScoreModal);
}

function openScoreModal() {
  enterScoreInTable();
  overlayScoreTable.classList.toggle("--active");
  scoreTable.classList.toggle("--active");
}

function closeScoreModal() {
  overlayScoreTable.classList.remove("--active");
  scoreTable.classList.remove("--active");
  document.querySelectorAll(".score").forEach((el) => el.remove());
}
