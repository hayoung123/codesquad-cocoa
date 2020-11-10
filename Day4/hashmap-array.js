class HashMap {
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

  findNode(key) {
    for (let x of Object.keys(this.data)) {
      for (let item of this.data[x]) {
        if (item[0] === key) return item;
      }
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
  }
  remove(key) {
    for (let x of Object.keys(this.data)) {
      for (let i = 0; i < this.data[x].length; i++) {
        if (this.data[x][i][0] === key) {
          this.data[x].splice(i, 1);
        }
      }
    }
    return false;
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
  keys() {
    this.allKeys = [];
    for (let x of Object.keys(this.data)) {
      for (let item of this.data[x]) {
        this.allKeys.push(item[0]);
      }
    }
    return this.allKeys;
  }
  replace(key, value) {
    if (this.findNode(key)) {
      this.findNode(key)[1] = value;
    } else return null;
  }
  size() {
    this.allKeys = [];
    this.keys();
    return this.allKeys.length;
  }
  clear() {
    this.allKeys = [];
    this.data = [];
  }
}

let a = new HashMap();
a.put("kyle", "hello1");
a.put("kyel", "hello2");
a.replace("kyle", "world");
a.put("ykle", "hello3");
a.remove("kyel");
