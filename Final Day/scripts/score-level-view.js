export class ScoreLevelView {
  constructor({ selector, tetrisModel }) {
    this.tetrisModel = tetrisModel;
    this.scoreScreen = selector.scoreScreen;
    this.level = this.tetrisModel.getLevel();
    this.nowLevel = selector.nowLevel;
    selector.levelUpBtn.addEventListener("click", this.levelUp.bind(this));
    selector.levelDownBtn.addEventListener("click", this.levelDown.bind(this));
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
