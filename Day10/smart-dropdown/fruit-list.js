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

class FruitListView {
  constructor({ menuWrapper, listContainer, fruitContainer }) {
    this.timeout;
    this.menuWrapper = menuWrapper;
    this.listContainer = listContainer;
    this.fruitContainer = fruitContainer;
  }
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
  handleMouseEnter() {
    this.timeout = window.setTimeout(this.showList.bind(this), 1000);
  }
  showList() {
    const HIDDEN = "hidden";
    this.listContainer.classList.remove(HIDDEN);
    this.fruitContainer.classList.remove(HIDDEN);
  }
  handleMouseLeave() {
    window.clearTimeout(this.timeout);
    this.hideList();
  }
  hideList() {
    const HIDDEN = "hidden";
    this.listContainer.classList.add(HIDDEN);
    this.fruitContainer.classList.add(HIDDEN);
  }
}

class FruitCountView {
  constructor({ fruitModel, listContainer, fruitContainer }) {
    this.timeout;
    this.fruitModel = fruitModel;
    this.listContainer = listContainer;
    this.fruitContainer = fruitContainer;
  }
  init() {
    this.listContainer.addEventListener(
      "mouseover",
      this.handelMouseOver.bind(this)
    );
    this.listContainer.addEventListener(
      "mouseout",
      this.handelMouseOut.bind(this)
    );
  }
  handelMouseOut() {
    clearInterval(this.timeout);
  }
  handelMouseOver({ target }) {
    const targetFruit = target.innerText;
    if (target.tagName === "LI") {
      this.timeout = setInterval(() => {
        this.renderFruitCount(targetFruit);
      }, 500);
    }
  }
  renderFruitCount(fruit) {
    this.fruitModel.setFruit(fruit);
    this.renderFruitContainer();
  }
  renderFruitContainer() {
    let template = "";
    const fruitMap = this.fruitModel.getFruit();
    fruitMap.forEach(
      (value, fruit) => (template += this.makeDiv(fruit, value))
    );
    this.fruitContainer.innerHTML = template;
  }
  makeDiv(id, value) {
    const template = `<div id="${id}">${id}: ${value}</div>`;
    return template;
  }
}

const tag = {
  $(selector, base = document) {
    return base.querySelector(selector);
  },
};

const menuWrapper = tag.$("#js-dropdown__wrapper");
const listContainer = tag.$("#list__container");
const fruitContainer = tag.$("#js-fruit__container");
const fruitModel = new FruitModel();
const fruitListView = new FruitListView({
  menuWrapper,
  listContainer,
  fruitContainer,
});
const fruitCountView = new FruitCountView({
  fruitModel,
  listContainer,
  fruitContainer,
});
fruitListView.init();
fruitCountView.init();
