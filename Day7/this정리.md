# this

알아보고 알아봐도 놀라운 this

## WEB에서의 this

web에서 전역 객체는 window이다.

console창에 this를 쳐보면 window객체가 나온다.

## Node에서의 this

그냥 this를 console에 출력시키면 {} 처럼 **빈객체**가 출력된다.

window가 아닌 빈 객체가 나오는 이유는 WEB과 노드는 다른 런타임이기 때문에 DOM관련된 객체는 없다.

실제 Node에서의 this는 **module.exports**이다. 파일을 모듈로 사용할 수 있게 해주는 객체이다. 즉, this, exports, module.exports는 모두 같다.

```javascript
console.log(this === global); // false
console.log(this === module.exports, this === exports); //true, true

function a() {
  console.log(this); //Object[global]
  console.log(this === exports); //false
}
```

흔히 우리가 아는 this가 global객체로 바인딩 되는 경우는 따로 있다. this는 함수를 어떻게 선언했는지 어디서 활용됐는지에 따라서 동적으로 혹은 정적으로 정해진다.

## 함수 호출에 따른 this 바인딩

자바스크립트는 함수 호출 방식에 의해 this에 바인딩될 객체가 결정된다.

## 함수 선언식

함수 선언식 안에서 this는 global객체를 의미한다. 함수선언식은 함수가 실행될 때 this가 동적으로 결정된다.

이런 이유 때문인지 함수 선언식이 내부함수에서 선언될 경우 (콜백함수, 내부함수의 내부함수)는 항상 global,window 처럼 전역객체에 바인딩된다.

이런 방법을 해결하기 위한 방법

- this를 사용하려는 객체에서 사전에 let that = this 로 변수로 선언해서 사용하기
- apply, call, bind 메소드 사용해 this 바인딩 하기

```javascript
const obj = {
  name: "kyle",
  getName: function () {
    console.log(this); //obj
    const that = this;
    setTimeout(function () {
      console.log(this); // window
      console.log(that); //obj
    });
  },
};
```

## arrow function

arrow function은 this 바인딩할 객체가 선언할 때 정적으로 결정된다. 즉, 언제나 **상위 스코프의 this를 가르킨다** 이를 **Lexical this** 라한다.

위 함수 선언식과 같은 예제지만 내부함수임에도 화살표 함수는 상위 스코프의 this를 가르키고 있다.

즉, 콜백함수에서 this를 사용할 때 헷갈리지 않게 사용할 수 있다.

```javascript
const obj = {
  name: "kyle",
  getName: function () {
    console.log(this); //obj
    setTimeout(() => {
      console.log(this); // obj
    });
  },
};
```

하지만 arrow function을 조심해야 하는 경우도 있다. `addEventListener`, 생성자함수 등 있다.
[poiemaweb](https://poiemaweb.com/es6-arrow-function) 을 보면 자세하게 나와있다.

## 생성자 함수를 사용할 때 this 바인딩

생성자 함수는 new연산자를 붙여서 호출해 객체를 생성하는 함수이다. 암묵적으로 맨 앞글자를 대문자로 사용한다.

생성자 함수를 사용할 때 this 바인딩을 예제를 통해 확인해보자

```javascript
function Person(name) {
  this.name = name;
  console.log(this);
}

const kyle = new Person("kyle"); //Person { name: 'kyle' }
console.log(kyle.__proto__); //Person{}
const kelly = Person("kelly"); // global Object
```

new 연산자와 생성자 함수를 호출하면

1. 빈객체를 생성하고 이 객체에 this 바인딩한다.
2. 빈객체는 생성자함수의 prototype 프로퍼티가 가르키는 객체를 자신의 프로토타입 객체로 설정한다.
3. 빈 객체에 this를 이용해 프로퍼티, 메소드를 생성해 추가한다.
4. 객체를 반환한다.

\*\* this외에 다른것을 반환하거나 this를 반환하지 않는 함수는 생성자 함수의 역할을 수행할 수 없다는 것을 알 수 있다.

### 객체 리터럴 vs 생성자 함수

둘의 차이는 각자의 프로토타입 객체가 다르다.

- 객체 리터럴 : Object.prototpye
- 생성자 함수 : 생성자함수.prototype

## apply, call, bind

Function.prototype 객체의 메소드인 apply, call bind 를 통해서 this를 특정 객체에 명시적으로 바인딩 할 수 있다.

### apply

`func.apply(thisArg, [argsArray])`

apply는 함수를 호출하는 함수이다. 주로 유사 배열 객체들을 객체 메소드를 활용할 때 사용된다.

```javascript
function k() {
  console.log(arguments); //[Arguments] { '0': 1, '1': 2, '2': 3 }

  console.log(arguments.slice()); // Error

  const arr = Array.prototype.slice.apply(arguments);
  console.log(arr); //[ 1, 2, 3 ]
}

k(1, 2, 3);
```

apply는 slice메소드를 호출하는데 this는 arguments로 바인딩하라는 뜻이다. 즉, `arguments.slice()`

### call

`func.call(thisArg[, arg1[, arg2[, ...]]])`

call은 apply와 하는 역할은 같다. 하지만 apply와 문법이 조금 다르다.

apply는 array로 실행시킬 함수의 arguments를 받는 반면 call은 인자를 하나하나 받는다.

### bind

bind는 apply와 call과 다르게 함수를 리턴하고 호출하지는 않는다.

```javascript
const obj = {
  name: "kyle",
  sayHello: function () {
    console.log(this.name);
  },
};

const obj2 = {
  name: "kelly",
};

obj.sayHello(); //kyle
obj.sayHello.call(obj2); //kelly
obj.sayHello.bind(obj2)(); //kelly
```

위의 예제처럼 bind는 함수를 리턴하기 때문에 호출을 따로 해주어야 한다.

## addEventListener 사용시 콜백함수의 this

`addEventListener` 를 사용해서 콜백 함수를 호출할 때 콜백함수는 addEventLisener를 호출하는 즉, 트리거가 되는 객체가 this 로 바인딩 돼 들어간다.

이러한 현상은 코딩할 때 혼동을 주기 마련이다.

2가지 해결 방안이 있다.

1. 콜백함수를 화살표함수로 작성하기
2. bind로 this 바인딩하기

아래 예제를 보고 이해해보자.

```javascript
class Event {
  init() {
    div.addEventListener("click", this.sayThis);
    div.addEventListener("click", this.sayThat);
    div.addEventListener("click", this.useBind.bind(this));
  }
  sayThis() {
    console.log("함수 선언식", this); // div
  }
  sayThat = () => {
    console.log("화살표 함수", this); //Event
  };
  useBind() {
    console.log("함수 선언식 with bind", this); //Event
  }
}
```

하지만 화살표 함수를 이용할 때 문제점이 있다.

Event의 prototype property 가 가르키는 객체에 화살표 함수로 선언된 `sayThat`은 포함되지 않는다.

이는 상속한 뒤 `override`하고 싶을 때 번거로움을 유발시킨다.

자바스크립트에 대해 공부하면서 알면 알수록 알아야 될게 끊임없이 이어져서 나온다..ㅎㅎ

그래도 재밌다

참조 : https://www.zerocho.com/category/NodeJS/post/5b67e8607bbbd3001b43fd7b

https://poiemaweb.com/js-this

https://stackoverflow.com/questions/39048796/function-declarations-or-expressions-for-class-methods

# 렉시컬 스코프 알아보자

함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프(Lexical scope)는 함수를 선언할 때 결정된다. this 바인딩과 혼동하지 않도록 주의하기 바란다.

참조 : https://poiemaweb.com/js-this

```javascript
function a() {
  console.dir(this.name); //global
}
const name = "kyle";
global.name = "globalKyle"; //global객체의 프로퍼티로 저장
console.log(this.name);
a(); //globalKyle
```

아니 저 name은 어디에 바인딩돼 저장돼있는거람??
