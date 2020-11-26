// const arr = [];
// for (let i = 65; i <= Math.random() * (90 - 65) + 70; i++) {
//   arr.push(String.fromCharCode(i));
// }
function makeDiv(num, divType) {
  const random = Math.random();
  const div = document.createElement("div");
  if (divType) div.className = divType;
  div.innerHTML = `<span>${num}</span>`;
  if (random < 0.3 && divType !== "wrapper") {
    div.innerHTML += '<i class="far fa-envelope"></i>';
    mailTown.push(div);
  }
  if (divType === "town") resizeDiv(div);
  return div;
}

function resizeDiv(div) {
  const sides = ["Top", "Left", "Right", "Bottom"];
  sides.forEach((side) => {
    div.style[`padding${side}`] = `${Math.random() * 20 + 1}px`;
    div.style[`margin${side}`] = `${Math.random() * 10 + 1}px`;
  });
}

function setTemplate(idx, town) {
  const random = Math.random();
  if (idx >= arr.length) {
    return;
  }
  if (!town.parentElement) {
    const newTown = makeDiv(arr[idx], "container");
    town.appendChild(newTown);
    containTown.push(newTown);
    setTemplate(idx + 1, newTown);
  } else {
    const newTown = makeDiv(arr[idx], "town");
    town.appendChild(newTown);
    if (random > 0.8) setTemplate(idx + 1, newTown);
    else if (random > 0.5) setTemplate(idx + 1, town);
    else setTemplate(idx + 1, town.closest(".wrapper"));
  }
  return town.closest(".wrapper");
}

const container = document.querySelectorAll(".container");
const wrapper = document.querySelector(".wrapper");
const townMap = document.querySelector(".town-map");

const arr = ["A", "B", "C", "D", "E", "F"];
const containTown = [];
const mailTown = [];

const template = makeDiv("", "wrapper");
const townTemplate = setTemplate(0, template);
townMap.appendChild(townTemplate);

function placeContainTown() {}
