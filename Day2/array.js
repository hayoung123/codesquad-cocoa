const data = require("./data");

// 1. factorial 함수
const calculate = (num) => {
  let result = [];
  const fac = memoize(factorial);
  for (let i = 1; i <= num; i++) {
    let tmp = fac(i);
    result.push(tmp);
  }
  console.log(result);
};

const memoize = (fn) => {
  let cache = {};
  return function (args) {
    if (cache[args]) return cache[args];
    else {
      const result = fn(args);
      cache[args] = result;
      return result;
    }
  };
};

const factorial = (num) => {
  if (num === 1) return num;
  else return num * factorial(num - 1);
};

// calculate(4);

// 2. 배열 거르기
//for/while문 version
const peoples = ["crong!@#", "h2onux5", "sarah#", "hea3d", "zello", "5lucas"];

const filterId = (peoples) => {
  const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  let result = [];
  for (let person of peoples) {
    if (!person.match(reg)) result.push(person);
  }
  for (let i = 0; i < result.length; i++) {
    result[i] = result[i].replace(/[0-9]/g, "");
  }
  console.log(result);
};

// filterId(peoples);

// 고차함수 version
const filterId2 = (peoples) => {
  const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  let result = [];
  peoples = peoples.filter((person) => person.match(reg) === null);
  result = peoples.map((person) => person.replace(/[0-9]/g, ""));
  console.log(result);
};

filterId2(peoples);

//3. 평균 구하기
const grades = [
  [88, 76, 77],
  [33, 44, 44],
  [90, 100, 94],
  [30, 44, 98],
];

const solutionAvg = (grades) => {
  const studentAvg = grades.map((item) => getAvg(item));
  const bestScoreArr = getBestScoreArr(grades);
  const bestScoreAvg = getAvg(bestScoreArr);
  console.log(studentAvg, bestScoreAvg);
};

const getAvg = (grades) => {
  const avgGrades = grades.reduce((prev, current) => {
    return prev + current;
  }, 0);
  return avgGrades / grades.length;
};

const getBestScoreArr = (grades) => {
  return grades.map((item) => Math.max.apply(null, item));
};

// solutionAvg(grades);

//4. 배열 만들기
const dataO = data.dataO;

const getNumData = (obj) => {
  let result = [];
  const keys = Object.keys(obj);
  keys.forEach((data) => {
    if (typeof obj[data] === "number") result.push(data);
    else if (typeof obj[data] === "object") {
      for (let i in obj[data]) {
        if (typeof obj[data][i] === "number") result.push(i);
      }
    }
  });
  console.log(result);
};

// getNumData(dataO);

//5.배열 결과 출력
const dataTree = data.dataTree;

const typeCheck = (data, name = []) => {
  if (data.length === 0) return;
  else {
    for (let i in data) {
      if (data[i].type === "sk") name.push(data[i].name);
      typeCheck(data[i].childnode, name);
    }
  }
  return name;
};
// const nameArr = typeCheck(dataTree);
// console.log(nameArr);

//6. reduce 만들기
const myReduce = (arr, callback, initialValue) => {
  let prev;
  if (!initialValue) {
    prev = arr[0];
    for (let i = 1; i < arr.length; i++) {
      prev = callback(prev, arr[i]);
    }
  } else {
    prev = initialValue;

    for (let x of arr) {
      prev = callback(x, prev);
    }
  }
  return prev;
};

// const result = myReduce([1, 2, 3, 4, 5], (next, prev) => {
//   return next * prev;
// });
// console.log(result);
