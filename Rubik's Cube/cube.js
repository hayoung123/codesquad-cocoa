class RubiksCube {
  constructor({ cube }) {
    this.cube = cube;
    this.initCube = JSON.parse(JSON.stringify(this.cube));
    this.DIR_TYPE = {
      UP: { fixer: 'row', fixIndex: 0 },
      DOWN: { fixer: 'row', fixIndex: 2 },
      LEFT: { fixer: 'column', fixIndex: 0 },
      RIGHT: { fixer: 'column', fixIndex: 2 }
    };
    this.MOVE_TYPE = {
      F: {
        data: this.cube.front,
        linked: [
          { plainCube: this.cube.up, direction: this.DIR_TYPE.DOWN },
          { plainCube: this.cube.right, direction: this.DIR_TYPE.LEFT },
          { plainCube: this.cube.down, direction: this.DIR_TYPE.UP },
          { plainCube: this.cube.left, direction: this.DIR_TYPE.RIGHT }
        ]
      },
      R: {
        data: this.cube.right,
        linked: [
          { plainCube: this.cube.up, direction: this.DIR_TYPE.RIGHT },
          { plainCube: this.cube.back, direction: this.DIR_TYPE.LEFT },
          { plainCube: this.cube.down, direction: this.DIR_TYPE.RIGHT },
          { plainCube: this.cube.front, direction: this.DIR_TYPE.RIGHT }
        ]
      },
      L: {
        data: this.cube.left,
        linked: [
          { plainCube: this.cube.up, direction: this.DIR_TYPE.LEFT },
          { plainCube: this.cube.front, direction: this.DIR_TYPE.LEFT },
          { plainCube: this.cube.down, direction: this.DIR_TYPE.LEFT },
          { plainCube: this.cube.back, direction: this.DIR_TYPE.RIGHT }
        ]
      },
      B: {
        data: this.cube.back,
        linked: [
          { plainCube: this.cube.up, direction: this.DIR_TYPE.UP },
          { plainCube: this.cube.left, direction: this.DIR_TYPE.LEFT },
          { plainCube: this.cube.down, direction: this.DIR_TYPE.DOWN },
          { plainCube: this.cube.right, direction: this.DIR_TYPE.RIGHT }
        ]
      },
      U: {
        data: this.cube.up,
        linked: [
          { plainCube: this.cube.front, direction: this.DIR_TYPE.UP },
          { plainCube: this.cube.left, direction: this.DIR_TYPE.UP },
          { plainCube: this.cube.back, direction: this.DIR_TYPE.UP },
          { plainCube: this.cube.right, direction: this.DIR_TYPE.UP }
        ]
      },
      D: {
        data: this.cube.down,
        linked: [
          { plainCube: this.cube.front, direction: this.DIR_TYPE.DOWN },
          { plainCube: this.cube.right, direction: this.DIR_TYPE.DOWN },
          { plainCube: this.cube.back, direction: this.DIR_TYPE.DOWN },
          { plainCube: this.cube.left, direction: this.DIR_TYPE.DOWN }
        ]
      }
    };
    this.count = 0;
  }
  splitString(str) {
    let strList = str.split('').map((char) => char.toUpperCase());
    for (let i = 0; i < strList.length; i++) {
      if (strList[i] === "'") strList[i - 1] += "'";
    }
    strList = strList.filter((char) => char !== "'");
    const newStrList = [];
    strList.forEach((char, idx) => {
      if (!isNaN(parseInt(char))) {
        const arr = new Array(char * 1 - 1).fill(strList[idx - 1]);
        newStrList.push(...arr);
      } else {
        newStrList.push(char);
      }
    });
    return newStrList;
  }
  moveOneIndex(arr) {
    const last = arr.pop();
    arr.unshift(last);
    return arr;
  }
  reverseOneIndex(arr) {
    const first = arr.shift();
    arr.push(first);
    return arr;
  }
  moveIndex(arr, reverse) {
    if (reverse) return this.reverseOneIndex(arr);
    else return this.moveOneIndex(arr);
  }
  checkReverse(char) {
    if (char.split('').includes("'")) return true;
    return false;
  }
  removeQuotes(char) {
    return char.replace("'", '');
  }
  moveCube(type) {
    this.count++;
    const reverse = this.checkReverse(type);
    type = this.removeQuotes(type);
    type = this.MOVE_TYPE[type];
    type.data = this.rotateCube(type.data, reverse);
    let newArr = [];
    type.linked.forEach((cube) => {
      const linkedArr = this.makeNewArr(cube.plainCube, cube.direction);
      newArr.push(linkedArr);
    });
    newArr = this.moveIndex(newArr, reverse);
    type.linked.forEach((cube, idx) =>
      this.setCubeData(cube.plainCube, newArr[idx], cube.direction)
    );
  }
  makeNewArr(cube, dir) {
    let newArr = [];
    if (dir.fixer === 'row') {
      cube[dir.fixIndex].forEach((code) => newArr.push(code));
    } else {
      cube.forEach((cube) => newArr.push(cube[dir.fixIndex]));
    }
    return newArr;
  }
  setCubeData(cube, newCube, dir) {
    if (dir.fixer === 'row') {
      for (let column = 0; column < cube.length; column++) {
        cube[dir.fixIndex][column] = newCube[column];
      }
    } else {
      for (let row = 0; row < cube.length; row++) {
        cube[row][dir.fixIndex] = newCube[row];
      }
    }
  }
  rotateCube(cube, reverse) {
    if (reverse) return this.reverseRotate(cube);
    else return this.rotate(cube);
  }
  rotate(cube) {
    let arr = cube;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < i; j++) {
        [arr[i][j], arr[j][i]] = [arr[j][i], arr[i][j]];
      }
    }
    arr.forEach((row) => row.reverse());
    return arr;
  }
  reverseRotate(cube) {
    let arr = cube;
    arr.forEach((row) => row.reverse());
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < i; j++) {
        [arr[i][j], arr[j][i]] = [arr[j][i], arr[i][j]];
      }
    }
    return arr;
  }
  resetCube() {
    for (let x in this.cube) {
      for (let row = 0; row < this.cube[x].length; row++) {
        for (let col = 0; col < this.cube[x][row].length; col++) {
          this.cube[x][row][col] = this.initCube[x][row][col];
        }
      }
    }
  }
}

class CubeGame {
  constructor({ rubiksCube }) {
    this.rubiksCube = rubiksCube;
    this.cube = this.rubiksCube.cube;
    this.moveType = this.rubiksCube.MOVE_TYPE;
    this.answer = JSON.stringify(this.cube);
  }
  getRandomString() {
    let randomString = '';
    Object.keys(this.moveType).forEach((type) => {
      randomString += type;
      randomString += Math.ceil(Math.random() * 4);
    });
    return randomString;
  }
  randomCube() {
    const randomString = this.getRandomString();
    const count = this.rubiksCube.count;
    const typeList = this.rubiksCube.splitString(randomString);
    typeList.forEach((type) => this.rubiksCube.moveCube(type));
    this.rubiksCube.count = count;
  }
  checkAnswer() {
    const stringCube = JSON.stringify(this.cube);
    if (stringCube === this.answer) {
      //정답창 띄우기
    }
  }
}

class CubeView {
  constructor({ rubiksCube, cubeGame }) {
    this.cube = rubiksCube.cube;
    this.cubeGame = cubeGame;
    this.canvas = document.querySelector('#js-cube__canvas');
    this.context = this.canvas.getContext('2d');
    this.moveBtn = document.querySelector('.btn__container');
    this.cubeForm = document.querySelector('.cube-control__form');
    this.cubeCommand = document.querySelector('.cube-commands');
    this.CUBE_TYPE = {
      up: { left: 150, top: 0, color: 'blue' },
      down: { left: 150, top: 300, color: 'red' },
      left: { left: 0, top: 150, color: 'white' },
      front: { left: 150, top: 150, color: 'orange' },
      right: { left: 300, top: 150, color: 'green' },
      back: { left: 450, top: 150, color: 'yellow' }
    };
    this.colorType = {
      B: 'blue',
      R: 'red',
      O: 'orange',
      G: 'green',
      W: 'white',
      Y: 'yellow'
    };
    this.cellSize = 50;
  }
  init() {
    this.moveBtn.addEventListener('click', this.handleClick.bind(this));
    this.cubeForm.addEventListener('submit', this.handleSubmit.bind(this));
    this.cubeCommand.addEventListener('click', this.handleCommand.bind(this));
  }
  handleClick({ target }) {
    const type = target.innerHTML;
    rubiksCube.moveCube(type);
    this.renderCube();
  }
  handleSubmit({ target }) {
    try {
      const input = target.input.value;
      const typeList = rubiksCube.splitString(input);
      typeList.forEach((type) => {
        rubiksCube.moveCube(type);
        this.renderCube();
      });
    } catch (error) {}
    target.input.value = '';
  }
  handleCommand({ target }) {
    const targetName = target.innerHTML;
    if (targetName === 'shuffle') {
      this.cubeGame.randomCube();
      this.renderCube();
    } else if (targetName === 'Reset') {
      rubiksCube.resetCube();
      console.log(JSON.stringify(rubiksCube.cube));
      this.renderCube();
    }
  }
  renderCube() {
    Object.keys(this.cube).forEach((type) => {
      this.renderBlock(this.cube[type], this.CUBE_TYPE[type]);
    });
  }
  renderBlock(arr, cubeType) {
    for (let row = 0; row < arr.length; row++) {
      for (let column = 0; column < arr[row].length; column++) {
        this.renderBox(
          cubeType.left + column * this.cellSize,
          cubeType.top + row * this.cellSize,
          this.colorType[arr[row][column]]
        );
      }
    }
  }
  renderBox(left, top, color) {
    this.context.beginPath();
    this.context.fillStyle = color;
    this.context.lineWidth = 1.5;
    this.context.rect(left, top, this.cellSize, this.cellSize);
    this.context.fill();
    this.context.stroke();
    this.context.closePath();
  }
}

let cube = {
  up: Array.from(Array(3), () => new Array(3).fill('B')),
  down: Array.from(Array(3), () => new Array(3).fill('R')),
  front: Array.from(Array(3), () => new Array(3).fill('O')),
  right: Array.from(Array(3), () => new Array(3).fill('G')),
  left: Array.from(Array(3), () => new Array(3).fill('W')),
  back: Array.from(Array(3), () => new Array(3).fill('Y'))
};

const rubiksCube = new RubiksCube({ cube });
const cubeGame = new CubeGame({ rubiksCube });
const cubeView = new CubeView({ rubiksCube, cubeGame });

cubeView.renderCube();
cubeView.init();
