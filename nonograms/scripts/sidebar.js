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

export const sidebar = document.createElement("div");
const features = document.createElement("ul");

sidebar.className = "sidebar-wrapper";
features.className = "sidebar__features";

// Levels
const levels = document.createElement("li");
const levelDetails = document.createElement("div");
const levelTitle = document.createElement("span");
const sublist = document.createElement("ul");

levelDetails.className = "feat-details";
levelTitle.className = "feat__name";
sublist.className = "levels-sublist";

levelTitle.innerText = "Levels";

export let currentTemplate = "Camel";
export let oldTemplate = currentTemplate;

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

    levelNameString.className = "level-name";
    levelNameString.innerText = name.replace("_", " ");

    levelName.appendChild(levelNameString);
    levelNames.appendChild(levelName);

    levelName.addEventListener("click", () => {
      oldTemplate = currentTemplate;
      currentTemplate = levelName.firstChild.textContent.replace(" ", "_");
      console.log(currentTemplate);
      console.log(oldTemplate);
      if (currentTemplate !== oldTemplate) {
        console.log("changed");
        /* generateRowHints();
        generateColumnHints(); */
      }
    });
  });

  sublistItem.appendChild(itemName);
  sublistItem.appendChild(levelNames);
  sublist.appendChild(sublistItem);
}

levelDetails.appendChild(levelTitle);
levels.appendChild(levelDetails);
levels.appendChild(sublist);
features.appendChild(levels);
sidebar.appendChild(features);
