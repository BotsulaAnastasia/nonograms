//import { resultTime } from "./grid-events.js";

export const overlayGameOver = document.createElement("div");
const modalGameOver = document.createElement("div");
const modalContent = document.createElement("div");
export const modalText = document.createElement("h2");
const closeBtn = document.createElement("button");
const closeBtnText = document.createElement("span");

overlayGameOver.className = "overlay";
modalGameOver.className = "modal game-over";
modalContent.className = "modal-content";
modalText.className = "modal-text";
closeBtn.className = "modal-btn";
closeBtnText.className = "modal-btn__text";

closeBtnText.innerText = "Close";

modalContent.appendChild(modalText);
closeBtn.appendChild(closeBtnText);
modalContent.appendChild(closeBtn);
modalGameOver.appendChild(modalContent);
overlayGameOver.appendChild(modalGameOver);

export function openModal() {
  overlayGameOver.classList.toggle("--active");
  modalGameOver.classList.toggle("--active");
}

function closeModal() {
  overlayGameOver.classList.remove("--active");
  modalGameOver.classList.remove("--active");
}

overlayGameOver.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);
