// let a = { name: "kyle", age: 26, city: "seoul" };

// const keys = Object.keys(a);

// console.log(keys);

// keys.forEach((key) => (a[key] = "hello"));
// keys.forEach((key) => console.log(a[key]));

const data = require("./data");

//4. 배열 만들기
const dataO = data.dataO;

const getNumData = (obj) => {
  let result = [];
  const keys = Object.keys(obj);
  keys.forEach((data) => {
    if (typeof obj[data] === "number") result.push(data);
    else {
      for (let i in obj[data]) {
        if (typeof obj[data][i] === "number") result.push(i);
      }
    }
  });
  console.log(result);
};

getNumData(dataO);
