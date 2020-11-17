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
```

흔히 우리가 아는 this가 global객체로 바인딩 되는 경우는 따로 있다.

## 함수 호출에 따른 this 바인딩

자바스크립트는 함수 호출 방식에 의해 this에 바인딩될 객체가 결정된다.

1. 함수 선언식 안에서 this는 global객체를 의미한다.

```javascript
function a() {
  console.log(this); //Object[global]
  console.log(this === exports); //false
}
```

참조 : https://www.zerocho.com/category/NodeJS/post/5b67e8607bbbd3001b43fd7b

https://poiemaweb.com/js-this

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
