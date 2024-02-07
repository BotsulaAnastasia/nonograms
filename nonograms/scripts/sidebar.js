import { main } from "./script.js";
import { templates } from "./templates.js";

// Group templates name by width
const groupTemplatesByWidth = {};

for (let width = 5; width <= 15; width += 5) {
  const names = [];
  for (let key in templates) {
    if (templates[key].width === width) {
      names.push(key);
    }
  }
  groupTemplatesByWidth[width] = names;
}

export function createSidebar() {
  const sidebar = document.createElement("div");
  const features = document.createElement("ul");

  sidebar.className = "sidebar";
  features.className = "sidebar__features";

  createLevelsSection(features);
  createButtonsSection(features);
  createBurger(sidebar);

  sidebar.appendChild(features);
  main.appendChild(sidebar);
}

function createLevelsSection(features) {
  const levels = document.createElement("li");
  const levelDetails = document.createElement("div");
  const levelTitle = document.createElement("span");
  const sublist = document.createElement("ul");

  levelDetails.className = "feat-details";
  levelTitle.className = "feat__name";
  sublist.className = "levels-sublist";

  levelTitle.innerText = "Levels";

  for (let key in groupTemplatesByWidth) {
    const sublistItem = document.createElement("li");
    const itemName = document.createElement("span");
    const levelNames = document.createElement("ul");

    itemName.className = "level";
    itemName.innerText = `${key}x${key}`;

    levelNames.className = "level-names";

    groupTemplatesByWidth[key].forEach((name) => {
      const levelName = document.createElement("li");
      const levelNameString = document.createElement("span");

      levelName.className = "level-name";
      levelNameString.innerText = name.replace("_", " ");

      levelName.appendChild(levelNameString);
      levelNames.appendChild(levelName);
    });

    sublistItem.appendChild(itemName);
    sublistItem.appendChild(levelNames);
    sublist.appendChild(sublistItem);
  }

  levelDetails.appendChild(levelTitle);
  levels.appendChild(levelDetails);
  levels.appendChild(sublist);
  features.appendChild(levels);
}

function createButtonsSection(features) {
  const buttonNames = [
    "reset-game",
    "save-game",
    "continue-game",
    "random-game",
    "solution",
  ];

  for (let i = 0; i < buttonNames.length; i++) {
    const button = document.createElement("li");
    const buttonDetails = document.createElement("div");
    const buttonTitle = document.createElement("span");

    if (i === 2) {
      buttonDetails.className = `feat-details btn btn-${buttonNames[i]} --desabled`;
    } else {
      buttonDetails.className = `feat-details btn btn-${buttonNames[i]}`;
    }

    buttonTitle.className = "feat__name";

    buttonTitle.innerText = `${buttonNames[i].replace("-", " ")}`;

    buttonDetails.appendChild(buttonTitle);
    button.appendChild(buttonDetails);
    features.appendChild(button);
  }
}

function createBurger(sidebar) {
  const burgerWrap = document.createElement("div");
  const burger = document.createElement("span");
  const burgerLine = document.createElement("span");

  burgerWrap.className = "burger-wrapper";
  burger.className = "burger";
  burgerLine.className = "burger-line";

  burger.appendChild(burgerLine);
  burgerWrap.appendChild(burger);
  sidebar.appendChild(burgerWrap);

  openBurger(burger);
}

function openBurger(burger) {
  burger.addEventListener("click", () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarFeat = document.querySelector(".sidebar__features");
    sidebar.classList.toggle("--open-sidebar");
    sidebarFeat.classList.toggle("--open-sidebar__features");
    burger.classList.toggle("--open-burger");

    closeBurger(burger);
  });
}

function closeBurger(burger) {
  const sidebar = document.querySelector(".sidebar");
  const sidebarFeat = document.querySelector(".sidebar__features");
  document.querySelectorAll(".level-name").forEach((el) => {
    el.firstChild.addEventListener("click", () => {
      sidebar.classList.remove("--open-sidebar");
      sidebarFeat.classList.remove("--open-sidebar__features");
      burger.classList.remove("--open-burger");
    });
  });
  document.querySelectorAll(".feat__name").forEach((el) => {
    el.addEventListener("click", () => {
      sidebar.classList.remove("--open-sidebar");
      sidebarFeat.classList.remove("--open-sidebar__features");
      burger.classList.remove("--open-burger");
    });
  });
}
