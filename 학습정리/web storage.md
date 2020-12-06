# Local Storage 와 sessionStorage

웹 스토리지 객체 localStorage와 sessionStorage는 브라우저 내에 키-값 쌍을 저장할 수있다.

localStorage는 sessionStorage와 비슷하지만, localStorage의 데이터는 만료지않고 sessionStorage의 데이터는 페이지세션이 끝날 때, 즉 페이지를 닫을 때 사라진다. (시크릿 창에서 localStorage는 페이지를 닫으면 삭제된다.)

localStorage와 sessionStorage에 저장한 자료는 **페이지 프로토콜** 별로 구분한다. **HTTP** 와 **HTTPS** 은 서로 다른 localStorage를 갖는다.

"쿠키를 이용해 브라우저에 저장할 수 있지만 localStorage와 sessionStorage를 사용하는이유"

- 웹스토리지는 네트워크 요청시 서버로 전송 되지 않는다.
  -> 쿠키보다 더 많은 자료를 보관가능해진다.
- 서버가 HTTP헤더를 통해 스토리지 객체를 조작할 수 없다.
- 웹 스토리지 객체는 **도메인**,**프로토콜**,**포트**로 정의되는 `오리진`(origin)에 묶여있다.
  -> 프로토콜과 서브 도메인이 다르면 데이터에 접근할 수 없다.

### 구문 & 메소드

> const myStorage = window.localStorage

> const myStorage = window.sessionStorage

- localStorage는 객체 형태로 이루어져있다.
- key-value 값을 저장할 수 있다.
- `clear()`, `,`, ``, `key(index)`
- 일반 객체처럼 myStorage.key=value 라고 해도 저장된다.
- setItem에 존재하는 key 값을 입력하면 value 값을 변경한다.

### localStorage 메소드

#### myStorage.clear()

myStorage를 초기화한다.

#### myStorage.setItem('key','value')

myStorage에 **key-value 값을 저장**한다.

#### myStorage.getItem('key')

myStorage에 key에 대응하는 **value값을 리턴**한다.

#### myStorage.removeItem('key')

myStorage에 key에 대응하는 **key-value 값을 삭제**한다.

#### myStorage.key(index)

localStorage는 `setItem`으로 데이터가 입력된 순서를 기억하는 듯 하다. 그 순서를 index로 저장해 `key()` 메소드를 이용해 그 **인덱스**에 있는 **key 값을 리턴**한다.

### 순회 및 특징

`localStorage`는 iterable 객체가 아니기 때문에 `for문`에서 `key()`메소드를 이용해 반복할 수 있다.

`for in`으로도 가능하지만, 필요하지 않은 내장 필드 까지 출력된다. `hasOwnProperty`를 이용해서 filter한 후에 사용해야한다. `Object.keys()`메소드를 이용해서도 가능하다.

`localStorage`의 key-value 값은 항상 문자열이어야 한다. 숫자는 자동으로 문자열로 변경 되지만 object 경우 `JSON.Stringify`를 사용하고 js에서 사용할 때는 `JSON.parse` 해주어야 한다.

### 이벤트

`setItem`, `getItem`, `clear` 를 호출할 때 이벤트가 발생한다.

참조 : [MDN (localStorage)](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)

        https://ko.javascript.info/localstorage
