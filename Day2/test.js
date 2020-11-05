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

// const kyle = new Person("kyle", " seoul");
// console.log(kyle.name);
// console.log(kyle.printThis);

// let Rectangle = class {
//   constructor(height, width) {
//     this.height = height;
//     this.width = width;
//   }
// };

// console.log(Rectangle);
// console.log(Rectangle.name);
// //output : "Rectangle"

class Animal {
  constructor(name) {
    this.name = name;
  }
  bark() {
    console.log(`${this.name} : wall!wall!wall!`);
  }
}

class Dog extends Animal {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
  introduce() {
    console.log(`My name is ${this.name}`);
    console.log(`I'm ${this.age} years old!`);
  }
  bark() {
    super.bark();
  }
}

const dungii = new Dog("dungii", 7);
dungii.introduce();
dungii.bark();
