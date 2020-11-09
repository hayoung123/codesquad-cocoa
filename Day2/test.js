const data = require("./data");

const dataTree = data.dataTree;

const typeCheck = (data, name = []) => {
  if (data.length === 0 || typeof data !== "object") return;
  else {
    for (let i in data) {
      if (data[i].type === "sk") name.push(data[i].name);
      console.log(data[i]);
      typeCheck(data[i].childnode, name);
    }
  }
  return name;
};

console.log(typeCheck(dataTree));
