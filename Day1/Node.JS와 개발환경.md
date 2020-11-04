# 학습정리

## Compiled vs Interpretered

## Compiled Languages

- 컴파일 언어는 전체소스코드를 보고 machine code로 바로 convert한다.
- 인터프리터 언어보다 빠르고 효율적으로 실행되는 경향이 있다.
- 개발자들이 메모리관리, cpu사용등의 하드웨어 적인 부분을 컨트롤할 수 있다.
- 처음 compile 할 때 build를 해야된다. 즉 코드를 바꾸어서 실행할 때 rebuild를 계속 해주어야 한다.
- C, C++, Erlang, Haskell, Rust, Go

### 장점

- native machine code로 컴파일된 프로그램이 인터프리터 코드보다 빠른 경향이 있다.

### 단점

- test전에 전체 컴파일할 때 추가 시간이 소요된다.
- 플랫폼 의존성이 있다..?

## Inerpreted Languages

- 인터프리터는 한줄한줄 실행하는 언어이다.
- 인터프리터는 컴파일 언어보다 느렸었지만 `just in time compilation`의 개발로 그 차이는 줄어들고 있다.
- PHP, Ruby, JavaScript, Python

### 장점

- 보다 유연하고 플랫폼에 독립적이다.

### 단점

- 속도가 느리다.

출처 : [링크](https://www.freecodecamp.org/news/compiled-versus-interpreted-languages/)

---

## 프로그래밍 패러다임

자바스크립트는 script언어 형태이다. 다양한 방식의 프로그래밍 패러다임을 가진 멀티 패러다임 언어이다.

- imperative (명령형)
- functional (함수형)
- declarative (선언적)
- event-driven(이벤트중심)

### 명령형(imperative) vs 선언형(declarative) 프로그래밍

**명령형(imperative)**

명령형 코드는 원하는 작업의 각 단계를 명시적으로 설명하는 코드

```javascript
const double = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i] * 2;
  }
  return arr;
};
```

**선언형(declarative)**

선언형 코드는 원하는 작업을 단순히 말하는 코드

```javascript
const double = (arr) => arr.map((v) => v * 2);
```

> 최근 자바스크립트는 최신 Array, Object 메소드 사용하는 것을 선호 합니다.
> 선언형 코드가 한눈에 알아보기 편하고 이해하기 쉽다.

출처 : [DZone](https://dzone.com/articles/imperative-vs-declarative-javascript)

### Event-driven

자바스크립트는 이벤트가 일어날 때 반응하기 때문에 이벤트 중심이다.

참고자료 : [Why is JavaScript event based](https://medium.com/@bojanaleksa/why-is-javascript-event-based-9c0fd9ac1033),

https://www.valentinog.com/blog/event/

### Functional JavaScript

모르겠다

참고자료 : https://blog.bitsrc.io/functional-programming-in-javascript-how-and-why-94e7a97343b

https://velog.io/@kyusung/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%9A%94%EC%95%BD
