class Node {
  constructor(type = "root", value, head) {
    if (value) {
      this.type = type;
      this.value = value;
      this.child = [];
      this.head = head;
    } else {
      this.type = type;
      this.child = [];
      this.head = head;
    }
  }
}

function arrayInfo(data) {
  let node = new Node("root");
  let dataTree = node;
  let head = null;

  for (let x of data) {
    if (x === "[") {
      const newNode = new Node("array", null, node);
      node.child.push(newNode);
      head = node;
      node = newNode;
    } else if (x === "]") {
      node = head;
      head = node.head;
    } else if (x === ",") continue;
    else {
      const newNode = new Node("number", x, node);
      node.child.push(newNode);
    }
  }
  dataTree = run(dataTree);

  console.log(`dataTree :  ${JSON.stringify(dataTree)}`);

  return dataTree;
}

function run(data) {
  if (!data.child) return;
  else {
    for (let x of data.child) {
      if (x.head) delete x.head;
      run(x);
    }
  }
  return data;
}
arrayInfo("[1,[2,[3],[4]],[5]]");
// console.log(arrayInfo("[1,[2,[3],[4]],[5]]"));
