function foo(name) {
  this.name = name;
}
foo.prototype.getName = function () {
  console.log(this.name);
};

function bar(name) {
  this.name = name;
  this.getName = function () {
    console.log(this.name);
  };
}

class Mov {
  constructor(name) {
    this.name = name;
  }
  getName() {
    console.log(this.name);
  }
}

const kim = new foo("kim");
kim.getName();
const park = new foo("park");
park.getName();
console.log(kim.getName === park.getName);
const kyle = new bar("kyle");
kyle.getName();
const alex = new bar("alex");
alex.getName();
console.log(kyle.getName === alex.getName);

const john = new Mov("john");
const kelly = new Mov("kelly");
john.getName();
kelly.getName();
console.log(john.getName === kelly.getName);
