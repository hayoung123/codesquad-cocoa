/*1. 배열 만들기
숫자타입으로만 구성된 요소를 뽑아서 배열 만들기
*/
const data = require('./data.js').data;
function getNumberKeys(data) {
  const keyArray = [];
  const search = (data) => {
    if (!data) return;
    for (let key in data) {
      if (isNumber(data[key])) keyArray.push(key);
      else if (isObject(data[key])) search(data[key]);
    }
  };
  search(data);
  return [...keyArray];
}

function isNumber(value) {
  return !isNaN(Number(value));
}
function isObject(value) {
  return typeof value === 'object';
}

// const numberKeys = getNumberKeys(data);
// console.log(numberKeys);

/*2. 배열 결과 출력
배열에서 type이 sk인 name으로 구성된 배열만 출력
*/
const dataTree = require('./data.js').dataTree;

function getName(data) {
  const nameArray = [];
  const dfs = (data) => {
    if (!data) return;
    for (let x of data) {
      if (x.type === 'sk') nameArray.push(x.name);
      dfs(x.childnode);
    }
  };
  dfs(data);
  return nameArray;
}

// const nameArray = getName(dataTree);
// console.log(nameArray);

/*
reduce 만들기
*/
const myReduce = (arr, callback, initialValue) => {
  if (initialValue) {
    arr.forEach((v) => (initialValue = callback(initialValue, v)));
  } else {
    initialValue = arr[0];
    arr.slice(1).forEach((v) => (initialValue = callback(initialValue, v)));
  }
  return initialValue;
};

const k = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = myReduce(k, (cur, acc) => cur + acc, 0);
console.log(result);
