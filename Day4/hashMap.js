class Node {
  constructor(key, value = null, next = null) {
    (this.key = key), (this.value = value), (this.next = next);
  }
}

class HashTable {
  constructor() {
    this.allKeys = [];
    this.data = {};
  }
  hash(str) {
    const hashKey = str
      .split("")
      .reduce((acc, curr) => acc + curr.charCodeAt(), 0);
    return hashKey % 10;
  }
  findNode(stringKey) {
    for (let x of Object.keys(this.data)) {
      let node = this.data[x];
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
    if (!this.data[hashKey]) {
      let data = new Node(key, value);
      this.data[hashKey] = new Node(hashKey, null, data);
    } else {
      let data = new Node(key, value, this.data[hashKey].next);
      this.data[hashKey].next = data;
    }
  }

  remove(stringKey) {
    for (let x of Object.keys(this.data)) {
      let prenode = this.data[x];
      let node = this.data[x].next;
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
    this.data = null;
  }
}
