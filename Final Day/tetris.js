class TetrisModel {}
class TetrisShape {
  constructor() {
    this.shape = [
      {
        name: "I",
        color: "red",
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
        name: "O",
        location: [
          [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1],
          ],
        ],
        color: "orange",
      },
      {
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
        color: "yellow",
      },
      {
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
        color: "green",
      },
      {
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
        color: "blue",
      },
      {
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
        color: "navy",
      },
      {
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
        color: "purple",
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
    this.changeCnt = 0;
    this.shapeWidth = 0;
    this.cellSize = 30;
    this.startLeft = 90;
    this.startTop = 0;
    this.canvas = document.querySelector("#js-tetris__canvas");
    this.context = this.canvas.getContext("2d");
  }
  random() {
    const random = Math.floor(Math.random() * 6);
    this.shape = this.shapeList[random];
  }
  init() {
    this.random();
    console.log(this.shape);
    this.createGrid();
    this.createShape(this.shape.color);
    document.addEventListener("keydown", this.handleKeydown.bind(this));
  }
  handleKeydown({ code }) {
    // event.preventDefault();
    if (code === "ArrowDown" || code === "ArrowLeft" || code === "ArrowRight") {
      this.move(code);
    } else if (code === "ArrowUp" || code === "Space") {
      this.change();
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
      if (this.startLeft >= this.canvas.width - this.shapeWidth) {
        this.createShape();
        return;
      }
      this.startLeft += this.cellSize;
    }
    this.createShape();
  }
  change() {
    this.clear();
    this.changeCnt++;
    this.createShape();
  }

  //this.shape에 있는 모양그리기
  createShape(color) {
    this.shapeWidth = 0;
    this.context.beginPath();
    this.context.fillStyle = color;
    this.context.lineWidth = 1.5;
    const nowIdx = this.changeCnt % this.shape.location.length;
    for (let x of this.shape.location[nowIdx]) {
      const left = this.startLeft + this.cellSize * x[0];
      const top = this.startTop + this.cellSize * x[1];
      this.context.rect(left, top, this.cellSize, this.cellSize);
      this.shapeWidth =
        this.shapeWidth < (x[0] + 1) * this.cellSize
          ? (x[0] + 1) * this.cellSize
          : this.shapeWidth;
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
  //지우는함수0
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.createGrid();
  }
}

const tetrisShape = new TetrisShape();
const tetris = new TetrisView(tetrisShape.getShape());

tetris.init();

// this.shape = [
//       {
//         name: "I",
//         color: "red",
//         location: [
//           [
//             [0, 0],
//             [1, 0],
//             [2, 0],
//             [3, 0],
//           ],
//           [
//             [0, 0],
//             [0, 1],
//             [0, 2],
//             [0, 3],
//           ],
//         ],
//       },
//       {
//         name: "O",
//         location: [
//           [
//             [0, 0],
//             [1, 0],
//             [0, 1],
//             [1, 1],
//           ],
//         ],
//         color: "orange",
//       },
//       {
//         name: "T",
//         location: [
//           [
//             [1, 0],
//             [0, 1],
//             [1, 1],
//             [2, 1],
//           ],
//           [
//             [1, 0],
//             [0, 1],
//             [1, 1],
//             [2, 1],
//           ],
//           [
//             [1, 0],
//             [0, 1],
//             [1, 1],
//             [2, 1],
//           ],
//           [
//             [1, 0],
//             [0, 1],
//             [1, 1],
//             [2, 1],
//           ],
//         ],
//         color: "yellow",
//       },
