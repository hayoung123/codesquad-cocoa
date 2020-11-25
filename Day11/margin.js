// const arr = ["A", "B", "C", "D", "E", "F"];
const arr = [];
const mailTown = [];
for (let i = 65; i <= Math.random() * (90 - 65) + 70; i++) {
  arr.push(String.fromCharCode(i));
}

console.log(arr);
function makeDiv(num, whole) {
  const random = Math.random();
  const div = document.createElement("div");
  if (whole) div.className = whole;
  div.innerHTML = `<span>${num}</span>`;
  if (random < 0.3 && whole !== "wrapper") {
    div.innerHTML += '<i class="far fa-envelope"></i>';
    mailTown.push(div);
  }
  if (whole === "town") {
    div.style.paddingTop = `${Math.random() * 20 + 1}px`;
    div.style.paddingLeft = `${Math.random() * 40 + 1}px`;
    div.style.paddingRight = `${Math.random() * 20 + 1}px`;
    div.style.paddingBottom = `${Math.random() * 40 + 1}px`;
  }
  return div;
}

function setTemplate(idx, town) {
  const random = Math.random();
  if (idx >= arr.length) {
    return;
  }
  if (!town.parentElement) {
    const newTown = makeDiv(arr[idx], "container");
    town.appendChild(newTown);
    setTemplate(idx + 1, newTown);
  } else {
    const newTown = makeDiv(arr[idx], "town");
    town.appendChild(newTown);
    if (random > 0.8) {
      setTemplate(idx + 1, newTown);
    } else if (random > 0.5) {
      setTemplate(idx + 1, town);
    } else {
      setTemplate(idx + 1, town.closest(".wrapper"));
    }
  }
  return town.closest(".wrapper");
}
const townMap = document.querySelector(".town-map");
let template = makeDiv("", "wrapper");
const townTemplate = setTemplate(0, template);
townMap.appendChild(townTemplate);

const container = document.querySelectorAll(".container");
const wrapper = document.querySelector(".wrapper");
console.log(container);
townMap.style.left = "100px";
container.forEach((town) => {
  //   town.style.marginTop = `${(Math.random() * wrapper.offsetHeight) / 4 + 1}px`;
  //   town.style.marginLeft = `${(Math.random() * wrapper.offsetWidth) / 4 + 1}px`;
  town.style.marginTop = `${Math.random() * 40 + 10}px`;
  town.style.marginLeft = `${Math.random() * 40}px`;
});

const checkMail = document.querySelector(".check-mail");
const checkTown = document.querySelector(".check-town");
checkMail.addEventListener("click", checkMailTown);
function checkMailTown() {
  mailTown.forEach((v) => v.classList.add("red-border"));
  const townName = getCheckedName();
  checkTown.innerHTML = `${townName.join(",")} 총 ${
    townName.length
  }개의 마을이 있습니다.`;
}
function getCheckedName() {
  const townName = mailTown.map((v) => v.firstElementChild.innerText);
  return townName;
}
