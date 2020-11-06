# 백준 알고리즘 문제풀이

- 1000
- 1008
- 2438
- 2920
- 8958
- 11654

# 배열 복사(참조)할 때 주의사항

결론 : 배열을 서로 비교할 때 값만 비교하고싶으면 변수에 넣어서 비교해야된다.

배열(객체포함) 주소값을 복사? 해서 복사해온놈을 변경시키면 기존의 값역시 변경된다.

그렇기 때문에 깊은복사를 통해 복사해야된다.

아래는 `JSON.stringify` 해준 값을 변수에 저장하면 그 값을 갖고 비교가 가능하지만, `JSON.stringify` 자체로 비교하려하면 **arr값이 계속 변해서** 제대로된 비교가 불가능하다.

```javascript
const asc = (arr) => {
  return arr.sort();
};
const des = (arr) => {
  return arr.sort((a, b) => b - a);
};

function check(arr) {
  console.log("변수에 따로 저장할 때");
  let jsonArr = JSON.stringify(arr);
  console.log(jsonArr);
  console.log("----------------------");
  let jsonAsc = JSON.stringify(asc(arr));
  console.log(jsonArr);
  console.log(jsonAsc);
  console.log("----------------------");
  let jsonDes = JSON.stringify(des(arr));
  console.log(jsonArr);
  console.log(jsonAsc);
  console.log(jsonDes);
  console.log("----------------------"); //지조 있게 된다.
  console.log("변수에 따로 저장하지 않을 때");
  console.log(JSON.stringify(arr));
  console.log("----------------------");
  console.log(JSON.stringify(arr));
  console.log(JSON.stringify(asc(arr)));
  console.log("----------------------");
  console.log(JSON.stringify(arr));
  console.log(JSON.stringify(asc(arr)));
  console.log(JSON.stringify(des(arr)));
  console.log("----------------------");
}

let b = [5, 4, 3, 2, 1];
check(b);
```

결과

```
변수에 따로 저장할 때
[5,4,3,2,1]
----------------------
[5,4,3,2,1]
[1,2,3,4,5]
----------------------
[5,4,3,2,1]
[1,2,3,4,5]
[5,4,3,2,1]
----------------------
변수에 따로 저장하지 않을 때
[5,4,3,2,1]
----------------------
[5,4,3,2,1]
[1,2,3,4,5]
----------------------
[1,2,3,4,5]
[1,2,3,4,5]
[5,4,3,2,1]
----------------------
```

---

# 객체 얕은복사 vs 깊은 복사

## 얕은 복사 - Shallow copy

객체가 얕은 복사가 되면 참조하는것이된다.

```javascript
let obj = { a: 1, b: 2 };
let copy = obj;

copy.c = 3;

obj; //{ a: 1, b: 2, c: 3 }
```

### Object.assign() & spread Syntax

- 이것보다 조금 나은 메소드 `Object.assign()`
- 그리고 spread Syntax가 있다.
- for in 으로 하나하나 복사할 수도 있지만 결국 얕다

```javascript
let obj = { a: 1, b: 2 };
let copy = Object.assign({}, obj); //concat마냥 붙인다.
let copy2 = { ...obj };

copy.c = 3;

obj; //{ a: 1, b: 2}
copy; //{ a: 1, b: 2, c: 3 }
copy2; //{ a: 1, b: 2}
```

하지만 객체안 프로퍼티가 객체라면 그것은 참조된다. 즉 깊은 복사가 아닌 한꺼풀만 복사하는 느낌

```javascript
let obj = { a: 1, b: { name: "kyle", city: "seoul" } };
let copy = Object.assign({}, obj); //concat마냥 붙인다.
let copy2 = { ...obj };

obj.a = 0;
obj.b.city = "jeju";

obj; //{ a: 0, b: { name: 'kyle', city: 'jeju' } }
copy; //{ a: 1, b: { name: 'kyle', city: 'jeju' } }
copy2; //{ a: 1, b: { name: 'kyle', city: 'jeju' } }
```

---

## 깊은 복사 Deep copy

## JSON 객체메소드

1. JSON.stringify()로 문자열로변환
2. JSON.parse() 로 다시 변환

하지만 큰 문제점이 있다.

- 객체안의 프로퍼티가 함수면, `JSON.stringify()`가 `function`을 `undefined`로 처리

즉, 특수한 상황아니면 사용하면 안되보인다.

## Deep copy 함수 직접 만들기

- [참조 블로그](https://medium.com/javascript-in-plain-english/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089)를 보고 따라서 만들어봤다.
- stop point : value 값이 object || null이면
- result에 argument가 배열이면 배열로 객체면 객체로 초기화해주고
- for in 으로 객체 key 하나씩 접근한다.
- result에 재귀 돌리면서 return 값 넣기

```javascript
function deepCopy(obj) {
  if (typeof obj !== "object" || obj === null) return obj;

  let result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    result[key] = deepCopy(obj[key]);
  }
  return result;
}
```

## lodash 라이브러리

`lodash` 라이브러리 사용

- `clone` : 얕은복사
- `cloneDeep` : 깊은복사

```javascript
import lodash from "lodash";

const obj = [[1], [2], [3]];

const shallowCopyObj = lodash.clone(obj);
const deepCopyObj = lodash.cloneDeep(obj);
```

---

참조 : https://junwoo45.github.io/2019-09-23-deep_clone/

https://medium.com/javascript-in-plain-english/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089

---

```

```
