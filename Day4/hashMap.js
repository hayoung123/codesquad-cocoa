class Node {
  constructor(key, value = null, next = null) {
    (this.key = key), (this.value = value), (this.next = next);
  }
}

class HashTable {
  constructor() {
    this.allKeys = [];
    this.hashKeys = {};
  }
  hash(str) {
    const hashKey = str
      .split("")
      .reduce((acc, curr) => acc + curr.charCodeAt(), 0);
    return hashKey % 10;
  }
  findNode(stringKey) {
    for (let x of Object.keys(this.hashKeys)) {
      let node = this.hashKeys[x];
      while (node) {
        if (node.key === stringKey) return node;
        node = node.next;
      }
    }
    return null;
  }

  put(key, value) {
    const hashKey = this.hash(key);
    if (this.containsKey(key)) {
      this.replace(key, value);
      return;
    }
    if (!this.hashKeys[hashKey]) {
      let data = new Node(key, value);
      this.hashKeys[hashKey] = new Node(hashKey, null, data);
    } else {
      let data = new Node(key, value, this.hashKeys[hashKey].next);
      this.hashKeys[hashKey].next = data;
    }
  }

  remove(stringKey) {
    for (let x of Object.keys(this.hashKeys)) {
      let prenode = this.hashKeys[x];
      let node = this.hashKeys[x].next;
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
    if (this.hashKeys) return true;
    else return false;
  }
  keys() {
    this.allKeys = [];
    for (let x of Object.keys(this.hashKeys)) {
      let node = this.hashKeys[x];
      while (node) {
        if (node !== this.hashKeys[x]) this.allKeys.push(node.key);
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
    this.hashKeys = null;
  }
}
let a = new HashTable();
a.put("kyle", "hello");
a.put("cho", "possible");
// a.put("cho", "possible1");
// a.put("ohc", "cho reverse");
// a.put("song", "song");
// console.log(a.hashKeys);
// a.remove("ohc");
// console.log(a.keys());
// const flag = a.containsKey("kyle");
// console.log(flag);
// console.log(a.get("kyle"));
// console.log(a.get("kyl"));
a.replace("kyle", "welcome");
// console.log(a.findNode("kyle"));
// console.log(a.keys());
// console.log(a.keys());
// console.log(a.size());
// console.log(a.isEmpty());
// a.clear();
console.log(a.hashKeys);
// console.log(a.isEmpty());
