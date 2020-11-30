class TetrisModel {
  constructor() {
    this.model = Array.from({ length: 20 }, () => new Array(10).fill(0));
    this.score = 0;
  }
  getModel() {
    return this.model;
  }
  addScore() {
    this.score += 100;
  }
}
class TetrisShape {
  constructor() {
    this.colorList = [
      "",
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "navy",
      "purple",
    ];
    this.shape = [
      {
        id: 1,
        name: "I",
        location: [
          [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
          ],
          [
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
          ],
        ],
      },
      {
        id: 2,
        name: "O",
        location: [
          [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1],
          ],
        ],
      },
      {
        id: 3,
        name: "T",
        location: [
          [
            [1, 0],
            [0, 1],
            [1, 1],
            [2, 1],
          ],
          [
            [1, 0],
            [1, 1],
            [1, 2],
            [2, 1],
          ],
          [
            [0, 1],
            [1, 1],
            [1, 2],
            [2, 1],
          ],
          [
            [1, 0],
            [0, 1],
            [1, 1],
            [1, 2],
          ],
        ],
      },
      {
        id: 4,
        name: "L",
        location: [
          [
            [1, 0],
            [1, 1],
            [1, 2],
            [2, 2],
          ],
          [
            [0, 2],
            [0, 1],
            [1, 1],
            [2, 1],
          ],
          [
            [0, 0],
            [1, 0],
            [1, 1],
            [1, 2],
          ],
          [
            [0, 1],
            [1, 1],
            [2, 1],
            [2, 0],
          ],
        ],
      },
      {
        id: 5,
        name: "J",
        location: [
          [
            [1, 0],
            [1, 1],
            [1, 2],
            [0, 2],
          ],
          [
            [0, 0],
            [0, 1],
            [1, 1],
            [2, 1],
          ],
          [
            [1, 0],
            [1, 1],
            [1, 2],
            [2, 0],
          ],
          [
            [0, 1],
            [1, 1],
            [2, 1],
            [2, 2],
          ],
        ],
      },
      {
        id: 6,
        name: "S",
        location: [
          [
            [1, 0],
            [2, 0],
            [0, 1],
            [1, 1],
          ],
          [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 2],
          ],
        ],
      },
      {
        id: 7,
        name: "Z",
        location: [
          [
            [0, 0],
            [1, 0],
            [1, 1],
            [2, 1],
          ],
          [
            [1, 0],
            [0, 1],
            [1, 1],
            [0, 2],
          ],
        ],
      },
    ];
  }
  getShape() {
    return this.shape;
  }
  getColor() {
    return this.colorList;
  }
}

class TetrisView {
  constructor({ tetrisModel, shapeList, colorList }) {
    this.canvas = document.querySelector("#js-tetris__canvas");
    this.context = this.canvas.getContext("2d");
    this.model = tetrisModel;
    this.shapeList = shapeList;
    this.colorList = colorList;
    this.shape;
    this.changeCnt = 0;
    this.cellSize = 30;
    this.startLeft = 90;
    this.startTop = 0;
  }
  random() {
    const random = Math.floor(Math.random() * 7);
    this.shape = this.shapeList[random];
  }
  init() {
    // console.log(this.cellSize);
    // console.table(this.model);
    this.random();
    this.clear();
    this.createShape(this.colorList[this.shape.id]);
    document.addEventListener("keydown", this.handleKeydown.bind(this));
  }
  play() {
    console.table(this.model);
    this.random();
    this.clear();
    this.createShape(this.colorList[this.shape.id]);
  }
  handleKeydown({ code }) {
    // event.preventDefault();
    if (code === "ArrowDown" || code === "ArrowLeft" || code === "ArrowRight") {
      this.move(code);
    } else if (code === "ArrowUp" || code === "Space") {
      this.change();
    }
  }
  //움직이기
  move(code) {
    this.clear();
    if (code === "ArrowDown") {
      if (this.checkBlock(this.startLeft, this.startTop + this.cellSize)) {
        this.startTop += this.cellSize;
      } else {
        this.fixBlock();
        this.deleteLine();
        this.play();
      }
    } else if (code === "ArrowLeft") {
      if (this.checkBlock(this.startLeft - this.cellSize, this.startTop)) {
        this.startLeft -= this.cellSize;
      }
    } else if (code === "ArrowRight") {
      if (this.checkBlock(this.startLeft + this.cellSize, this.startTop)) {
        this.startLeft += this.cellSize;
      }
    }
    this.createShape(this.colorList[this.shape.id]);
  }

  //모양 변경
  change() {
    this.clear();
    this.changeCnt++;
    if (this.checkBlock(this.startLeft, this.startTop)) {
      this.createShape(this.colorList[this.shape.id]);
    } else {
      this.changeCnt--;
      this.createShape(this.colorList[this.shape.id]);
    }
  }

  //충돌 check하기
  checkBlock(startLeft, startTop) {
    const nowIdx = this.changeCnt % this.shape.location.length;
    for (let x of this.shape.location[nowIdx]) {
      const left = startLeft + this.cellSize * x[0];
      const top = startTop + this.cellSize * x[1];
      if (left < 0 || left + this.cellSize > this.canvas.width) {
        return false;
      }
      if (top >= this.canvas.height) {
        return false;
      }
      if (this.model[top / this.cellSize][left / this.cellSize] !== 0) {
        return false;
      }
    }
    return true;
  }

  //this.shape에 있는 모양그리기
  createShape(color) {
    this.shapeWidth = 0;
    this.shapeHeight = 0;
    this.context.beginPath();
    this.context.fillStyle = color;
    this.context.lineWidth = 1.5;
    const nowIdx = this.changeCnt % this.shape.location.length;
    for (let x of this.shape.location[nowIdx]) {
      const left = this.startLeft + this.cellSize * x[0];
      const top = this.startTop + this.cellSize * x[1];
      this.context.rect(left, top, this.cellSize, this.cellSize);
    }
    this.context.fill();
    this.context.stroke();
    this.context.closePath();
  }

  //tetris 격자판
  createGrid() {
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    this.context.lineWidth = 0.3;
    for (let i = 1; i < 10; i++) {
      this.drawLine(this.cellSize * i, 0, this.cellSize * i, canvasHeight);
    }
    for (let i = 1; i < 20; i++) {
      this.drawLine(0, this.cellSize * i, canvasWidth, this.cellSize * i);
    }
  }
  // 격자판 선 긋는 메소드
  drawLine(startLeft, startTop, endLeft, endTop) {
    this.context.beginPath();
    this.context.moveTo(startLeft, startTop);
    this.context.lineTo(endLeft, endTop);
    this.context.stroke();
    this.context.closePath();
  }
  //한줄 지우기
  deleteLine() {
    for (let i = 0; i < this.model.length; i++) {
      if (!this.model[i].includes(0)) {
        this.model.splice(i, 1);
        const newArray = new Array(10).fill(0);
        this.model.unshift(newArray);
      }
    }
    this.clear();
  }
  //화면 재구성
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.createGrid();
    this.reScreen();
  }

  fixBlock() {
    const nowIdx = this.changeCnt % this.shape.location.length;
    for (let x of this.shape.location[nowIdx]) {
      const left = this.startLeft + this.cellSize * x[0];
      const top = this.startTop + this.cellSize * x[1];
      this.model[top / this.cellSize][left / this.cellSize] = this.shape.id;
    }
    this.startLeft = 90;
    this.startTop = 0;
    this.changeCnt = 0;
  }
  reScreen() {
    for (let i = 0; i < this.model.length; i++) {
      for (let j = 0; j < this.model[i].length; j++) {
        if (this.model[i][j] !== 0) {
          const color = this.colorList[this.model[i][j]];
          this.drawBox(j * this.cellSize, i * this.cellSize, color);
        }
      }
    }
  }
  drawBox(left, top, color) {
    this.context.beginPath();
    this.context.fillStyle = color;
    this.context.lineWidth = 1.5;
    this.context.rect(left, top, this.cellSize, this.cellSize);
    this.context.fill();
    this.context.stroke();
    this.context.closePath();
  }
}

const model = new TetrisModel();
const tetrisModel = model.getModel();
const shapeView = new TetrisShape();
const shapeList = shapeView.getShape();
const colorList = shapeView.getColor();
const tetris = new TetrisView({ tetrisModel, shapeList, colorList });

tetris.init();

console.table(model.getModel());
