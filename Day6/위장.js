//풀이를 알고난 뒤 시도
// 다른사람의 풀이를 보고 처음으로 해결한 답안이다.
//안입을 경우인 0을 더해주어서 해결하였다.
//그래도 다른사람 풀이를 보니 심히 많이 놀라웠다.

// function solution(clothes) {
//   let result = 1;
//   const clothesCnt = reBuild(clothes);
//   for (let x of clothesCnt) {
//     result *= x + 1;
//   }
//   result--;
//   return result;
// }

// function reBuild(clothes) {
//   let obj = {};
//   let clothesArray = [];
//   for (let x of clothes) {
//     if (obj[x[1]]) obj[x[1]].push(x[0]);
//     else {
//       obj[x[1]] = [];
//       obj[x[1]].push(x[0]);
//     }
//   }
//   for (let key in obj) {
//     clothesArray.push(obj[key].length);
//   }
//   return clothesArray;
// }

//객체를 이용해 value값을 더해서 만들어주고, Object.values메소드를 이용해 array로 리턴해
//계산해주는 방식
function solution(clothes) {
  let result = 1;
  let obj = {};
  for (let x of clothes) {
    obj[x[1]] = obj[x[1]] ? obj[x[1]] + 1 : 1;
  }
  const countList = Object.values(obj);
  countList.forEach((v) => (result *= v + 1));
  return result - 1;
}
// 내생각 모범답안
//reduce 를 이용해 객체에 값을 넣고, value로 array로 만든다.
//그후 reduce로 곱해주고 1을 뺀다.
//어떻게 하면 이렇게 reduce를 잘활용할까 대단하다.
//많이 쓰려고 노력해야겠다.
function solution(clothes) {
  const valueList = Object.values(
    clothes.reduce((obj, curr) => {
      obj[curr[1]] = obj[curr[1]] ? obj[curr[1]] + 1 : 1;
      return obj;
    }, {})
  );
  return valueList.reduce((prev, curr) => prev * (curr + 1), 1) - 1;
}

//첫 조합 시도
// 조합으로 하나하나 구할경우 양이 많아지면 엄청난 재귀호출로인해 callstack이 터져버린다...
//그렇기 때문에 다른 방법으로 구현해야한다.
//하지만 이문제로 조합을 많이 공부했기 때문에 좋은 시도였다고 생각한다.

// function solution(clothes) {
//   let res = 0;
//   const clothesCnt = reBuild(clothes);
//   for (let i = 1; i <= clothesCnt.length; i++) {
//     const combinationArray = combination(clothesCnt, i);
//     res += sumElem(combinationArray);
//   }
//   return res;
// }
// function sumElem(arr) {
//   let sum = 0;
//   for (let x of arr) {
//     let tmp = 1;
//     for (let y of x) {
//       tmp *= y;
//     }
//     sum += tmp;
//   }
//   return sum;
// }

//combination
// function combination(arr, selectNum) {
//   let result = [];
//   if (selectNum === 1) return arr.map((v) => [v]);

//   arr.forEach((v, index, originalArr) => {
//     const fixed = v;
//     const restArr = originalArr.slice(index + 1);
//     const combinationList = combination(restArr, selectNum - 1);
//     const combineFix = combinationList.map((v) => [fixed, ...v]);
//     result.push(...combineFix);
//   });
//   return result;
// }

// function reBuild(clothes) {
//   let obj = {};
//   let clothesArray = [];
//   for (let x of clothes) {
//     if (obj[x[1]]) obj[x[1]].push(x[0]);
//     else {
//       obj[x[1]] = [];
//       obj[x[1]].push(x[0]);
//     }
//   }
//   for (let key in obj) {
//     clothesArray.push(obj[key].length);
//   }
//   return clothesArray;
// }
