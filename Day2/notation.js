const notation = (num, devideNum) => {
  return num.toString(devideNum).split("");
};

//순서 배열 함수
const fillArr = (len, num) => {
  let arr = new Array(len).fill(0);
  arr = arr.map((_, idx) => (idx % num) + 1);
  return arr;
};

//전제 배열
const solution = (devideNum, max, people) => {
  const maxNum = max * people;
  let result = [];
  for (let i = 0; i < maxNum; i++) {
    notation(i, devideNum).forEach((item) => result.push(item));
  }
  return result;
};

//길동 게임
const notationTurnGame = (devideNum, max, people, gildong) => {
  let result = [];
  let everyArr = solution(devideNum, max, people);
  let turn = fillArr(everyArr.length, people);
  everyArr.forEach((item, idx) => {
    if (turn[idx] === gildong) result.push(item);
  });
  return result;
};
let gildong = notationTurnGame(16, 16, 2, 1);

console.log(gildong);
