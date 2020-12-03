export class TetrisView {
  constructor({
    KEY,
    selector,
    START_POINT,
    tetrisModel,
    shapeView,
    scoreLevelView,
  }) {
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
    //메소드에서 class 생성 때 받은 파라미터를 직접 못쓰기 때문에 따로 저장
    this.scoreLevelView = scoreLevelView;
    this.shapeView = shapeView;
    this.START_POINT = START_POINT;
    this.startLeft = START_POINT.LEFT;
    this.startTop = START_POINT.TOP;
    this.shape;
    this.nextShape;
    this.changeCnt = 0;
    this.cellSize = 30;
    this.timer = null;
    this.requestID = null;
    //removeEvent때 콜백함수가 다르면 안되기 때문에 따로 저장
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  init() {
    this.clear();
    this.setNextShape();
    this.playBtn.addEventListener("click", this.handleClick.bind(this));
    this.resetBtn.addEventListener("click", this.handleClick.bind(this));
  }
  //random으로 next 블록 설정
  setNextShape() {
    const shapeList = this.shapeView.getShapeList();
    const random = Math.floor(Math.random() * 7);
    this.nextShape = shapeList[random];
  }

  //model, score, view reset
  handleClick({ target }) {
    this.gameover.classList.add("hidden");
    this.model = this.tetrisModel.resetModel();
    this.tetrisModel.resetScore();
    this.scoreLevelView.updateScore();
    if (target.innerHTML === "RESET") {
      this.resetBlock();
      this.playBtn.disabled = false;
      document.removeEventListener("keydown", this.handleKeydown);
    } else {
      this.playBtn.disabled = true;
      document.addEventListener("keydown", this.handleKeydown);
      this.play();
    }
  }
  //새로운 블럭을 위해 초기화
  resetBlock() {
    cancelAnimationFrame(this.requestID);
    clearTimeout(this.timer);
    this.clear();
    this.clearNextShape();
    this.changeCnt = 0;
    this.startLeft = this.START_POINT.LEFT;
    this.startTop = this.START_POINT.TOP;
  }
  //새로운 블럭을 play
  play() {
    this.resetBlock();
    this.shape = this.nextShape;
    this.setNextShape();
    this.renderNextBlock(this.nextShape.color);
    this.renderBlock(this.shape.color);
    if (this.checkGameOver()) {
      return this.finishPlay();
    }
    this.autoMove();
  }
  //check 게임 오버
  //1번 index가 맨 윗줄이기 때문에 [1]
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
      this.renderBlock(this.shape.color);
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
    this.renderBlock(this.shape.color);
  }

  //space바 누를 시 drop
  drop() {
    if (this.checkBlock(this.startLeft, this.startTop + this.cellSize)) {
      this.clear();
      this.startTop += this.cellSize;
      this.renderBlock(this.shape.color);
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
      } else if (this.shape.name === "I") {
        this.startLeft -= this.cellSize * (this.shape.width - 1);
      } else {
        this.changeCnt--;
      }
    }
    this.renderBlock(this.shape.color);
  }

  //충돌 check하기
  checkBlock(startLeft, startTop) {
    const nowIdx = this.changeCnt % this.shape.location.length;
    for (let size of this.shape.location[nowIdx]) {
      const left = startLeft + this.cellSize * size[0];
      const top = startTop + this.cellSize * size[1];
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
  //nextShape는 항상 default block이 나오게 했다.
  renderNextBlock(color) {
    const cellSize = this.nextCanvas.width / 5;
    const startLeft =
      (this.nextCanvas.width - cellSize * this.nextShape.width) / 2;
    const startTop =
      (this.nextCanvas.height - cellSize * this.nextShape.height) / 2;
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
    const colorList = this.shapeView.getColor();
    for (let i = 1; i < this.model.length; i++) {
      for (let j = 0; j < this.model[i].length; j++) {
        if (this.model[i][j] !== 0) {
          const color = colorList[this.model[i][j]];
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
