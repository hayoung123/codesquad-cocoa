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
myMap.set(1, 'hello'); //{1=>'hello'}
myMap.set('1', 'hello'); //{1=>'hello', '1'=>'hello'}
myMap.set(1, 'world'); //{1=>'world', '1'=>'hello'}
myMap.get(1); //'world'
myMap.has(1); //true
myMap.delete(1); // {'1' => 'hello'}
//clear, size 는 Set과 같다.

let myMap = new Map(['name', 'kyle'], ['city', 'seoul']); //{"name" => "kyle", "city" => "seoul"}
```

### Map.prototype.entries()

Map객체에 각 요소에 해당하는 키,값 쌍을 Map에 등록한 순서대로 포함한 새로운 Iterator 객체를 반환한다.

entries()를 사용해 for of문으로 쉽게 키,값 에 접근할 수 있다.

```javascript
const map1 = new Map();

map1.set('0', 'foo');
map1.set(1, 'bar');

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

# Object vs Map

Map이란?

Map은 자료구조로 **key-value** 쌍으로 저장되는 형식이다.
key는 **unique**하기때문에 중복이 없다.

맵은 주로 데이터를 **fast searching and looking up** 하는데 사용된다.

Object란?

Object역시 key-value로 저장한다. object에서 **key**를 주로 **property**라고 부른다. object에서도 key는 **unique**하고 하나의 value와만 associated 돼 있다.

### Map 과 Object 차이

- Key Type
  - Object의 key type은 string,symbols,integer 밖에 안된다.
  - Map의 key type은 어떤 것이든 되고 서로 구분된다. (array,object...)
- Map은 데이터의 순서를 보존하는 반면 Object는 그렇지 않다.
- Map은 Object의 인스턴스이지만 Object는 그렇지 않다.

ex)
[`instanceof`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/instanceof) 메소드

```javascript
let myMap = new Map();
myMap.set(1, 2);
console.log(myMap instanceof Object); //true
console.log(myMap instanceof Map); //true

let obj = new Object();
console.log(obj instanceof Map); //false
```

다른 차이를 더 보자

### How to construct

**Object**

- 리터럴 방식

```javascript
let obj = {};
```

- 생성자 방식

```javascript
let obj = new Object();
//or
let obj2 = new object();
```

- Object.prototype.create 사용

```javascript
let obj = Object.create(null);
```

`Object.prototype.create` 은 생성자 없이 상속을 이용하고 싶은 특별한 상황에서만 사용합니다.

```javascript
let Vehicle = {
  type: 'General',
  show: () => console.log(this.type)
};
let Car = Object.create(Vehicle); //vehicle 상속하는 new Car
Car.type = 'Car';
//Car.type > "Car"
//Vechicel.type > "General"
```

**Map**

```javascript
let map = new Map(); //Empty Map {}
let map = new Map([
  [1, 2],
  [2, 3]
]); // map = {1=>2, 2=>3}
```

### Accessing element

- Map은 `get`이라는 메소드를 이용해서 element value에 접근한다. 우리는 element value를 검색하는 key값을 필요로 한다.
- `has` 메소드를 이용해 key값의 존재 유무를 확인할 수 있다.
- Object는 `obj.key` or `obj['key']`
- Object는 `hasOwnProperty()`을 이용해 존재유무 확인 가능

### iterable

-Map은 iterable하다. -`for of`,`forEach` 로 접근할 수 있다. `for of` 로 접근할 때 for (const [key,value] of map) 으로 해서 key,value 따로접근할 수 도 있다. `forEach`도 같다.

- Object는 `for in` 으로 접근가능하다.

참고 : https://medium.com/front-end-weekly/es6-map-vs-object-what-and-when-b80621932373
