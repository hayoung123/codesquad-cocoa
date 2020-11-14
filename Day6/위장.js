function solution(clothes) {
  let res = 0;
  const clothesCnt = reBuild(clothes);
  for (let i = 1; i <= clothesCnt.length; i++) {
    combination(clothesCnt, i);
  }
  return cnt;
}

function combination(arr,num,sum) {
    for (let i = 0; )
}

function reBuild(clothes) {
  let obj = {};
  let clothesArray = [];
  for (let x of clothes) {
    if (obj[x[1]]) obj[x[1]].push(x[0]);
    else {
      obj[x[1]] = [];
      obj[x[1]].push(x[0]);
    }
  }
  for (let key in obj) {
    clothesArray.push(obj[key].length);
  }
  return clothesArray;
}

let k = solution([
  ["yellow_hat", "headgear"],
  ["blue_sunglasses", "eyewear"],
  ["green_turban", "headgear"],
]);

console.log(k);
