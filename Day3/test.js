// let b = [1, 2, 3, 4, 5];

// function des(arr) {
//   return arr.sort((a, b) => b - a);
// }

// console.log(b);
// console.log(des(b));
// console.log(b === des(b));

// const newB = b;
// // const newB = JSON.stringify(b);
// const newDesB = des(b);
// console.log(newB);
// console.log(newDesB);
// console.log(newB === newDesB);

const lodash = require("lodash");

let originalArray = [37, 3700, { hello: "world" }];
console.log("Original array:", ...originalArray); // 37 3700 Object { hello: "world" }

let shallowCopiedArray = lodash.clone(originalArray);
let deepCopiedArray = lodash.cloneDeep(originalArray);

originalArray[1] = 0; // Will affect the original only
console.log(`originalArray[1] = 0 // Will affect the original only`);
originalArray[2].hello = "moon"; // Will affect the original and the shallow copy
console.log(
  `originalArray[2].hello = "moon" // Will affect the original array and the shallow copy`
);

console.log("Original array:", ...originalArray); // 37 0 Object { hello: "moon" }
console.log("Shallow copy:", ...shallowCopiedArray); // 37 3700 Object { hello: "moon" }
console.log("Deep copy:", ...deepCopiedArray); // 37 3700 Object { hello: "world" }
