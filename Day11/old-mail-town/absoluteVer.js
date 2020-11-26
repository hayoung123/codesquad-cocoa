// 마을 랜덤으로 5개~26개
function setTown() {
  const towns = [];
  for (let i = 65; i <= Math.random() * (90 - 65) + 69; i++) {
    towns.push(String.fromCharCode(i));
  }
  return towns;
}
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
  if (idx >= towns.length) {
    return;
  }
  if (!town.parentElement) {
    const newTown = makeDiv(towns[idx], "container");
    town.appendChild(newTown);
    containTown.push(newTown);
    setTemplate(idx + 1, newTown);
  } else {
    const newTown = makeDiv(towns[idx], "town");
    town.appendChild(newTown);
    if (random > 0.8) setTemplate(idx + 1, newTown);
    else if (random > 0.5) setTemplate(idx + 1, town);
    else setTemplate(idx + 1, town.closest(".wrapper"));
  }
  return containTown;
}

function completeTemplate(template, containTown) {
  containTown.forEach((v) => template.appendChild(v));
  return template;
}

function postionContain(wrapper, containTown) {
  containTown.forEach((town) => {
    const randomWidth = randomWidthPosition(wrapper, town);
    const randomHeight = randomHeightPosition(wrapper, town);
    const townPosition = setPosition(wrapper, town, randomWidth, randomHeight);
    console.log(town.firstElementChild.innerText);
    console.log(townPosition);
    console.log("---------------------------------------");
    town.style.left = `${townPosition.townLeft}px`;
    town.style.top = `${townPosition.townTop}px`;
    containPosition.push(townPosition);
  });
}
function setPosition(wrapper, town, townLeft, townTop) {
  let townRight = townLeft + town.offsetWidth;
  let townBottom = townTop + town.offsetHeight;
  let townPosition = {
    townLeft: townLeft,
    townTop: townTop,
    townRight: townRight,
    townBottom: townBottom,
  };
  if (checkOverlap(townPosition)) {
    return townPosition;
  } else {
    if (checkOverlap(townPosition) === "againWidth") {
      setPosition(wrapper, town, randomWidthPosition(wrapper, town), townTop);
    } else if (checkOverlap(townPosition) === "againHeight") {
      setPosition(wrapper, town, townLeft, randomHeightPosition(wrapper, town));
    }
  }
  return townPosition;
}

function checkOverlap(town) {
  if (containPosition[0] !== undefined) {
    for (let x of containPosition) {
      if (!(town.townLeft > x.right || town.townRight < x.left)) {
        return "againWidth";
      } else if (!(town.townTop < x.bottom || town.townBottom < x.top)) {
        return "againHeight";
      }
    }
  }
  return true;
}

function randomWidthPosition(wrapper, town) {
  return Math.random() * (wrapper.offsetWidth - town.offsetWidth);
}
function randomHeightPosition(wrapper, town) {
  return Math.random() * (wrapper.offsetHeight - town.offsetHeight);
}

const townMap = document.querySelector(".town-map");

const towns = setTown();
const mailTown = [];
const template = makeDiv("", "wrapper");
const containTown = [];
const containPosition = [];
setTemplate(0, template);
let completed = completeTemplate(template, containTown);
townMap.appendChild(completed);

const contain = document.querySelectorAll(".container");
console.log(contain);
postionContain(template, contain);
