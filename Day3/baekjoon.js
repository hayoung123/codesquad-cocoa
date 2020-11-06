//1000

// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// let input;

// rl.on("line", (num) => {
//   input = num.split(" ").map((v) => parseInt(v));
// }).on("close", () => {
//   console.log(input[0] + input[1]);
//   process.exit();
// });

//1008
// let input;

// rl.on("line", (num) => {
//   input = num.split(" ").map((v) => parseInt(v));
// }).on("close", () => {
//   console.log(input[0] / input[1]);
//   process.exit();
// });

//2438 별찍기 1
// let row;

// function printStar(num) {
//   for (let i = 1; i <= num; i++) {
//     let temp = new Array(i).fill("*").join("");
//     console.log(temp);
//   }
// }

// rl.on("line", (line) => (row = parseInt(line))).on("close", () => {
//   printStar(row);
//   process.exit();
// });

//2920 음계
// const asc = (arr) => {
//   return arr.sort();
// };
// const des = (arr) => {
//   return arr.sort((a, b) => b - a);
// };

// function check(arr) {
//   jsonArr = JSON.stringify(arr);
//   jsonAsc = JSON.stringify(asc(arr));
//   jsonDes = JSON.stringify(des(arr));
//   if (jsonArr === jsonAsc) {
//     console.log("ascending");
//   } else if (jsonArr === jsonDes) {
//     console.log("descending");
//   } else console.log("mixed");
// }

// let input;
// rl.on("line", (line) => (input = line.split(" ").map((v) => parseInt(v)))).on(
//   "close",
//   () => {
//     check(input);
//     process.exit();
//   }
// );

//8958 OX퀴즈
// let input = [];
// rl.on("line", (line) => input.push(line)).on("close", () => {
//   checkPoint(input);
//   process.exit();
// });

// function checkPoint(input) {
//   input.splice(0, 1);
//   const testCase = input;
//   for (let x of testCase) {
//     let sum = 0;
//     let temp = 0;
//     for (let char of x) {
//       temp = char === "O" ? temp + 1 : 0;
//       sum += temp;
//     }
//     console.log(sum);
//   }
// }

//11654 아스키 코드
// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// let str;
// rl.on("line", (line) => (str = line)).on("close", () => {
//   console.log(str.charCodeAt());
//   process.exit();
// });
