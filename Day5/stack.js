//filter
function filterBraceNum(str) {
  const data = [];
  let tmpNum = [];
  for (let x of str.split("")) {
    if (x === "[") data.push("[");
    else if (x === "]") {
      if (tmpNum.length) {
        data.push(tmpNum.join(""));
        tmpNum = [];
      }
      data.push("]");
    } else if (x === ",") {
      if (tmpNum.length) {
        data.push(tmpNum.join(""));
        tmpNum = [];
      }
    } else tmpNum.push(x);
  }
  return data;
}

//올바른 데이터 check & value
function checkArr(str) {
  const stack = [];
  const value = [];
  let maxDepth = 0;
  let depth = 0;
  let data = filterBraceNum(str);
  let dataTree = new Node("root");
  for (let x of data) {
    if (x === "[") {
      stack.push("[");
      depth++;
      maxDepth = maxDepth < depth ? depth : maxDepth;
    } else if (x === "]") {
      if (stack.pop() === "[") {
        depth--;
      } else {
        console.log("잘못된 정보입니다.");
        return;
      }
    } else {
      value.push(x);
    }
  }
  if (stack.length) {
    console.log("잘못된 정보입니다.");
    return;
  } else {
    console.log(
      `깊이 수준은 ${maxDepth}이며, 총 ${value.length}개의 원소가 포함되어 있습니다.`
    );
    console.log(run(dataTree, dataTree));
    return;
  }
}

class Node {
  constructor(type, value) {
    this.type = type;
    this.value = value;
    this.child = [];
  }
}

function run(node = this.dataTree, head = this.dataTree) {
  if (this.data.length === 0) {
    return node;
  } else {
    if (this.data[0] === "[") {
      this.data.shift();
      const newNode = new Node("array");
      this.run(newNode, node);
      //
      this.run(node, head);
    } else if (this.data[0] === "]") {
      this.data.shift();
      head.child.push(node);
      return;
    } else {
      const newNode = new Node("number", this.data.shift());
      node.child.push(newNode);
      this.run(node, head);
    }
  }
}
// class ArrayInfo {
//   constructor(str) {
//     this.dataTree = new Node("root");
//     this.data = filterBraceNum(str);
//   }
//   run(node = this.dataTree, head = this.dataTree) {
//     if (this.data.length === 0) {
//       return node;
//     } else {
//       if (this.data[0] === "[") {
//         this.data.shift();
//         const newNode = new Node("array");
//         this.run(newNode, node);
//         //
//         this.run(node, head);
//       } else if (this.data[0] === "]") {
//         this.data.shift();
//         head.child.push(node);
//         return;
//       } else {
//         const newNode = new Node("number", this.data.shift());
//         node.child.push(newNode);
//         this.run(node, head);
//       }
//     }
//   }
// }

function run1(data) {
  checkArr(data);
  // const dataClass = new ArrayInfo(data);
  console.log(JSON.stringify(dataClass.run(), null, "\t"));
}

console.log("-----------------Test Case---------------");
console.log("[1,2,[3,4,[5,[6]]]]");
run1("[1,2,[3,4,[5,[6]]]]");
console.log("[1,2,[3,4,[5,[6]]");
run1("[1,2,[3,4,[5,[6]]");
