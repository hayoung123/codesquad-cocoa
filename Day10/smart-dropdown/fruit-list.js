//Map으로 fruit data 관리
class FruitModel {
  constructor() {
    this.fruitMap = new Map();
  }
  setFruit(fruit) {
    const value = this.fruitMap.get(fruit);
    if (this.fruitMap.has(fruit)) this.fruitMap.set(fruit, value + 1);
    else this.fruitMap.set(fruit, 1);
  }
  getFruit() {
    return this.fruitMap;
  }
}
//fruit list 보여주는 View
class FruitListView {
  constructor({ menuWrapper, listContainer, fruitCounter }) {
    this.timeout;
    this.menuWrapper = menuWrapper;
    this.listContainer = listContainer;
    this.fruitCounter = fruitCounter;
  }
  //addEventListener 의 this 바인딩을 피해 bind함수 사용
  init() {
    menuWrapper.addEventListener(
      "mouseenter",
      this.handleMouseEnter.bind(this)
    );
    menuWrapper.addEventListener(
      "mouseleave",
      this.handleMouseLeave.bind(this)
    );
  }
  //setTimeout이 브라우저 함수여서 this가 window에 바인드돼 bind 사용
  handleMouseEnter() {
    this.timeout = setTimeout(this.showList.bind(this), 1000);
  }
  showList() {
    const HIDDEN = "hidden";
    this.listContainer.classList.remove(HIDDEN);
    this.fruitCounter.classList.remove(HIDDEN);
  }
  handleMouseLeave() {
    clearTimeout(this.timeout);
    this.hideList();
  }
  hideList() {
    const HIDDEN = "hidden";
    this.listContainer.classList.add(HIDDEN);
    this.fruitCounter.classList.add(HIDDEN);
  }
}

//counter 보여주는 view
class FruitCountView {
  constructor({ fruitModel, listContainer, fruitCounter }) {
    this.timeout = null;
    this.fruitModel = fruitModel;
    this.listContainer = listContainer;
    this.fruitCounter = fruitCounter;
  }
  //addEventListener 의 this 바인딩을 피해 bind함수 사용
  init() {
    this.listContainer.addEventListener(
      "mousemove",
      this.handleMouseMove.bind(this)
    );
  }
  //setTimeout의 window 바인딩과 pass parameter하기 위해 bind 사용
  handleMouseMove({ target }) {
    const targetFruit = target.innerText;
    if (target.tagName === "LI" && !this.timeout) {
      this.timeout = setTimeout(this.renderCount.bind(this, targetFruit), 500);
    } else if (target.tagName !== "LI" && this.timeout) {
      this.cancelCount();
    }
  }
  cancelCount() {
    clearTimeout(this.timeout);
    this.timeout = null;
  }

  renderCount(fruit) {
    this.fruitModel.setFruit(fruit);
    this.renderfruitCounter();
    this.timeout = null;
  }
  //Map의 forEach는 (value,key) 로 인자를 받는다.
  renderfruitCounter() {
    let template = "";
    const fruitMap = this.fruitModel.getFruit();
    fruitMap.forEach(
      (value, fruit) => (template += this.createDiv(fruit, value))
    );
    this.fruitCounter.innerHTML = template;
  }
  createDiv(id, value) {
    const template = `<div id="${id}">${id}: ${value}</div>`;
    return template;
  }
}

//태그 선택 간략화
const tag = {
  selector(selector, base = document) {
    return base.querySelector(selector);
  },
};

/*
FruitModel : Map에 fruit 올려져 있을 때 데이터 저장되는곳
FruitListView : Fruit list 보여주는 view
FruitCountView : fruit count 보여주는 view

- 스마트 드롭 다운 메뉴

1. menuwrapper에 마우스 들어가면 setTimeout으로 listContainer(ul)보여주기
    1-1 timeout에 setTimeout을 통해 webAPI로 들어가는 타이머식별값 저장
2. setTimeout의 시간 전에 mouseleave하면 clearTimeout으로 setTimeout-timer 없애기

- Fruit counter

1. mousemove중 li를 만나면 renderCount() 하지만, 
  renderCount가 timeout에서 진행 중에 mouse가 li를 벗어나면, cleatTimeout으로 renderCount취소
2. renderFruitCounter
    2-1 model에서 Map 업데이트 
    2-2 renderFruitRender에서 template만들어서 fruitCounter에 넣기
3. li에서 mouseout되면 clearTime으로 setTimeout-timer 없애기

 */
const menuWrapper = tag.selector("#js-dropdown__wrapper");
const listContainer = tag.selector("#list__container");
const fruitCounter = tag.selector("#js-fruit__container");
const fruitModel = new FruitModel();
const fruitListView = new FruitListView({
  menuWrapper,
  listContainer,
  fruitCounter,
});
const fruitCountView = new FruitCountView({
  fruitModel,
  listContainer,
  fruitCounter,
});
fruitListView.init();
fruitCountView.init();
