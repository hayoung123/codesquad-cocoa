// function a() {
//   console.dir(this); //global
// }
// const b = () => {
//   console.log(this); // {}
// };
// a();
// b();

// let name = "Who am I";

// class Person {
//   constructor() {
//     this.name = "kyle";
//   }
//   getName = () => {
//     console.log(this);
//     console.log(this.name);
//     console.log(name);
//   };
// }

// let p = new Person();
// p.getName();
// console.log(this === global); // false
// console.log(this === module.exports, this === exports); //true, true

// function a() {
//   console.dir(this.name); //global
// }
// const name = "kyle";
// global.name = "globalKyle";
// console.log(this.name);
// a();

class person {
  sayHi = () => {
    // === sayHi: function() {
    console.log(`Hi ${this.name}`);
  };
}
queryselector;
person.sayHi(); // Hi Lee
