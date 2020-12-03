import { TetrisModel } from "./tetris-model.js";
import { ScoreLevelView } from "./score-level-view.js";
import { TetrisShape } from "./tetris-shape.js";
import { TetrisView } from "./tetris-view.js";

const START_POINT = {
  LEFT: 90,
  TOP: -30,
};

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
  START_POINT,
  tetrisModel,
  shapeView,
  scoreLevelView,
});

tetris.init();
