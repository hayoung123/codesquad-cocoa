/*
- 스마트 드롭 다운 메뉴

1. dropwrapper에 마우스 들어가면 setTimeout으로 ul보여주기
    1-1 timeout에 setTimeout을 통해 webAPI로 들어가는 타이머식별값 저장
2. setTimeout의 시간 전에 mouseleave하면 clearTimeout으로 setTimeout-timer 없애기
*/
/*
- 마우스 이동정보 기록

1. li에 mouseover 되면 setInterval 시작 -renderFruitCounter
2. renderFruitCounter
    2-1 fruitList에 mouseover된 fruit가 있는지 없는지 (ifFruit) 체크하고 그에 맞게 updateFruitList
    3-1 makeDiv로 fruit div생성
    3-2 makeDiv로 만든 template로 fruitContainer 에 넣기
3. li에서 mouseout되면 clearTime으로 setTimeout-timer 없애기
*/
const dropWrapper = document.querySelector("#js-dropdown__wrapper");
const listContainer = document.querySelector("#list__container");
const fruitContainer = document.querySelector("#js-fruit__container");

const HIDDEN = "hidden";
const fruitList = [];
let timeout;

// smart dropdown menu

dropWrapper.addEventListener("mouseenter", () => {
  timeout = setTimeout(showList, 1000);
});

dropWrapper.addEventListener("mouseleave", () => {
  clearTimeout(timeout);
  hideList();
});

function showList() {
  listContainer.classList.remove(HIDDEN);
}
function hideList() {
  listContainer.classList.add(HIDDEN);
}

// fruit counter

listContainer.addEventListener("mouseover", selectFruit);
listContainer.addEventListener("mouseout", cancelSelect);

//li에 mouseover되면 setInterval 시작 (파라미터를 넘겨주기 위해 익명함수의 내장함수로 render함수 사용)
function selectFruit({ target }) {
  const targetKey = target.innerText;
  if (target.tagName === "LI") {
    timeout = setInterval(function () {
      renderCount(targetKey);
    }, 500);
  }
}
function cancelSelect() {
  clearInterval(timeout);
}

//fruitList 업데이트 및 fruitContainer 업데이트
function renderCount(fruit) {
  updateFruitList(fruit);
  updateFruitContainer();
}

//fruit가 list에 있는지 체크하고 있으면 value ++ 없으면 추가
function updateFruitList(fruit) {
  let isFruit = false;
  fruitList.forEach((elem) => {
    if (elem.key === fruit) {
      elem.value++;
      isFruit = true;
    }
  });
  if (isFruit === false) fruitList.push({ key: fruit, value: 1 });
}

//makeDiv통해 만든 template로 fruitContainer에 넣기
function updateFruitContainer() {
  const template = fruitList.reduce(
    (acc, cur) => acc + makeDiv(cur.key, cur.value),
    ""
  );
  fruitContainer.innerHTML = template;
}

function makeDiv(id, value) {
  const template = `<div id="${id}">${id}: ${value}</div>`;
  return template;
}
