bㅠ# hash table

### hash table

해쉬 테이블이란 어떠한 자료의 key값을 hash function을 통과해 나온 hash를 index에 (key-value) 저장하는 자료구조이다.

자바스크립트에서 구현할 때 배열로 하면 n차원 배열로 구현을 해야 되기 (아마?) 때문에 객체로 구현할 예정이다. 미션도 class(객체)로 구현하는 것이기도 하고

### hash table의 필요성

데이터를 찾을 때 카테로리별로 정리 돼 있는 데이터를 찾는게 더 쉽다.

hash table 역시 쭉 나열돼 있는 데이터보다 hash function을 통해 hash값을 구한 뒤 그 쪽 부분에서만 찾는게 훨씬 빠를것이다.

## hash collision (해쉬 충돌)

각 key값이 해쉬함수를 통해 해쉬값이 나왔다해도 해쉬값은 중복이 될 수 있다.

Object의 size의 값은 정해져 있기 때문에 각 bin(바구니)에 모든 데이터를 넣는다면 당연히 hash 값은 중복이 발생할 것이다.

ex)
해쉬함수가 10으로 나눈 값의 나머지라고 하자.

11의 해쉬는 1 / 21의 해쉬도 1이 나올 것이다.

이런 상황에서 각 데이터의 hash는 충돌하게 되는데 이를 해결하기 위한 여러 방법이 있다고한다.

### 1. 체이닝

각 bin 내에 Linked List를 할당해 삽입된 데이터가 해쉬 충돌을 한다면 linked list에 추가한다.

linked list에도 2가지 방법이 존재

- node에 새로운 data 연결하기
- head에 새로운 data 연결하기

#### node에 새로운 data 연결하기

1. bin 안에 있는 data를 처음부터 `node : null` 인 data까지 탐색한다.
2. data를 bin 안에 생성하고 node:null인 데이터 node에 추가하기

#### head에 새로운 data 연결하기

1. bin안에 탐색할 필요 없이 this.head(그 bin의 head)에 넣고 node에 전에 head였던 것을 추가하면된다.

> head에 새로운 data를 추가해 연결하는 것이 탐색할 시간을 없애기 때문에 더 효율적이다.
>
> 다만 insert되는 순서가 중요한 데이터는 상황이 다를 것 같다.

### 2. 개방 주소법 (open addressing)

**체이닝**은 해시 충돌이 일어나면 linked list로 이어가기 때문에 **데이터의 주소값은 변하지 않는다.** (closed Addressing)

하지만 개방 주소법은 해시 충돌이 일어나면 새로운 주소를 탐사(probe) 한 후, 비어있는 bin에 데이터를 삽입하는 방식이다.

> 선형 탐색 (Linear Probing)

해시 충돌 시 다음 , 혹은 몇개를 건너뛴 bin에 데이터를 삽입한다.

데이터가 연속되게 저장될 가능성이 높기 때문에 데이터 밀집도가 높아진다.

즉 충돌이 계속 발생하는 무한반복 사이클 `Primary Clustering` 이 발생한다.

> 제곱 탐색 (Quadratic Probing)

해시 충돌 시 제곱만큼 건너뛴 bin에 데이터를 삽입한다.

(첫번째 1 두번째 충돌 4 세번째 충돌 9 ...)

하지만 같은 해시가 계속 충돌이 날경우 똑같이 충돌이 계속 발생한다. 이것을 `이차 군집화 (Secondary Clustering)` 라한다.

> 이중 해시 (Double Hasing)

해시 충돌 시 다른 해시함수를 한번더 적용한 결과를 이용한다.

참조 :
https://evan-moon.github.io/2019/06/25/hashtable-with-js/

https://preamtree.tistory.com/20#:~:text=%EA%B0%9C%EB%B0%A9%20%EC%A3%BC%EC%86%8C%EB%B2%95(Open%20Addressing,%EC%A3%BC%EC%86%8C%EA%B0%92%EC%9D%80%20%EB%B0%94%EB%80%8C%EC%A7%80%20%EC%95%8A%EB%8A%94%EB%8B%A4.
