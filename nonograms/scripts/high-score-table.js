import { currentTemplate } from "./grid-events.js";
import { templates } from "./templates.js";
import { main } from "./script.js";
import { sounds } from "./grid-events.js";

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
  const themesBtn = document.createElement("button");
  const themesBtnText = document.createElement("span");
  const volumeBtn = document.createElement("button");
  const volumeBtnText = document.createElement("span");

  mainButtons.className = "main-buttons";
  scoreBtn.className = "main-btn score-btn";
  themesBtn.className = "main-btn themes-btn";
  volumeBtn.className = "main-btn volume-btn";

  scoreBtnText.innerText = "High score";
  themesBtnText.innerText = "Dark";

  scoreBtn.appendChild(scoreBtnText);
  mainButtons.appendChild(scoreBtn);
  themesBtn.appendChild(themesBtnText);
  mainButtons.appendChild(themesBtn);
  volumeBtn.appendChild(volumeBtnText);
  mainButtons.appendChild(volumeBtn);
  main.appendChild(mainButtons);

  scoreBtn.addEventListener("click", openScoreModal);
  closeBtn.addEventListener("click", closeScoreModal);
  overlayScoreTable.addEventListener("click", closeScoreModal);
  themesBtn.addEventListener("click", changeTheme);
  volumeBtn.addEventListener("click", muteVolume);
  addVolumeIco();
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

function changeTheme() {
  const currentTheme = document.body.className;
  if (currentTheme === "--light") {
    document.body.className = "--dark";
    this.firstChild.innerText = "Light";
  } else {
    document.body.className = "--light";
    this.firstChild.innerText = "Dark";
  }
  addVolumeIco();
}

function muteVolume() {
  sounds.forEach((audio) => {
    audio.muted = !audio.muted;
  });
  addVolumeIco();
}

function addVolumeDarkIco() {
  const volumeBtn = document.querySelector(".volume-btn");
  sounds.forEach((audio) => {
    if (audio.muted) {
      volumeBtn.firstChild.style.backgroundImage = `url("./assets/icons/volume-mute-dark.svg")`;
    } else {
      volumeBtn.firstChild.style.backgroundImage = `url("./assets/icons/volume-up-dark.svg")`;
    }
  });
}

function addVolumeLightIco() {
  const volumeBtn = document.querySelector(".volume-btn");
  sounds.forEach((audio) => {
    if (audio.muted) {
      volumeBtn.firstChild.style.backgroundImage = `url("./assets/icons/volume-mute-light.svg")`;
    } else {
      volumeBtn.firstChild.style.backgroundImage = `url("./assets/icons/volume-up-light.svg")`;
    }
  });
}

function addVolumeIco() {
  const currentTheme = document.body.className;
  if (currentTheme === "--light") addVolumeDarkIco();
  else addVolumeLightIco();
}
