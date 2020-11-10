class Node {
  constructor(key, value = null, next = null) {
    (this.key = key), (this.value = value), (this.next = next);
  }
}

class HashTable {
  constructor(size = 10) {
    this.allKeys = [];
    this.data = {};
    this.size = size;
  }
  hash(str) {
    const hashKey = str
      .split("")
      .reduce((acc, curr) => acc + curr.charCodeAt(), 0);
    return hashKey % this.size;
  }
  findNode(stringKey) {
    const hashKey = this.hash(stringKey);
    let node = this.data[hashKey];
    while (node) {
      if (node.key === stringKey) return node;
      node = node.next;
    }
    return null;
  }

  put(key, value) {
    const hashKey = this.hash(key);
    if (this.containsKey(key)) {
      this.replace(key, value);
      return;
    }
    if (!this.data[hashKey]) {
      let data = new Node(key, value);
      this.data[hashKey] = new Node(hashKey, null, data);
    } else {
      let data = new Node(key, value, this.data[hashKey].next);
      this.data[hashKey].next = data;
    }
  }

  remove(stringKey) {
    const hashKey = this.hash(stringKey);
    let prenode = this.data[hashKey];
    let node = this.data[hashKey].next;
    while (prenode && node) {
      if (node.key === stringKey) {
        if (node.next) {
          prenode.next = node.next;
          return;
        } else prenode.next = null;
      }
      prenode = node;
      node = node.next;
    }
  }

  containsKey(stringKey) {
    if (this.findNode(stringKey)) return true;
    else return false;
  }
  get(stringKey) {
    if (this.findNode(stringKey)) return this.findNode(stringKey).value;
    else console.log("no data");
  }
  replace(stringKey, stringValue) {
    if (this.findNode(stringKey)) {
      let node = this.findNode(stringKey);
      node.key = stringKey;
      node.value = stringValue;
    } else {
      console.log("no data");
    }
  }
  isEmpty() {
    if (this.data) return true;
    else return false;
  }
  keys() {
    this.allKeys = [];
    for (let x of Object.keys(this.data)) {
      let node = this.data[x];
      while (node) {
        if (node !== this.data[x]) this.allKeys.push(node.key);
        node = node.next;
      }
    }
    return this.allKeys;
  }
  size() {
    this.allKeys = [];
    this.keys();
    return this.allKeys.length;
  }
  clear() {
    this.allKeys = [];
    this.data = {};
  }
}

let a = new HashTable();
a.put("kyle", "hello");
a.put("cho", "possible");
a.put("cho", "possible1");
a.put("ohc", "cho reverse");
a.put("song", "song");
console.log(a.data);
a.remove("ohc");
console.log(a.keys());
const flag = a.containsKey("kyle");
console.log(flag);
console.log(a.get("kyle"));
console.log(a.get("kyl"));
a.replace("kyle", "welcome");
// console.log(a.findNode("kyle"));
// console.log(a.keys());
// console.log(a.keys());
// console.log(a.size());
// console.log(a.isEmpty());
a.clear();
console.log(a);
a.put("kyle", "hello");
console.log(a.data);
// console.log(a.isEmpty());
