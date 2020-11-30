class TetrisShape {
  constructor() {
    this.shape = [
      {
        name: "M",
        location: [
          [-1, 0],
          [0, 0],
          [1, 0],
          [2, 0],
        ],
        color: "red",
      },
      {
        name: "I",
        location: [
          [0, 0],
          [0, 1],
          [0, 2],
          [0, 3],
        ],
        color: "orange",
      },
      {
        name: "T",
        location: [
          [0, 0],
          [-1, 1],
          [0, 1],
          [1, 1],
        ],
        color: "yellow",
      },
      {
        name: "L",
        location: [
          [0, 0],
          [0, 1],
          [0, 2],
          [1, 2],
        ],
        color: "green",
      },
      {
        name: "J",
        location: [
          [1, 0],
          [1, 1],
          [1, 2],
          [0, 2],
        ],
        color: "blue",
      },
      {
        name: "S",
        location: [
          [0, 0],
          [1, 0],
          [-1, 1],
          [0, 1],
        ],
        color: "navy",
      },
      {
        name: "Z",
        location: [
          [-1, 0],
          [0, 0],
          [0, 1],
          [1, 1],
        ],
        color: "orange",
      },
      {
        name: "O",
        location: [
          [0, 0],
          [1, 0],
          [0, 1],
          [1, 1],
        ],
        color: "green",
      },
    ];
  }
  getShape() {
    return this.shape;
  }
}

class TetrisView {
  constructor(shapeList) {
    this.shapeList = shapeList;
    this.shape;
    this.cellSize = 30;
    this.startLeft = 90;
    this.startTop = 0;
    this.canvas = document.querySelector("#js-tetris__canvas");
    this.context = this.canvas.getContext("2d");
  }
  random() {
    const random = Math.floor(Math.random() * 7);
    this.shape = this.shapeList[random];
  }
  init() {
    this.random();
    this.createGrid();
    this.createShape(this.shape.color);
    document.addEventListener("keydown", this.handleKeydown.bind(this));
  }
  handleKeydown({ code }) {
    // event.preventDefault();
    if (code === "ArrowDown" || code === "ArrowLeft" || code === "ArrowRight") {
      this.move(code);
    } else if (code === "ArrowUp" || code === "Space") {
    }
  }
  move(code) {
    this.clear();
    if (code === "ArrowDown") {
      this.startTop += this.cellSize;
    } else if (code === "ArrowLeft") {
      if (this.startLeft <= 0) {
        this.createShape();
        return;
      }
      this.startLeft -= this.cellSize;
    } else if (code === "ArrowRight") {
      if (this.startLeft >= this.canvas.width - 60) {
        this.createShape();
        return;
      }
      this.startLeft += this.cellSize;
    }
    this.createShape();
  }
  //this.shape에 있는 모양그리기
  createShape(color) {
    this.context.beginPath();
    this.context.fillStyle = color;
    this.context.lineWidth = 1.5;
    for (let x of this.shape.location) {
      this.context.rect(
        this.startLeft + this.cellSize * x[0],
        this.startTop + this.cellSize * x[1],
        this.cellSize,
        this.cellSize
      );
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
  //지우는함수
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.createGrid();
  }
}

const tetrisShape = new TetrisShape();
const tetris = new TetrisView(tetrisShape.getShape());

tetris.init();
