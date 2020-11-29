class Model {
  constructor() {
    // this.townList = this.setTown();
    this.depth = 3;
    this.townList = ["A", "B", "C", "D", "E", "F", "G", "h", "I"];
    this.map = this.createObj("", "wrapper");
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
    console.log("cnt", this.containerCnt);
  }
  createDiv({ name, townType, width, height, mail }) {
    const div = document.createElement("div");
    div.style.width = `${width}px`;
    div.style.height = `${height}px`;
    div.className = townType;
    div.innerHTML = name;
    return div;
  }
  setSize(towns, width, height) {
    if (towns.length === 0) return;
    else {
      for (const town of towns) {
        if (town.classList[0] === "wrapper") {
          this.setSize(town.child, width, height);
          continue;
        }
        if (towns[key].townType === "container") {
          widthMin = widthMax * 0.9;
          heightMin = heightMax * 0.9;
        }
        const widthMax = width / towns.length;
        const heightMax = height / towns.length;
        let widthMin = widthMax / 2;
        let heightMin = heightMax / 2;
        const newWidth = this.randomNum(widthMax, widthMin);
        const newHeight = this.randomNum(heightMax, heightMin);
        towns[key].width = newWidth;
        towns[key].height = newHeight;
        this.setSize(towns[key].child, newWidth, newHeight);
      }
    }
    return towns;
  }

  randomNum(max, min) {
    const randomNum = Math.random() * (max - min) + min;
    if (randomNum > 0) return randomNum;
    else {
      음수;
      return Math.random() * -(max - min) + min;
    }
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
      console.log(x.classList);
      console.log(this.count);
      console.log("-------------------------------------");
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
