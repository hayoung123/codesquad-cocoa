class TetrisModel {
  constructor() {
    this.model = Array.from({ length: 21 }, () => new Array(10).fill(0));
    this.score = 0;
    this.level = 1;
  }
  getModel() {
    return this.model;
  }
  resetModel() {
    this.model = Array.from({ length: 21 }, () => new Array(10).fill(0));
    return this.model;
  }
  addScore() {
    this.score += 100;
  }
  getScore() {
    return this.score;
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
    // prettier-ignore
    this.shape = [
      {
        id: 1,
        name: "I",
        width: 4,
        height: 1,
        color: "red",
        location: [
          [[0, 0],[1, 0],[2, 0],[3, 0]],
          [[0, 0],[0, 1],[0, 2],[0, 3]],
        ],
      },
      {
        id: 2,
        name: "O",
        width: 2,
        height: 2,
        color: 'orange',
        location: [
          [[0, 0], [1, 0], [0, 1], [1, 1]],
        ],
      },
      {
        id: 3,
        name: "T",
        width: 3,
        height: 2,
        color: 'yellow',
        location: [
          [[1, 0],[0, 1],[1, 1],[2, 1]],
          [[1, 0],[1, 1],[1, 2],[2, 1]],
          [[0, 1],[1, 1],[1, 2],[2, 1]],
          [[1, 0],[0, 1],[1, 1],[1, 2]],
        ],
      },
      {
        id: 4,
        name: "L",
        width: 2,
        height: 3,
        color: 'green',
        location: [
          [[0, 0],[0, 1],[0, 2],[1, 2]],
          [[0, 0],[0, 1],[1, 0],[2, 0]],
          [[0, 0],[1, 0],[1, 1],[1, 2]],
          [[0, 1],[1, 1],[2, 1],[2, 0]],
        ],
      },
      {
        id: 5,
        name: "J",
        width: 2,
        height: 3,
        color: 'blue',
        location: [
          [[1, 0],[1, 1],[1, 2],[0, 2]],
          [[0, 0],[0, 1],[1, 1],[2, 1]],
          [[1, 0],[1, 1],[1, 2],[2, 0]],
          [[0, 1],[1, 1],[2, 1],[2, 2]],
        ],
      },
      {
        id: 6,
        name: "S",
        width: 3,
        height: 2,
        color: 'navy',
        location: [
          [[1, 0],[2, 0],[0, 1],[1, 1]],
          [[0, 0],[0, 1],[1, 1],[1, 2]],
        ],
      },
      {
        id: 7,
        name: "Z",
        width: 3,
        height: 2,
        color: 'purple',
        location: [
          [[0, 0],[1, 0],[1, 1],[2, 1]],
          [[1, 0],[0, 1],[1, 1],[0, 2]],
        ],
      },
    ];
  }
  getShapeList() {
    return this.shape;
  }
  //시작 ID가 1이기 때문에 1번 index부터 시작하게 만들기
  getColor() {
    const colors = this.shape.map((v) => v.color);
    const colorList = ["", ...colors];
    return colorList;
  }
}

class TetrisView {
  constructor({ KEY, selector, tetrisModel, shapeView, scoreLevelView }) {
    this.key = KEY;
    this.canvas = selector.canvas;
    this.context = this.canvas.getContext("2d");
    this.nextCanvas = selector.nextCanvas;
    this.nextContext = this.nextCanvas.getContext("2d");
    this.playBtn = selector.playBtn;
    this.resetBtn = selector.resetBtn;
    this.gameover = selector.gameover;
    this.tetrisModel = tetrisModel;
    this.model = tetrisModel.getModel();
    this.shapeList = shapeView.getShapeList();
    this.colorList = shapeView.getColor();
    this.scoreLevelView = scoreLevelView;
    this.shape;
    this.nextShape;
    this.changeCnt = 0;
    this.cellSize = 30;
    this.startLeft = 90;
    this.startTop = -30;
    this.timer = null;
    this.requestID = null;
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  init() {
    this.clear();
    this.setNextShape();
    this.playBtn.addEventListener("click", this.handleClick.bind(this));
    this.resetBtn.addEventListener("click", this.handleClick.bind(this));
  }
  setNextShape() {
    const random = Math.floor(Math.random() * 7);
    this.nextShape = this.shapeList[random];
  }

  //model, score, view reset
  handleClick({ target }) {
    this.gameover.classList.add("hidden");
    this.model = this.tetrisModel.resetModel();
    this.tetrisModel.resetScore();
    this.scoreLevelView.updateScore();
    this.clear();
    this.clearNextShape();
    if (target.innerHTML === "RESET") {
      cancelAnimationFrame(this.requestID);
      clearTimeout(this.timer);
      this.timer = null;
      this.requestID = null;
      this.setNextShape();
      this.playBtn.disabled = false;
      document.removeEventListener("keydown", this.handleKeydown);
    } else {
      document.addEventListener("keydown", this.handleKeydown);
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
    this.renderNextBlock(this.colorList[this.nextShape.id]);
    this.renderBlock(this.colorList[this.shape.id]);
    if (this.checkGameOver()) {
      return this.finishPlay();
    }
    this.autoMove();
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
    document.removeEventListener("keydown", this.handleKeydown);
    this.gameover.classList.remove("hidden");
  }

  // 자동으로 내려가기
  autoMove() {
    const level = this.scoreLevelView.getLevel();
    const moveFast = 1000 - (level - 1) * 100;
    if (this.checkBlock(this.startLeft, this.startTop + this.cellSize)) {
      this.clear();
      this.startTop += this.cellSize;
      this.renderBlock(this.colorList[this.shape.id]);
      this.timer = setTimeout(this.autoMove.bind(this), moveFast);
    } else {
      this.fixBlock();
      this.deleteLine();
      this.play();
    }
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
    this.renderBlock(this.colorList[this.shape.id]);
  }

  //space바 누를 시 drop
  drop() {
    if (this.checkBlock(this.startLeft, this.startTop + this.cellSize)) {
      this.clear();
      this.startTop += this.cellSize;
      this.renderBlock(this.colorList[this.shape.id]);
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
        this.startLeft -= this.cellSize * (this.shape.width - 1);
      } else {
        this.changeCnt--;
      }
    }
    this.renderBlock(this.colorList[this.shape.id]);
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
  renderBlock(color) {
    const nowIdx = this.changeCnt % this.shape.location.length;
    this.shape.location[nowIdx].forEach((size) => {
      const left = this.startLeft + this.cellSize * size[0];
      const top = this.startTop + this.cellSize * size[1];
      this.renderBox(this.context, left, top, color, this.cellSize);
    });
  }

  //Render next shape
  renderNextBlock(color) {
    const cellSize = this.nextCanvas.width / 6;
    const startLeft = (this.nextCanvas.width - size * this.nextShape.width) / 2;
    const startTop =
      (this.nextCanvas.height - size * this.nextShape.height) / 2;
    //next에는 default block이기 때문에 0번 index
    this.nextShape.location[0].forEach((size) => {
      const left = startLeft + cellSize * size[0];
      const top = startTop + cellSize * size[1];
      this.renderBox(this.nextContext, left, top, color, cellSize);
    });
  }

  //tetris 격자판
  renderGrid() {
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    this.context.lineWidth = 0.3;
    for (let i = 1; i < canvasWidth / this.cellSize; i++) {
      this.drawLine(this.cellSize * i, 0, this.cellSize * i, canvasHeight);
    }
    for (let i = 1; i < canvasHeight / this.cellSize; i++) {
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
    this.model.forEach((line, idx) => {
      if (!line.includes(0)) {
        this.model.splice(idx, 1);
        const newArray = new Array(10).fill(0);
        this.model.unshift(newArray);
        this.tetrisModel.addScore();
        this.scoreLevelView.updateScore();
      }
    });
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
    const nowIdx = this.changeCnt % this.shape.location.length;
    this.shape.location[nowIdx].forEach((v) => {
      const left = this.startLeft + this.cellSize * v[0];
      const top = this.startTop + this.cellSize * v[1];
      this.model[top / this.cellSize + 1][left / this.cellSize] = this.shape.id;
    });
  }

  //model에 따라서 쌓인 블럭들 그리기
  reScreen() {
    for (let i = 1; i < this.model.length; i++) {
      for (let j = 0; j < this.model[i].length; j++) {
        if (this.model[i][j] !== 0) {
          const color = this.colorList[this.model[i][j]];
          this.renderBox(
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
  renderBox(context, left, top, color, size) {
    context.beginPath();
    context.fillStyle = color;
    context.lineWidth = 1.5;
    context.rect(left, top, size, size);
    context.fill();
    context.stroke();
    context.closePath();
  }
}
class ScoreLevelView {
  constructor({ selector, tetrisModel }) {
    this.tetrisModel = tetrisModel;
    this.scoreScreen = selector.scoreScreen;
    this.level = this.tetrisModel.getLevel();
    this.nowLevel = selector.nowLevel;
    this.levelDownBtn = selector.levelDownBtn;
    this.levelUpBtn = selector.levelUpBtn;
    this.levelUpBtn.addEventListener("click", this.levelUp.bind(this));
    this.levelDownBtn.addEventListener("click", this.levelDown.bind(this));
  }

  updateScore() {
    const score = this.tetrisModel.getScore();
    this.scoreScreen.innerHTML = score;
  }
  getLevel() {
    return this.level;
  }
  levelUp() {
    this.tetrisModel.levelUp();
    this.level = this.tetrisModel.getLevel();
    this.nowLevel.innerHTML = `LV${this.level}`;
  }
  levelDown() {
    this.tetrisModel.levelDown();
    this.level = this.tetrisModel.getLevel();
    this.nowLevel.innerHTML = `LV${this.level}`;
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
const scoreLevelView = new ScoreLevelView({ selector, tetrisModel });
const tetris = new TetrisView({
  KEY,
  selector,
  tetrisModel,
  shapeView,
  scoreLevelView,
});

tetris.init();

/*
TetrisModel : 가상의 테트리스 판(배열), 점수, 레벨(난이도)의 데이터를 관리
TetrisShape : block모양 data와 reboard에 사용될 colorList 관리
ScoreLevelView : 점수판 관리
TetrisView :

*/
