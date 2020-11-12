function MyName(classes, nameArr) {
  this.classes = classes;
  this.nameArr = nameArr;
}
// this.classes -> undefined
// 호이스팅 때문??
MyName.prototype.getName = function () {
  this.nameArr.map(function (name) {
    console.log("여기 class는 ", this.classes);
    console.log(name);
  });
};

//// this.classes -> 각자에 맞게 잘나옴
MyName.prototype.getName = function () {
  this.nameArr.map((name) => {
    console.log("여기 class는 ", this.classes);
    console.log(name);
  });
};

const foo = {
  classes: 8,
  nameArr: ["rash", "dico"],
};

const my = new MyName(7, ["kyle", "H"]);
my.getName();
//bind는 함수를 반환 하는 함수
my.getName.bind(foo)();
