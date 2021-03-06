class Node {
  constructor(key, value = null, next = null) {
    (this.key = key), (this.value = value), (this.next = next);
  }
}

class HashTable {
  constructor(hashSize = 10) {
    this.allKeys = [];
    this.data = {};
    this.hashSize = hashSize;
  }
  hash(str) {
    const hashKey = str
      .split('')
      .reduce((acc, curr) => acc + curr.charCodeAt(), 0);
    return hashKey % this.hashSize;
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
    } else {
      if (!this.data[hashKey]) {
        let data = new Node(key, value);
        this.data[hashKey] = new Node(hashKey, null, data);
      } else {
        let data = new Node(key, value, this.data[hashKey].next);
        this.data[hashKey].next = data;
      }
    }
    this.addKey(key);
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
    if (!this.data[hashKey].next) delete this.data[hashKey];
    this.removeKey(stringKey);
  }

  containsKey(stringKey) {
    if (this.findNode(stringKey)) return true;
    else return false;
  }
  get(stringKey) {
    if (this.findNode(stringKey)) return this.findNode(stringKey).value;
    else console.log('no data');
  }
  replace(stringKey, stringValue) {
    if (this.findNode(stringKey)) {
      let node = this.findNode(stringKey);
      node.key = stringKey;
      node.value = stringValue;
    } else {
      console.log('no data');
    }
  }
  isEmpty() {
    if (Object.keys(this.data).length === 0) return true;
    else return false;
  }
  addKey(key) {
    this.allKeys.push(key);
  }
  removeKey(key) {
    this.allKeys.splice(this.allKeys.indexOf(key), 1);
  }
  keys() {
    return this.allKeys;
  }

  size() {
    return this.allKeys.length;
  }
  clear() {
    this.allKeys = [];
    this.data = {};
  }
}

let a = new HashTable();
a.put('kyle', 'hello');
a.put('cho', 'possible');
a.put('cho', 'possible1');
a.put('ohc', 'cho reverse');
a.put('song', 'song');
console.dir(a, { depth: null });
// a.remove('ohc');
// console.log(a.keys());
// console.log(a.containsKey('kyle'));
// console.log(a.get('kyle'));
// console.log(a.get('kyl'));
// a.replace('kyle', 'welcome');
// console.log(a.findNode('kyle'));
// console.log(a.keys());
// console.log(a.keys());
// console.log(a.size());
// console.log(a.isEmpty());
