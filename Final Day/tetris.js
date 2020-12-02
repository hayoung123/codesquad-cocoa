class TetrisModel {
  constructor() {
    this.model = Array.from({ length: 21 }, () => new Array(10).fill(0));
    this.score = 0;
    this.level = 1;
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
    this.model = Array.from({ length: 21 }, () => new Array(10).fill(0));
    return this.model;
  }
  resetScore() {
    this.score = 0;
  }
  levelDown() {
    if (this.level > 1) this.level -= 1;
  }
  levelUp() {
    if (this.level < 10) this.level += 1;
  }
  getLevel() {
    return this.level;
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
        width: 4,
        height: 1,
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
        width: 2,
        height: 2,
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
        width: 3,
        height: 2,
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
        width: 2,
        height: 3,
        location: [
          [
            [0, 0],
            [0, 1],
            [0, 2],
            [1, 2],
          ],
          [
            [0, 0],
            [0, 1],
            [1, 0],
            [2, 0],
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
        width: 2,
        height: 3,
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
        width: 3,
        height: 2,
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
        width: 3,
        height: 2,
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
    this.nextCanvas = selector.nextCanvas;
    this.nextContext = this.nextCanvas.getContext("2d");
    this.playBtn = selector.playBtn;
    this.resetBtn = selector.resetBtn;
    this.nowLevel = selector.nowLevel;
    this.levelDownBtn = selector.levelDownBtn;
    this.levelUpBtn = selector.levelUpBtn;
    this.gameover = selector.gameover;
    this.tetrisModel = tetrisModel;
    this.model = tetrisModel.getModel();
    this.shapeList = shapeView.getShape();
    this.colorList = shapeView.getColor();
    this.scoreView = scoreView;
    this.shape;
    this.nextShape;
    this.changeCnt = 0;
    this.cellSize = 30;
    this.startLeft = 90;
    this.startTop = -30;
    this.timer = null;
    this.requestID = null;
    this.level = this.tetrisModel.getLevel();
  }

  init() {
    this.clear();
    this.setNextShape();
    this.playBtn.addEventListener("click", this.handleClick.bind(this));
    this.resetBtn.addEventListener("click", this.handleClick.bind(this));
    this.levelUpBtn.addEventListener("click", this.handleLevel.bind(this));
    this.levelDownBtn.addEventListener("click", this.handleLevel.bind(this));
    document.addEventListener("keydown", this.handleKeydown.bind(this));
  }
  setNextShape() {
    const random = Math.floor(Math.random() * 7);
    this.nextShape = this.shapeList[random];
  }

  //model reset, score&view reset
  handleClick({ target }) {
    this.gameover.classList.add("hidden");
    this.model = this.tetrisModel.resetModel();
    this.tetrisModel.resetScore();
    this.scoreView.updateScore();
    this.clear();
    if (target.innerHTML === "RESET") {
      cancelAnimationFrame(this.requestID);
      clearTimeout(this.timer);
      this.timer = null;
      this.requestID = null;
      this.setNextShape();
      this.playBtn.disabled = false;
    } else {
      this.playBtn.disabled = true;
      this.play();
    }
  }
  play() {
    cancelAnimationFrame(this.requestID);
    clearTimeout(this.timer);
    this.clear();
    this.shape = this.nextShape;
    this.clearNextShape();
    this.setNextShape();
    this.changeCnt = 0;
    this.startLeft = 90;
    this.startTop = -30;
    this.renderNextShape(this.colorList[this.nextShape.id]);
    this.renderShape(this.colorList[this.shape.id]);
    if (this.checkGameOver()) {
      return this.finishPlay();
    }
    this.autoMove();
  }

  // 자동으로 내려가기
  autoMove() {
    const moveFast = 1000 - (this.level - 1) * 100;
    if (this.checkBlock(this.startLeft, this.startTop + this.cellSize)) {
      this.clear();
      this.startTop += this.cellSize;
      this.renderShape(this.colorList[this.shape.id]);
      this.timer = setTimeout(this.autoMove.bind(this), moveFast);
    } else {
      this.fixBlock();
      this.deleteLine();
      this.play();
    }
  }
  //check 게임 오버
  checkGameOver() {
    for (let x of this.model[1]) {
      if (x !== 0) return true;
    }
    return false;
  }
  //게임 끝내기
  finishPlay() {
    document.removeEventListener("keydown", this.handleKeydown.bind(this));
    this.gameover.classList.remove("hidden");
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
    this.renderShape(this.colorList[this.shape.id]);
  }

  //space바 누를 시 뚝떨어지는것
  drop() {
    if (this.checkBlock(this.startLeft, this.startTop + this.cellSize)) {
      this.clear();
      this.startTop += this.cellSize;
      this.renderShape(this.colorList[this.shape.id]);
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
    this.renderShape(this.colorList[this.shape.id]);
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
      if (this.model[top / this.cellSize + 1][left / this.cellSize] !== 0) {
        return false;
      }
    }
    return true;
  }

  //Render now shape - 게임 진행 화면
  renderShape(color) {
    const nowIdx = this.changeCnt % this.shape.location.length;
    for (let x of this.shape.location[nowIdx]) {
      const left = this.startLeft + this.cellSize * x[0];
      const top = this.startTop + this.cellSize * x[1];
      this.drawBox(this.context, left, top, color, this.cellSize);
    }
  }

  //Render next shape
  renderNextShape(color) {
    const size = this.nextCanvas.width / 6;
    const startLeft = (this.nextCanvas.width - size * this.nextShape.width) / 2;
    const startTop =
      (this.nextCanvas.height - size * this.nextShape.height) / 2;
    for (let x of this.nextShape.location[0]) {
      const left = startLeft + size * x[0];
      const top = startTop + size * x[1];
      this.drawBox(this.nextContext, left, top, color, size);
    }
  }

  //tetris 격자판
  renderGrid() {
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
    this.renderGrid();
    this.reScreen();
  }
  clearNextShape() {
    this.nextContext.clearRect(
      0,
      0,
      this.nextCanvas.width,
      this.nextCanvas.height
    );
  }

  //모델에 block저장
  fixBlock() {
    console.table(this.model);
    const nowIdx = this.changeCnt % this.shape.location.length;
    for (let x of this.shape.location[nowIdx]) {
      const left = this.startLeft + this.cellSize * x[0];
      const top = this.startTop + this.cellSize * x[1];
      this.model[top / this.cellSize + 1][left / this.cellSize] = this.shape.id;
    }
  }

  //model에 따라서 쌓인 블럭들 그리기
  reScreen() {
    for (let i = 1; i < this.model.length; i++) {
      for (let j = 0; j < this.model[i].length; j++) {
        if (this.model[i][j] !== 0) {
          const color = this.colorList[this.model[i][j]];
          this.drawBox(
            this.context,
            j * this.cellSize,
            (i - 1) * this.cellSize,
            color,
            this.cellSize
          );
        }
      }
    }
  }
  // context에 size크기의 정사각형 그리기
  drawBox(context, left, top, color, size) {
    context.beginPath();
    context.fillStyle = color;
    context.lineWidth = 1.5;
    context.rect(left, top, size, size);
    context.fill();
    context.stroke();
    context.closePath();
  }

  //level 조절하기
  handleLevel({ target }) {
    const up = "level-up__btn";
    if (target.classList[0] === up) {
      this.tetrisModel.levelUp();
    } else {
      this.tetrisModel.levelDown();
    }
    this.level = this.tetrisModel.getLevel();
    this.nowLevel.innerHTML = `Lv${this.level}`;
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
  nextCanvas: $._("#js-next__canvas"),
  playBtn: $._(".start__btn"),
  resetBtn: $._(".reset__btn"),
  gameover: $._(".gameover"),
  nowLevel: $._(".now-level"),
  levelDownBtn: $._(".level-down__btn"),
  levelUpBtn: $._(".level-up__btn"),
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
