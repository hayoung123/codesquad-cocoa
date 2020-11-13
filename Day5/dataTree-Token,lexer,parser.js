const [L_BRACKET, R_BRAKET, L_BRACE, R_BRACE, COMMA, COLON] = [
  "[",
  "]",
  "{",
  "}",
  ",",
  ":",
];
function Node(type, value) {
  this.type = type;
  this.value = value;
  this.child = [];
}
function DataTree(data) {
  this.data = data;
  this.tokenArr = [];
  this.parsedData = new Node("root");
}

//tokenize 배열, 객체, 스트링, 숫자 쪼개기
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
  this.tokenArr = this.tokenArr
    .filter((v) => !this.isComma(v))
    .map((v) => v.trim());
  return this.tokenArr;
};

//is function
DataTree.prototype.isLBraket = function (char) {
  return char === L_BRACKET || char === L_BRACE;
};
DataTree.prototype.isRBraket = function (char) {
  return char === R_BRAKET || char === R_BRACE;
};
DataTree.prototype.isComma = function (char) {
  return char === COMMA;
};
DataTree.prototype.isObjectValue = function (str) {
  return str.includes(COLON);
};

//lexer
DataTree.prototype.lexer = function (x) {
  if (x === L_BRACKET) return new Node("array");
  else if (x === L_BRACE) return new Node("object");
  else if (this.isObjectValue(x)) {
    const data = x.split(COLON).map((v) => v.trim());
    const newNode = new Node("property", data[1]);
    newNode.key = data[0];
    return newNode;
  } else if (!isNaN(Number(x))) return new Node("number", x);
  else return new Node("string", x);
};

//parser
DataTree.prototype.parser = function (
  node = this.parsedData,
  head = this.parsedData
) {
  const nowValue = this.tokenArr[0];
  if (this.tokenArr.length === 0) return head;
  if (this.isLBraket(nowValue)) {
    const newNode = this.lexer(nowValue);
    this.tokenArr.shift();
    this.parser(newNode, node);
    this.parser(node, head);
  } else if (this.isRBraket(nowValue)) {
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

let a = new DataTree();
let k = a.tokenize("[12, 23, [hello, [3], world], {x:1, y:2},{z:3}]");
console.log(k);
a.parser();
console.log(JSON.stringify(a.parsedData, null, "\t"));
