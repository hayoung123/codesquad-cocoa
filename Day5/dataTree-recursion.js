class Node {
  constructor(type, value) {
    if (value) {
      this.type = type;
      this.value = value;
      this.child = [];
    } else {
      this.type = type;
      this.child = [];
    }
  }
}

class ArrayInfo {
  constructor(str) {
    this.dataTree = new Node("root");
    this.data = str.split("").filter((v) => v !== ",");
  }
  run(node = this.dataTree, head = this.dataTree) {
    if (this.data.length === 0) {
      return head;
    } else {
      if (this.data[0] === "[") {
        this.data.shift();
        const newNode = new Node("array");
        this.run(newNode, node);
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
}

// let a = new ArrayInfo("[1,[2]]");
let a = new ArrayInfo("[1,[2,[3],[4]],[5]]");
a.run();
console.log(JSON.stringify(a.run()));
