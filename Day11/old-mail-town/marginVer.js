function makeDiv(townName, divType) {
  const random = Math.random();
  const div = document.createElement("div");
  if (divType) div.className = divType;
  div.innerHTML = `<span>${townName}</span>`;
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

// 마을 랜덤으로 5개~26개
function setTown() {
  const towns = [];
  for (let i = 65; i <= Math.random() * (90 - 65) + 69; i++) {
    towns.push(String.fromCharCode(i));
  }
  return towns;
}

function completeTemplate(template, containTown) {
  reorderArr(containTown).forEach((v) => template.appendChild(v));
  return template;
}

//contain Town들 위치 선정
function positionContainTown(containTown) {
  containTown.forEach((town) => {
    town.style.marginTop = `${Math.random() * 40 + 10}px`;
    town.style.marginLeft = `${Math.random() * 40 + 20}px`;
  });
}
function checkMailTown() {
  mailTown.forEach((v) => v.classList.add("red-border"));
  const townName = getTownName(mailTown);
  checkTown.innerHTML = `${townName.join(",")}  <br> 총 ${
    townName.length
  }개의 마을이 있습니다.`;
}

function getOrderMail() {
  const resizedMailTown = resizeMail(mailTown);
  const townName = getTownName(resizedMailTown);
  checkMailSize.innerHTML = `우체통 크기는  ${townName
    .reverse()
    .join(",")} 순 입니다. `;
}
function resizeMail(mailTowns) {
  const reorderMailTown = reorderArr(mailTowns);
  let fontSize = 16;
  reorderMailTown.forEach((town) => {
    town.firstElementChild.nextElementSibling.style.fontSize = `${fontSize}px`;
    fontSize += 1;
  });
  return reorderMailTown;
}
function getTownName(townList) {
  const townName = townList.map((v) => v.firstElementChild.innerText);
  return townName;
}

function reorderArr(arr) {
  const reordered = arr.map((v) => v).sort((a, b) => Math.random() - 0.5);
  return reordered;
}

/*
1. towns를 아스키코드를 이용해 마을들 선언
2. setTemplate 함수에서 contain마을들과 mailTown을 push해준다.
3. positionContainTown 함수를 통해 contain마을들을 위치 선정해준다.
4. completeTemplate를 이용해 contain random배열하고 template에 넣어준다.
5. towmMap에 completed template 넣기

전역변수에 의존성이 매우매우 높은 큰일난상태...
*/

const townMap = document.querySelector(".town-map");
const checkMail = document.querySelector(".check-mail");
const checkTown = document.querySelector(".check-town");
const checkMailSize = document.querySelector(".check-mail-size");
checkMail.addEventListener("click", checkMailTown);
checkMail.addEventListener("click", getOrderMail);

const towns = setTown();
const mailTown = [];
const template = makeDiv("", "wrapper");
const containTown = [];
setTemplate(0, template);
positionContainTown(containTown);
let completed = completeTemplate(template, containTown);
townMap.appendChild(completed);
