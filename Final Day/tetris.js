class TetrisView {
  constructor() {
    this.canvas = document.querySelector("#js-tetris__canvas");
    this.context = this.canvas.getContext("2d");
  }
  init() {
    this.createGrid();
    this.createShape("blue");
  }
  move() {
    this.context.addE;
  }
  createShape(color) {
    this.context.beginPath();
    this.context.fillStyle = color;
    // this.context.lineWidth = 1.5;
    for (let i = 0; i < 2; i++) {
      this.context.rect(120 - 30 + 30 * i, 0, 30, 30);
      this.context.rect(120 + 30 * i, 30, 30, 30);
    }
    this.context.fill();
    this.context.stroke();
    this.context.closePath();
  }
  createGrid() {
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    this.context.lineWidth = 0.3;
    for (let i = 1; i < 10; i++) {
      this.drawLine(30 * i, 0, 30 * i, canvasHeight);
    }
    for (let i = 1; i < 20; i++) {
      this.drawLine(0, 30 * i, canvasWidth, 30 * i);
    }
  }

  drawLine(startLeft, startTop, endLeft, endTop) {
    this.context.beginPath();
    this.context.moveTo(startLeft, startTop);
    this.context.lineTo(endLeft, endTop);
    this.context.stroke();
    this.context.closePath();
  }
}

const tetris = new TetrisView();

tetris.init();

// 가로 긴거
// for (let i = 0; i < 4; i++) {
//   this.context.rect(90 + 30 * i, 0, 30, 30);
// }

// 세로 긴거
// for (let i = 0; i < 4; i++) {
//   this.context.rect(0, 30 * i, 30, 30);
// }

// L자
// for (let i = 0; i < 3; i++) {
//   this.context.rect(120, 30 * i, 30, 30);
// }
// this.context.rect(120 + 30, 60, 30, 30);

// reverse L자
//  for (let i = 0; i < 3; i++) {
//    this.context.rect(120, 30 * i, 30, 30);
//  }
//  this.context.rect(120 - 30, 60, 30, 30);

// ㅗ 자
// this.context.rect(120, 0, 30, 30);
// for (let i = 0; i < 3; i++) {
//   this.context.rect(120 - 30 + 30 * i, 30, 30, 30);
// }

// S자
// for (let i = 0; i < 2; i++) {
//   this.context.rect(120 + 30 * i, 0, 30, 30);
//   this.context.rect(120 - 30 + 30 * i, 30, 30, 30);
// }

// Z 자
// for (let i = 0; i < 2; i++) {
//   this.context.rect(120 - 30 + 30 * i, 0, 30, 30);
//   this.context.rect(120 + 30 * i, 30, 30, 30);
// }

// 네모
// for (let i = 0; i < 2; i++) {
//   for (let j = 0; j < 2; j++) {
//     this.context.rect(120 + 30 * i, 30 * j, 30, 30);
//   }
// }
