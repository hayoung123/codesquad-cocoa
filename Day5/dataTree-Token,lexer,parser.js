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
  this.parsedData = new this.node("root");
}
DataTree.prototype.isRightData = function () {
  const stackBracket = [];
  const stackBrace = [];
  for (let x of this.tokenArr) {
    if (this.isLBracketBrace(x))
      x === L_BRACKET ? stackBracket.push(x) : stackBrace.push(x);
    else if (x === R_BRACKET) {
      if (!stackBracket.length) return false;
      stackBracket.pop();
    } else if (x === R_BRACE) {
      if (!stackBrace.length) return false;
      stackBrace.pop();
    } else continue;
  }
  return !stackBracket.length && !stackBrace.length;
};

//node 생성
DataTree.prototype.node = function (type, value) {
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
  this.tokenArr = tokenArray;
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

//lexer
DataTree.prototype.lexer = function (x) {
  if (x === L_BRACKET) return new this.node("array");
  else if (x === L_BRACE) return new this.node("object");
  else if (this.isObjectValue(x)) {
    const data = x.split(COLON).map((v) => v.trim());
    const newNode = new this.node("property", data[1]);
    newNode.key = data[0];
    return newNode;
  } else if (!isNaN(Number(x))) return new this.node("number", x);
  else return new this.node("string", x);
};

//parser
DataTree.prototype.parser = function (
  node = this.parsedData,
  head = this.parsedData
) {
  const nowValue = this.tokenArr[0];
  if (this.tokenArr.length === 0) return head;
  if (this.isLBracketBrace(nowValue)) {
    const newNode = this.lexer(nowValue);
    this.tokenArr.shift();
    this.parser(newNode, node);
    this.parser(node, head);
  } else if (this.isRBracketBrace(nowValue)) {
    this.tokenArr.shift();
    head.child.push(node);
    return;
  } else {
    const newNode = this.lexer(nowValue);
    this.tokenArr.shift();
    node.child.push(newNode);
    this.parser(node, head);
  }
};
DataTree.prototype.run = function () {
  console.log(`String Data : ${this.data}`);
  this.tokenize();
  const check = this.isRightData();
  if (check) {
    this.parser();
    console.dir(a.parsedData, { depth: null });
    // console.log(JSON.stringify(a.parsedData, null, "\t"));
  } else {
    console.log("잘못된 데이터!!");
  }
};

let a = new DataTree("[12, 23, [hello, [3], world], {x:1, y:2},{z:3}]");
a.run();
