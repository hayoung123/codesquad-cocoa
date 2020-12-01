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
  constructor(KEY, selector, { tetrisModel, shapeView, scoreView }) {
    this.key = KEY;
    this.canvas = selector.canvas;
    this.context = this.canvas.getContext("2d");
    this.playBtn = selector.playBtn;
    this.resetBtn = selector.resetBtn;
    this.gameover = selector.gameover;
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
    this.timer = null;
    this.requestID = null;
  }
  random() {
    const random = Math.floor(Math.random() * 7);
    this.shape = this.shapeList[random];
  }
  init() {
    this.clear();
    this.playBtn.addEventListener("click", this.handleClick.bind(this));
    this.resetBtn.addEventListener("click", this.handleClick.bind(this));
    document.addEventListener("keydown", this.handleKeydown.bind(this));
  }
  //model reset, score&view reset
  handleClick({ target }) {
    this.gameover.classList.add("hidden");
    this.model = this.tetrisModel.resetModel();
    this.tetrisModel.resetScore();
    this.scoreView.updateScore();
    console.log(target.innerHTML);
    if (target.innerHTML === "RESET") {
      this.timer = null;
      this.requestID = null;
      this.clear();
    } else {
      this.playBtn.disabled = true;
      this.play();
    }
  }
  play() {
    cancelAnimationFrame(this.requestID);
    clearTimeout(this.timer);
    this.clear();
    this.changeCnt = 0;
    this.startLeft = 90;
    this.startTop = -30;
    this.random();
    this.createShape(this.colorList[this.shape.id]);
    if (this.checkGameOver()) {
      return this.finishPlay();
    }
    this.autoMove();
  }

  // 자동으로 내려가기
  autoMove() {
    if (this.checkBlock(this.startLeft, this.startTop + this.cellSize)) {
      this.clear();
      this.startTop += this.cellSize;
      this.createShape(this.colorList[this.shape.id]);
      this.timer = setTimeout(this.autoMove.bind(this), 1000);
    } else {
      this.fixBlock();
      this.deleteLine();
      this.play();
    }
  }
  //check 게임 오버
  checkGameOver() {
    console.log(this.model[0]);
    for (let x of this.model[0]) {
      if (x !== 0) return true;
    }
    return false;
  }
  //게임 끝내기
  finishPlay() {
    document.removeEventListener("keydown", this.handleKeydown.bind(this));
    this.gameover.classList.remove("hidden");
    this.playBtn.disabled = false;
  }

  //keyboard 이벤트
  handleKeydown({ keyCode }) {
    if (
      keyCode === this.key.LEFT ||
      keyCode === this.key.RIGHT ||
      keyCode === this.key.DOWN
    ) {
      this.move(keyCode);
    } else if (keyCode === this.key.UP) {
      this.change();
    } else if (keyCode === this.key.SPACE) {
      event.preventDefault();
      this.drop();
    }
  }

  //움직이기
  move(keyCode) {
    if (keyCode === this.key.DOWN) {
      if (this.checkBlock(this.startLeft, this.startTop + this.cellSize)) {
        this.moveBlock(keyCode);
      } else {
        this.fixBlock();
        this.deleteLine();
        this.play();
      }
    } else if (keyCode === this.key.LEFT) {
      if (this.checkBlock(this.startLeft - this.cellSize, this.startTop)) {
        this.moveBlock(keyCode);
      }
    } else if (keyCode === this.key.RIGHT) {
      if (this.checkBlock(this.startLeft + this.cellSize, this.startTop)) {
        this.moveBlock(keyCode);
      }
    }
  }
  moveBlock(keyCode) {
    this.clear();
    if (keyCode === this.key.DOWN) {
      this.startTop += this.cellSize;
    } else if (keyCode === this.key.LEFT) {
      this.startLeft -= this.cellSize;
    } else if (keyCode === this.key.RIGHT) {
      this.startLeft += this.cellSize;
    }
    this.createShape(this.colorList[this.shape.id]);
  }

  //space바 누를 시 뚝떨어지는것
  drop() {
    if (this.checkBlock(this.startLeft, this.startTop + this.cellSize)) {
      this.clear();
      this.startTop += this.cellSize;
      this.createShape(this.colorList[this.shape.id]);
      this.requestID = requestAnimationFrame(this.drop.bind(this));
    } else {
      this.fixBlock();
      this.deleteLine();
      this.play();
    }
  }

  //모양 변경
  change() {
    this.clear();
    this.changeCnt++;
    if (!this.checkBlock(this.startLeft, this.startTop)) {
      if (this.checkBlock(this.startLeft - this.cellSize, this.startTop)) {
        this.startLeft -= this.cellSize;
      } else if (
        this.checkBlock(this.startLeft + this.cellSize, this.startTop)
      ) {
        this.startLeft += this.cellSize;
      } else if (this.shape.id === 1) {
        this.startLeft -= this.cellSize * 3;
      } else {
        this.changeCnt--;
      }
    }
    this.createShape(this.colorList[this.shape.id]);
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
  }
  //화면 재구성
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.createGrid();
    this.reScreen();
  }

  //모델에 block저장
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
  constructor(selector, { tetrisModel }) {
    this.score = tetrisModel;
    this.scoreScreen = selector.scoreScreen;
  }
  updateScore() {
    const score = this.score.getScore();
    this.scoreScreen.innerHTML = score;
  }
}

const $ = {
  _(selector, base = document) {
    return base.querySelector(selector);
  },
};

const KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  SPACE: 32,
};

const selector = {
  canvas: $._("#js-tetris__canvas"),
  playBtn: $._(".start__btn"),
  resetBtn: $._(".reset__btn"),
  gameover: $._(".gameover"),
  scoreScreen: $._("#js-score"),
};

const tetrisModel = new TetrisModel();
const shapeView = new TetrisShape();
const scoreView = new ScoreView(selector, { tetrisModel });
const tetris = new TetrisView(KEY, selector, {
  tetrisModel,
  shapeView,
  scoreView,
});

tetris.init();
