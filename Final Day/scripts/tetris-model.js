export class TetrisModel {
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
