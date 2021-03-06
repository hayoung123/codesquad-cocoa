## Map,set / 고차함수 / 객체 탐색 / filter / class

---

# Map vs Set

map, set은 ES6에서 새로 도입한 자료구조

### Set,Map이 필요한이유

- object는 문자열/심볼 만 key 값으로 들어간다. (map,set은 1와 '1'도 구분된다.)
- 객체의 프로퍼티의 개수를 알아야할경우 (set,map -> size)
- object는 for of 또는 spread syntax로 접근이 힘들다. (object는 not iterable)

## Set

- Set은 중복을 허용하지 않는 데이터 집합
- Set을 사용하면 데이터에 빠르게 엑세스 할 수 있다.
- 1와 '1'은 다른것으로 간주 즉, 중복을 확인하기 위해 강제적으로 자료형을 변형하지 않는다.
- forEach(callback(value,key,set)[, thisArg]), for of 로 값에 접근가능하다.

```javascript
const mySet = new Set(); // {}

mySet.add(1); // {1}
mySet.add(2); //{1,2}
mySet.size; //2
mySet.delete(1); //{2}
mySet.has(2); //true
mySet.has(1); //false
myset.clear(); // {}

let arr = [...mySet]; //Spread 연산자를 이용해 array로 만들 수 있다.
function eliminateDuplicates(items) {
  return [...new Set(items)];
}
//--> array중복제거 하고싶으면 Set바꿨다 arr 하면 쉽게 해결
```

### WeakSet

- set이 참조하는것이 모두 사라졌을 때 원래(Set)는 유지 되지만 같이 사라지기 원한다면 --> new WeakSet()
- has,add,delete만 지원
- key는 반드시 object

```javascript
let set = new WeakSet(),
  key = {};
set.add(key);
key = null;
console.log(key); // false
//일반 Set이었으면 set.size ==> 1
```

---

## Map

- Map 객체는 키-값을 저장한다.
- Set과 마찬가지로 key는 자료형을 구분한다.
- Set처럼 배열을 넣어서 초기화 시킬 수 도 있다.

```javascript
let myMap = new Map(); //{}
myMap.set(1, "hello"); //{1=>'hello'}
myMap.set("1", "hello"); //{1=>'hello', '1'=>'hello'}
myMap.set(1, "world"); //{1=>'world', '1'=>'hello'}
myMap.get(1); //'world'
myMap.has(1); //true
myMap.delete(1); // {'1' => 'hello'}
//clear, size 는 Set과 같다.

let myMap = new Map(["name", "kyle"], ["city", "seoul"]); //{"name" => "kyle", "city" => "seoul"}
```

### Map.prototype.entries()

Map객체에 각 요소에 해당하는 키,값 쌍을 Map에 등록한 순서대로 포함한 새로운 Iterator 객체를 반환한다.

entries()를 사용해 for of문으로 쉽게 키,값 에 접근할 수 있다.

```javascript
const map1 = new Map();

map1.set("0", "foo");
map1.set(1, "bar");

const iterator1 = map1.entries(); //Map { '0' => 'foo', 1 => 'bar' }

console.log(map1);
console.log(iterator1.next().value); //[ '0', 'foo' ]
console.log(iterator1.next().value); //[ 1, 'bar' ]
console.log(iterator1.next().value); //undefined

for (let x of map1.entries()) {
  console.log(x);
}
//[ '0', 'foo' ]
//[ 1, 'bar' ]
```

### WeakMap

- WeakMap도 참조하는 객체가 사라지면 자동으로 가비지 콜렉팅된다.
- WeakMap은 set,get,has,delete만 지원
- key는 반드시 object

출처 : https://infoscis.github.io/2018/01/27/ecmascript-6-sets-and-maps/

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Map/entries

---

# 고차 함수란?

고차함수란 함수를 argument로 받거나 또는 함수를 return함으로써 작동하는 함수를 말합니다.

즉, 고차함수는 함수를 argument로 함수를 받는 함수 또는 함수를 return하는 함수 입니다.

Array메소드 중 `map`, `filter`, `reduce`가 고차합수입니다.

출처 : https://blog.bitsrc.io/understanding-higher-order-functions-in-javascript-75461803bad

### higher order functions는 어떻게 메서드 체이닝이 가능할까?

일단 map, filter는 새로운 배열을 반환하기 때문에 메서드 체이닝이 가능하다.

즉, 함수를 반환하는 고차함수가 어떻게 메서드 체이닝이 가능한가를 물어보는건가?

//나중에 더알아보자

---

# 객체 탐색

### Object.keys() 와 forEach로 탐색

`Object.keys()`로 키를 구한다음 forEach로 object에 접근했을 때,
값을 변경할 수 있다.

```javascript
let a = { name: "kyle", age: 26, city: "seoul" };

const keys = Object.keys(a);

console.log(keys); //[ 'name', 'age', 'city' ]

keys.forEach((key) => (a[key] = "hello"));
keys.forEach((key) => console.log(a[key])); //'hello'  'hello'  'hello'
```

---

## Array.prototype.filter

> arr.filter(callback(element[,index[,array]])[,thisArg])

- filter는 `callback`함수에서 `boolean`을 return해야한다.
- 따로 함수를 만들어서 넣으면 보기 좋더라

```javascript
function isOdd(num) {
  return num % 2;
}

let a = [1, 2, 3, 4, 5, 6, 7];
a = a.filter(isOdd);

console.log(a); //[1,3,5,7]
```

---

# JavaScript ES6의 class

- 함수 선언과 클래스 선언의 가장 큰 차이는 호이스팅입니다.

  > 함수의 경우 -> 호이스팅 발생 -> 호출보다 아래에 선언해도 문제 없음
  >
  > 클래스 -> 호이스팅 X -> 클래스를 사용하기 전에 선언해야 한다.
  >
  > [poiemaweb](https://poiemaweb.com/es6-class) 에서는 호이스팅 된다고하고 예제를 보면 되는것같긴하다 근데 잘모르곘다.

```javascript
const p = new Rectangle(); // ReferenceError

class Rectangle {}
```

## Class 표현식

- class내부의 class 는 그 클래스 아래의 예시에서는 Person을 가르킨다.
- class역시 함수이므로 함수 메소드 name을 사용할 수 있다.
- constructor은 1번만 선언가능하다.

```javascript
class Person {
  constructor(name, city) {
    this.name = name;
    this.city = city;
  }
  sayHello = (name) => console.log(`hello! ${name}`);
  printThis = () => console.log(this);
}

const kyle = new Person("kyle", " seoul");
console.log(kyle.name); //kyle
console.log(kyle.printThis()); //Person{...} undefined(printThis return없기 때문)
```

## class body

- class body는 {}로 묶인 부분
- class body에서 constructor, method 과 같은 class members를 정의

## class 상속

- extends 와 super로 상속할 수 있다.
- constructor도 상속 가능하다.

```javascript
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
```

출처 : [MDN class](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)
