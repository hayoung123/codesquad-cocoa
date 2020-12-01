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
  getScore() {
    return this.score;
  }
  resetModel() {
    this.model = Array.from({ length: 20 }, () => new Array(10).fill(0));
    return this.model;
  }
  resetScore() {
    this.score = 0;
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
  constructor({ tetrisModel, shapeView, scoreView }) {
    this.canvas = document.querySelector("#js-tetris__canvas");
    this.context = this.canvas.getContext("2d");
    this.playBtn = document.querySelector(".start__btn");
    this.tetrisModel = tetrisModel;
    this.model = tetrisModel.getModel();
    this.shapeList = shapeView.getShape();
    this.colorList = shapeView.getColor();
    this.scoreView = scoreView;
    this.shape;
    this.changeCnt = 0;
    this.cellSize = 30;
    this.startLeft = 90;
    this.startTop = -30;
    this.timer;
  }
  random() {
    const random = Math.floor(Math.random() * 7);
    this.shape = this.shapeList[random];
  }
  init() {
    this.clear();
    document.addEventListener("keydown", this.handleKeydown.bind(this));
    this.playBtn.addEventListener("click", this.handleClick.bind(this));
  }
  handleClick() {
    const gameover = document.querySelector(".gameover");
    gameover.classList.add("hidden");
    this.model = this.tetrisModel.resetModel();
    this.tetrisModel.resetScore();
    this.scoreView.updateScore();
    this.initPlay();
  }
  initPlay() {
    clearTimeout(this.timer);
    this.changeCnt = 0;
    this.startLeft = 90;
    this.startTop = -30;
    this.play();
  }
  play() {
    this.random();
    this.clear();
    if (!this.checkBlock(this.startLeft, this.startTop + 30)) {
      return this.finishPlay();
    }
    this.createShape(this.colorList[this.shape.id]);
    this.autoMove();
  }

  //keyboard 이벤트
  handleKeydown({ code }) {
    // event.preventDefault();
    if (code === "ArrowDown" || code === "ArrowLeft" || code === "ArrowRight") {
      this.move(code);
    } else if (code === "ArrowUp" || code === "Space") {
      this.change();
    }
  }
  finishPlay() {
    const gameover = document.querySelector(".gameover");
    gameover.classList.remove("hidden");
  }
  // 자동으로 내려가기
  autoMove() {
    console.log(this.shape.id, ":", this.timer);
    this.clear();
    if (this.checkBlock(this.startLeft, this.startTop + this.cellSize)) {
      this.startTop += this.cellSize;
      this.createShape(this.colorList[this.shape.id]);
    } else {
      this.fixBlock();
      this.deleteLine();
      this.initPlay();
      return;
    }
    this.timer = setTimeout(this.autoMove.bind(this), 1000);
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
        this.initPlay();
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
      if (this.checkBlock(this.startLeft - this.cellSize, this.startTop)) {
        this.startLeft -= this.cellSize;
        this.createShape(this.colorList[this.shape.id]);
      } else {
        this.changeCnt--;
        this.createShape(this.colorList[this.shape.id]);
      }
    }
  }

  //충돌 check하기
  checkBlock(startLeft, startTop) {
    const nowIdx = this.changeCnt % this.shape.location.length;
    for (let x of this.shape.location[nowIdx]) {
      const left = startLeft + this.cellSize * x[0];
      const top = startTop + this.cellSize * x[1];
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
    const nowIdx = this.changeCnt % this.shape.location.length;
    for (let x of this.shape.location[nowIdx]) {
      const left = this.startLeft + this.cellSize * x[0];
      const top = this.startTop + this.cellSize * x[1];
      this.drawBox(left, top, color);
    }
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
        this.tetrisModel.addScore();
        this.scoreView.updateScore();
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
  //모델에 blcok저장
  fixBlock() {
    const nowIdx = this.changeCnt % this.shape.location.length;
    for (let x of this.shape.location[nowIdx]) {
      const left = this.startLeft + this.cellSize * x[0];
      const top = this.startTop + this.cellSize * x[1];
      this.model[top / this.cellSize][left / this.cellSize] = this.shape.id;
    }
  }

  //model에 따라서 쌓인 블럭들 그리기
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
  //한 픽셀 그리는 상자
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

class ScoreView {
  constructor({ tetrisModel }) {
    this.score = tetrisModel;
    this.scoreScreen = document.querySelector("#js-score");
  }
  updateScore() {
    const score = this.score.getScore();
    this.scoreScreen.innerHTML = score;
  }
}

const tetrisModel = new TetrisModel();
const shapeView = new TetrisShape();
const scoreView = new ScoreView({ tetrisModel });
const tetris = new TetrisView({ tetrisModel, shapeView, scoreView });

tetris.init();
