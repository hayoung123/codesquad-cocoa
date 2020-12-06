# prototype

### prototype를 써야하는 이유

```javascript
function Foo(name) {
  this.name = name;
}
Foo.prototype.getName = function () {
  console.log(this.name);
};

function Bar(name) {
  this.name = name;
  this.getName = function () {
    console.log(this.name);
  };
}

const kim = new Foo('kim');
const park = new Foo('park');
kim.getName(); //kim
park.getName(); //park
console.log(kim.getName === park.getName); //true

const kyle = new Bar('kyle');
const alex = new Bar('alex');
kyle.getName(); //kyle
alex.getName(); //alex
console.log(kyle.getName === alex.getName); //false
```

2개의 함수는 모두 name을 저장하고, name을 호출하는 메소드를 갖고 있습니다.

- Foo함수는 prototype을 이용해 `getName`메소드를 선언하였다.
- Bar함수는 함수안에 메소드를 선언 해주었습니다.

여기서 왜 bar함수로 만든 객체들의 메소드는 서로 다를까? 에 대한 대답이 prototype을 사용해야 하는 이유입니다.

다른 이유 : kyle,alex는 객체 생성과 동시에 getName의 메소드를 각각의 주소에 저장했고 kim,park은 prototype객체가 링크 돼었기 때문에 같은 객체(Foo의 prototype객체)를 참조하고있다.

자바스크립트에서 모든 객체는 자신을 생성한 생성자 함수의 **prototype property**가 가르키는 **prototype객체**를 생성하는 객체의 **prototype property**에 **prototype링크**로 연결한다.

쉽게 말해 생성자 함수의 prototype객체가 생성한 객체의 prototype객체로 연결된다고 보면 된다.

chrome 콘솔에서는 `__proto__` 라는 모양을 갖고 있습니다.

근데 프로토타입 객체에도 프로토 타입이 있다. 열어서 확인 해봤더니 자바스크립트의 프로토타입의 종점인 **Object의 prototype객체** 였다. (파란색)

![image](https://user-images.githubusercontent.com/67357426/99045560-e0381b80-25d4-11eb-8f83-035bfb5bd5c2.png)

이렇게 프로토타입이 연결 돼 있는 것을 **프로토타입 체이닝**이라 하고, 프로토타입 체이닝 덕분에 상위 메소드를 사용할 수 있는 것이었다.

어떤 상황에서도 **Object 메소드**를 사용할 수 있는 이유도 프로토타입객체의 종점이 **Object prototype 객체**이기 때문이다.

Array,String,Number에서도 Object 메소드를 사용할 수 있는데 이것도 Array,String,Number의 프로토타입 객체가 Object 프로토타입객체와 체이닝 돼 있기 때문이다.

(자바스크립트는 객체 내에서 주어진 메소드를 발견하지 못하면 프로토타입체이닝으로 상위 프로토타입객체를 탐색하는 방식이다.)
