class HashMap {
  constructor(hashSize = 10) {
    this.allKeys = [];
    this.data = {};
    this.hashSize = hashSize;
  }
  hash(str) {
    const hashKey = (str + "")
      .split("")
      .reduce((acc, curr) => acc + curr.charCodeAt(), 0);
    return hashKey % this.hashSize;
  }

  findNode(key) {
    const hashKey = this.hash(key);
    for (let item of this.data[hashKey]) {
      if (item[0] === key) return item;
    }
    return null;
  }
  put(key, value) {
    const hashKey = this.hash(key);
    if (!this.data[hashKey]) {
      this.data[hashKey] = [];
      this.data[hashKey].push([key, value]);
    } else {
      if (this.containsKey(key)) {
        this.replace(key, value);
      } else {
        this.data[hashKey].push([key, value]);
      }
    }
    this.addKey(key);
  }
  remove(key) {
    const hashKey = this.hash(key);
    for (let i = 0; i < this.data[hashKey].length; i++) {
      if (this.data[hashKey][i][0] === key) {
        this.data[hashKey].splice(i, 1);
      }
    }
    if (this.data[hashKey].length === 0) delete this.data[hashKey];
    this.removeKey(key);
  }
  containsKey(key) {
    if (this.findNode(key)) return true;
    else return false;
  }
  get(key) {
    if (this.findNode(key)) return this.findNode(key)[1];
    else return null;
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
  replace(key, value) {
    if (this.findNode(key)) {
      this.findNode(key)[1] = value;
    } else return null;
  }
  size() {
    return this.allKeys.length;
  }
  clear() {
    this.allKeys = [];
    this.data = {};
  }
}

let a = new HashMap();
a.put("kyle", "hello");
a.put(123, "hello1");
a.put("kyel", "hello2");
a.put("ykle", "hello3");
a.remove("kyel");
console.log(a.keys());
console.log(a.size());
a.clear();
a.put("kyle", "hello1");
console.log(a.data);
console.log(a.get("kyle"));
