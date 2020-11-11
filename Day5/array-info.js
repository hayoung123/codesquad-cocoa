class Node {
  constructor(type = "root", value = "null") {
    this.type = type;
    this.value = value;
    this.child = [];
  }
}

class ArrayInfo {
  constructor(stringData) {
    this.stringData = stringData;
    this.node = new Node("root");
    this.data = this.node;
    this.head = null;
  }
  run(data = this.stringData) {
    for (let x of data) {
      if (x === "[") {
        let newNode = new Node("array");
        this.node.child.push(newNode);
        this.head = this.node;
        console.log("head : ", this.head);
        this.node = newNode;
      } else if (x === "]") {
        this.node = this.head;
      } else if (x === ",") continue;
      else {
        let newNode = new Node("number", x);
        this.node.child.push(newNode);
      }
    }
  }
}

// let a = new ArrayInfo("[1,2,[3,4,[5,[6]]]");
let a = new ArrayInfo("[1,[2],[3,[4]]]");
console.log(a);
// a.run();
// console.log(JSON.stringify(a.data));
a.run();
console.log(a.data);
