const [L_BRACKET, R_BRACKET, L_BRACE, R_BRACE, COMMA, COLON] = [
  "[",
  "]",
  "{",
  "}",
  ",",
  ":",
];
function DataTree(data) {
  this.data = data;
  this.tokenArr = [];
  this.parsedData = new this.Node("root");
}

//node 생성
DataTree.prototype.Node = function (type, value) {
  if (value) {
    this.type = type;
    this.value = value;
    this.child = [];
  } else {
    this.type = type;
    this.child = [];
  }
};

//tokenize 배열, 객체, 스트링, 숫자 쪼개기
DataTree.prototype.tokenize = function (data = this.data) {
  let tokenArray = [];
  let temp = [];
  for (let x of data) {
    if (this.isLBracketBrace(x)) tokenArray.push(x);
    else if (this.isRBracketBrace(x) || this.isComma(x)) {
      if (temp.length) {
        tokenArray.push(temp.join(""));
        temp = [];
      }
      tokenArray.push(x);
    } else temp.push(x);
  }
  tokenArray = tokenArray.filter((v) => !this.isComma(v)).map((v) => v.trim());
  return tokenArray;
};

//is function
DataTree.prototype.isLBracketBrace = function (char) {
  return char === L_BRACKET || char === L_BRACE;
};
DataTree.prototype.isRBracketBrace = function (char) {
  return char === R_BRACKET || char === R_BRACE;
};
DataTree.prototype.isComma = function (char) {
  return char === COMMA;
};
DataTree.prototype.isObjectValue = function (str) {
  return str.includes(COLON);
};

DataTree.prototype.lexer = function (tokenArray) {
  const lexerArray = [];
  for (let x of tokenArray) {
    if (this.isLBracketBrace(x)) {
      lexerArray.push(new this.Node(x === L_BRACKET ? "array" : "object"));
    } else if (this.isRBracketBrace(x)) {
      lexerArray.push(new this.Node("closed"));
    } else if (x.includes(COLON)) {
      const keyValue = x.split(COLON).map((v) => v.trim());
      const newNode = new this.Node("parameter", keyValue[1]);
      newNode.key = keyValue[0];
      lexerArray.push(newNode);
    } else if (!isNaN(Number(x))) {
      lexerArray.push(new this.Node("number", x));
    } else {
      lexerArray.push(new this.Node("string", x));
    }
  }
  return lexerArray;
};

DataTree.prototype.parser = function (lexerArray) {
  const parsedArray = new this.Node("root");
  const stack = [];
  for (let elem of lexerArray) {
    if (elem.type === "array" || elem.type === "object") stack.push(elem);
    else if (elem.type === "closed") {
      let currentValue = stack.pop();
      if (stack.length === 0) {
        parsedArray.child.push(currentValue);
      } else {
        stack[stack.length - 1].child.push(currentValue);
      }
    } else {
      stack[stack.length - 1].child.push(elem);
    }
  }
  return parsedArray;
};

const a = new DataTree("[12, 23, [hello, [3], world], {x:1, y:2},{z:3}]");
const tokenArray = a.tokenize();
const lexerArray = a.lexer(tokenArray);
const parsedArray = a.parser(lexerArray);
console.dir(parsedArray, { depth: null });
