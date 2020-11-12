const [L_BRACKET, R_BRAKET, L_BRACE, R_BRACE, COMMA, BLANK] = [
  "[",
  "]",
  "{",
  "}",
  ",",
];
function DataTree(data) {
  this.data = data;
  this.tokenArr = [];
}

//배열, 객체, 스트링, 숫자 쪼개기
DataTree.prototype.tokenize = function (stringData) {
  let temp = [];
  for (let x of stringData) {
    if (this.isLBraket(x)) this.tokenArr.push(x);
    else if (this.isRBraket(x) || this.isComma(x)) {
      if (temp.length) {
        this.tokenArr.push(temp.join(""));
        temp = [];
      }
      this.tokenArr.push(x);
    } else temp.push(x);
  }
  return this.tokenArr.filter((v) => !this.isComma(v)).map((v) => v.trim());
};

DataTree.prototype.isLBraket = function (char) {
  return char === L_BRACKET || char === L_BRACE;
};
DataTree.prototype.isRBraket = function (char) {
  return char === R_BRAKET || char === R_BRACE;
};
DataTree.prototype.isComma = function (char) {
  return char === COMMA;
};

let a = new DataTree();
let k = a.tokenize("[12, 23, [hello, [3], world], { x: 3}]");
console.log(k);
