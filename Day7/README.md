# 버블링, 캡처링

# Local Storage

localStorage는 sessionStorage와 비슷하지만, localStorage의 데이터는 만료지않고 sessionStorage의 데이터는 페이지세션이 끝날 때, 즉 페이지를 닫을 때 사라진다. (시크릿 창에서 localStorage는 페이지를 닫으면 삭제된다.)

localStorage에 저장한 자료는 **페이지 프로토콜** 별로 구분한다. **HTTP** 와 **HTTPS** 은 서로 다른 localStorage를 갖는다.

### 구문

> const myStorage = window.localStorage

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

참조 : [MDN (localStorage)](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)

# HTTP vs HTTPS
