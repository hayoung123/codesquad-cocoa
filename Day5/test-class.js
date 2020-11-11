class Node {
  constructor(type = "root", head = null, value = "null") {
    this.type = type;
    this.head = head;
    this.value = value;
    this.child = [];
  }
}

class ArrayInfo {
  constructor(stringData) {
    this.stringData = stringData;
    this.node = new Node("root");
    this.data = this.node;
  }
  run(data = this.stringData) {
    console.log(`head : ${JSON.stringify(this.head)}`);
    console.log("-----------------------------------------");
    for (let x of data) {
      if (x === "[") {
        let newNode = new Node("array");
        this.node.child.push(newNode);
        this.node = newNode;
        console.log(`x는  : ${x}`);
        console.log(`head : ${JSON.stringify(this.node.head)}`);
        console.log(`node : ${JSON.stringify(this.node)}`);
        console.log("-----------------------------------------");
      } else if (x === "]") {
        this.node = this.node.head;
        console.log(`x는  : ${x}`);
        console.log(`head : ${JSON.stringify(this.node.head)}`);
        console.log(`node : ${JSON.stringify(this.node)}`);
        console.log("-----------------------------------------");
      } else if (x === ",") continue;
      else {
        let newNode = new Node("number", this.node, x);
        this.node.child.push(newNode);
        console.log(`x는  : ${x}`);
        console.log(`head : ${JSON.stringify(this.node.head)}`);
        console.log(`node : ${JSON.stringify(this.node)}`);
        console.log("-----------------------------------------");
      }
    }
  }
}

// let a = new ArrayInfo("[1,2,[3,4,[5,[6]]]");
// let a = new ArrayInfo("[1,[2],[3,[4]]]");
let a = new ArrayInfo("[1,[2,[3]]]");
console.log(a);
// a.run();
a.run();
console.log(JSON.stringify(a.data));
// console.log(a.data);
