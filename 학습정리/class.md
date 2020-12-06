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

const kyle = new Person('kyle', ' seoul');
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

const dungii = new Dog('dungii', 7);
dungii.introduce();
dungii.bark();
```

## class에서의 상속

class에서는 super,extends를 사용해 상속을 구현시켜 놓았다.

class에서의 상속도 prototype체이닝을 이용한 방식이다.

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
  bark() {
    super.bark();
  }
}

const pome = new Animal('pome');
const dungii = new Dog('dungii', 7);
```

class에서는 메소드선언을 하면 **prototype객체**에 저장합니다.

![image](https://user-images.githubusercontent.com/67357426/99047641-d2d06080-25d7-11eb-8507-94e2214f0a61.png)

그럼이제 `Dog`의 객체인 `dungii`의 프로토타입 객체는 어떠한 모습을 갖고 있을까?

![image](https://user-images.githubusercontent.com/67357426/99047902-38bce800-25d8-11eb-963b-a59b7e28b99e.png)

사진과 같이 Animal의 **프로토타입 객체**를 Dog의 프로토타입 객체로 사용하고 있는 것을 볼 수 있다. 또한 **bark()**메소드도 super을 통해서 상속했기 때문에 **Dog의 프로토타입객체**에서도 `bark()`메소드를 확인할 수 있다.

!만약 Dog class에 `bark() {super.bark();}` 가 없었다면?

Dog의 프로토타입 객체인 `__proto__: Animal` 에 있는 bark는 사라지게 된다.

출처 : [MDN class](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)
