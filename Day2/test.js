// let a = { name: "kyle", age: 26, city: "seoul" };

// const keys = Object.keys(a);

// console.log(keys);

// keys.forEach((key) => (a[key] = "hello"));
// keys.forEach((key) => console.log(a[key]));

// const data = require("./data");

// //4. 배열 만들기
// const dataO = data.dataO;

// const getNumData = (obj) => {
//   let result = [];
//   const keys = Object.keys(obj);
//   keys.forEach((data) => {
//     if (typeof obj[data] === "number") result.push(data);
//     else {
//       for (let i in obj[data]) {
//         if (typeof obj[data][i] === "number") result.push(i);
//       }
//     }
//   });
//   console.log(result);
// };

// getNumData(dataO);

// let Rectangle = class {
//   constructor(height, width) {
//     this.height = height;
//     this.width = width;
//   }
// };

// console.log(Rectangle);
// console.log(Rectangle.name);
// //output : "Rectangle"

// class Animal {
//   constructor(name) {
//     this.name = name;
//   }
//   bark() {
//     console.log(`${this.name} : wall!wall!wall!`);
//   }
// }

// class Dog extends Animal {
//   constructor(name, age) {
//     super(name);
//     this.age = age;
//   }
//   introduce() {
//     console.log(`My name is ${this.name}`);
//     console.log(`I'm ${this.age} years old!`);
//   }
//   bark() {
//     super.bark();
//   }
// }

// const dungii = new Dog("dungii", 7);
// dungii.introduce();
// dungii.bark();

// sumNumbers();

// function foo() {
//   let a = [1, 2, 3, 4, 5, 6];
//   const result = a.map(fooCallback);
//   return result;
// }

// const result = foo();
// // const fooCallback = (a) => a + 1;  //표현식은 에러
// function fooCallback(a) {
//   return a + 1;
// } // 선언식은 에러 x 결과값 잘나옴
// console.log(result);

// class Person {
//   constructor(name, city) {
//     this.name = name;
//     this.city = city;
//   }
//   sayHello = (name) => console.log(`hello! ${name}`);
//   printThis = () => {
//     console.log(this);
//     return "혹시?";
//   };
// }

// const kyle = new Person();
// const cho = new Person();
// kyle.getFriend = (friend) => console.log(`hello ${friend}`);

// console.log(cho);

// function Vehicle(make, model, color) {
//   (this.make = make),
//     (this.model = model),
//     (this.color = color),
//     (this.getName = function () {
//       return this.make + " " + this.model;
//     });
// }
// let car = new Vehicle("Toyota", "Corolla", "Black");
// let car2 = new Vehicle("Honda", "Civic", "White");

// car.callName = () => `hello${this.name}`;

// console.log(car.getName());
// console.log(car2.getName());
// console.log(car.callName());
// console.log(car)

// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// let input = [];

// rl.on("line", (line) => {
//   input = line.split("").map((v) => parseInt(v));
// }).on("close", () => {
//   console.log(input[0].input[1]);
//   process.exit();
// });

let a = [1, 2, 3, 4, 5];
let b = [5, 4, 3, 2, 1];

const asc = (arr) => {
  return arr.sort();
};
const des = (arr) => {
  return arr.sort((a, b) => b - a);
};

function check(arr) {
  jsonArr = JSON.stringify(arr);
  jsonAsc = JSON.stringify(asc(arr));
  jsonDes = JSON.stringify(des(arr));
  // if (JSON.stringify(arr) === JSON.stringify(asc(arr))) {
  //   console.log("ascending");
  // } else if (JSON.stringify(arr) === JSON.stringify(des(arr))) {
  //   console.log("descending");
  // } else console.log("mixed");
  if (jsonArr === jsonAsc) {
    console.log("ascending");
  } else if (jsonArr === jsonDes) {
    console.log("descending");
  } else console.log("mixed");
}

check(b);
