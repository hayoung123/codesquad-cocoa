class Model {
  constructor() {
    this.townList = this.setTown();
    this.depth = 3;
    // this.townList = ["A", "B", "C", "D", "E", "F", "G", "h", "I"];
    this.map = this.createObj("", "wrapper");
  }
  getTownMap() {
    const townMap = this.bulidTown(0, this.map);
    return [townMap];
  }
  setTown() {
    const towns = [];
    for (let i = 65; i <= Math.random() * (90 - 75) + 75; i++) {
      towns.push(String.fromCharCode(i));
    }
    return towns;
  }
  createObj(name, townType) {
    const obj = {
      name: name,
      townType: townType,
      child: [],
    };
    return obj;
  }
  bulidTown(idx, node, depth) {
    const random = Math.random();
    if (idx >= this.townList.length) return;
    if (node.townType === "wrapper") {
      const newContainer = this.createObj(this.townList[idx], "container");
      node.child.push(newContainer);
      this.bulidTown(idx + 1, newContainer, depth + 1);
    } else {
      const newNode = this.createObj(this.townList[idx], "town");
      node.child.push(newNode);
      if (depth <= this.depth && random > 0.8) {
        this.bulidTown(idx + 1, newNode, depth + 1);
      } else if (random > 0.5) {
        this.bulidTown(idx + 1, node, depth);
      } else {
        this.bulidTown(idx + 1, this.map, 1);
      }
    }
    return node;
  }
}

// searchArr(findType, data, dataList = []) {
//   if (data.length === 0) return;
//   else {
//     for (const key in data) {
//       if (data[key].townType === findType) dataList.push(data[key].name);
//       this.searchArr(findType, data[key].child, dataList);
//     }
//   }
//   return dataList;
// }

// setSize(towns, width, height) {
//   if (towns.length === 0) return;
//   else {
//     for (const key in towns) {
//       if (towns[key].townType === "wrapper") {
//         this.setSize(towns[key].child, 700, 700);
//         continue;
//       }
//       const widthMax = width / towns.length;
//       const heightMax = height / towns.length;
//       let widthMin = widthMax / 2;
//       let heightMin = heightMax / 2;
//       if (towns[key].townType === "container") {
//         widthMin = widthMax * 0.9;
//         heightMin = heightMax * 0.9;
//       }
//       const newWidth = this.randomNum(widthMax, widthMin);
//       const newHeight = this.randomNum(heightMax, heightMin);
//       towns[key].width = newWidth;
//       towns[key].height = newHeight;
//       this.setSize(towns[key].child, newWidth, newHeight);
//     }
//   }
//   return towns;
// }

// randomNum(max, min) {
//   const randomNum = Math.random() * (max - min) + min;
//   if (randomNum > 0) return randomNum;
//   else {
//     음수;
//     return Math.random() * -(max - min) + min;
//   }
// }

class TownView {
  constructor(model) {
    this.count = 0;
    this.containerCnt = [];
    this.model = model;
    this.townMap = model.getTownMap();
    this.wrapper = document.querySelector(".town-map");
  }
  init() {
    this.buildMap(this.townMap, this.wrapper);
    const wrapper = document.querySelector(".wrapper");
    this.countChildNode(wrapper);
    this.setSize(wrapper, wrapper.offsetWidth, wrapper.offsetHeight);
    const containers = document.querySelectorAll(".container");
    this.setPosition(containers);
  }
  createDiv({ name, townType, mail }) {
    const div = document.createElement("div");
    div.classList.add(townType);
    div.innerHTML = name;
    return div;
  }
  setPosition(containers) {
    containers.forEach((container) => {
      container.style.marginTop = `${Math.random() * 20 + 1}px`;
      container.style.marginBottm = `${Math.random() * 20 + 1}px`;
    });
  }
  setSize(towns, width, height) {
    if (!towns.children.length) return;
    for (let i = 0; i < towns.children.length; i++) {
      const classType = towns.children[i].classList[0];
      const widthMax = ((width - 16) / towns.children.length) * 0.9;
      const heightMax = ((height - 16) / towns.children.length) * 0.9;
      const widthMin = widthMax * 0.7;
      const heightMin = heightMax * 0.7;
      let newWidth = this.randomNum(widthMax, widthMin);
      let newHeight = this.randomNum(heightMax, heightMin);
      if (classType === "container") {
        const totNode = this.containerCnt.reduce((a, b) => a + b);
        newWidth = width * (this.containerCnt[i] / totNode) * 0.9;
        newHeight = height * (this.containerCnt[i] / totNode) * 0.9;
      }
      towns.children[i].style.width = newWidth + "px";
      towns.children[i].style.height = newHeight + "px";
      this.setSize(towns.children[i], newWidth, newHeight);
    }
  }

  randomNum(max, min) {
    let randomNum = Math.random() * (max - min) + min;
    while (randomNum < 0) {
      randomNum = Math.random() * (max - min) + min;
    }
    return randomNum;
  }

  buildMap(towns, node) {
    if (towns.length === 0) return;
    else {
      for (let x in towns) {
        const newTown = this.createDiv(towns[x]);
        node.appendChild(newTown);
        this.buildMap(towns[x].child, newTown);
      }
    }
  }
  countChildNode(node) {
    if (!node.children.length) return;
    for (const x of node.children) {
      this.count++;
      this.countChildNode(x);
      if (x.classList[0] === "container") {
        this.containerCnt.push(this.count);
        this.count = 0;
      }
    }
  }
}

const model = new Model();
const view = new TownView(model);
view.init();
// const wrapper
console.dir(model.getTownMap(), { depth: null });
