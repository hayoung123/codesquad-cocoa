class Model {
  constructor() {
    // this.townList = this.setTown();
    this.townList = ["A", "B", "C", "D", "E", "F", "G", "h", "I"];
    this.map = this.createObj("map", "wrapper");
  }
  getTownMap() {
    const townMap = this.bulidTown(0, this.map);
    return [townMap];
  }
  setTown() {
    const towns = [];
    for (let i = 65; i <= Math.random() * (75 - 65) + 65; i++) {
      towns.push(String.fromCharCode(i));
    }
    return towns;
  }
  createObj(name, townType, width, height) {
    const obj = {
      name: name,
      townType: townType,
      child: [],
    };
    return obj;
  }
  bulidTown(idx, node) {
    const random = Math.random();
    if (idx >= this.townList.length) return;
    if (node.townType === "wrapper") {
      const newContainer = this.createObj(this.townList[idx], "container");
      node.child.push(newContainer);
      this.bulidTown(idx + 1, newContainer);
    } else {
      const newNode = this.createObj(this.townList[idx], "town");
      node.child.push(newNode);
      if (random > 0.8) {
        this.bulidTown(idx + 1, newNode);
      } else if (random > 0.5) {
        this.bulidTown(idx + 1, node);
      } else {
        this.bulidTown(idx + 1, this.map);
      }
    }
    return node;
  }
  searchArr(findType, data, dataList = []) {
    if (data.length === 0) return;
    else {
      for (const key in data) {
        if (data[key].townType === findType) dataList.push(data[key].name);
        this.searchArr(findType, data[key].child, dataList);
      }
    }
    return dataList;
  }

  getSize;

  randomNum(max, min) {
    return Math.random() * (max - min) + min;
  }
}

class TownView {
  constructor(model) {
    this.model = model;
    this.townMap = model.getTownMap();
    this.wrapper = document.querySelector(".town-map");
  }
  init() {
    this.buildMap(this.townMap, this.wrapper);
  }
  createDiv({ name, townType, mail }) {
    const template =
      mail !== undefined
        ? `<span>${name}</span><i class="far fa-envelope"></i><div></div>`
        : `<span>${name}</span><div></div>`;
    const div = document.createElement("div");
    console.log(townType);
    div.className = townType;
    div.innerHTML = template;
    return div;
  }
  getSize() {}
  buildMap(towns, node) {
    if (towns.length === 0) return;
    else {
      for (let x in towns) {
        const newTown = this.createDiv(towns[x]);
        if (towns[x].name === "map") {
          node.appendChild(newTown);
        } else {
          node.lastElementChild.appendChild(newTown);
        }
        this.buildMap(towns[x].child, newTown);
      }
    }
  }
}

const model = new Model();
// const list = a.searchArr("container", [townMap]);

const view = new TownView(model);
view.init();
// const wrapper
