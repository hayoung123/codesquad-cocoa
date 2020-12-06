# 시간 복잡도

### 시간 복잡도의 필요성

예를들어 한 배열을 탐색해 아이템의 인덱스를 찾는 것이라고 해보자

선형탐색과 이진탐색이 있다.

**선형탐색**은 배열을 모두 돌면서 확인인해 시간복잡도는 O(n) 이다.

하지만 **이진탐색**을 사용한다면 시간복잡도는 O(logN)으로 훨씬 적은 연산으로 결과를 도출해 낼 수 있다.

컴퓨팅 자원은 한정돼 있기 때문에 같은 문제임에도 시간 복잡도를 고려해 해결한다면 좋은 성능을 얻을 수 있다.

시간복잡도에는 Big O Notation 이라는 것을 사용한다.

### Big O Notation

Big-O 표기법은 점근적 상한을 의미합니다.

Big-O 표기법의 수학적정의는 이것이다.
![big-O표기법](https://user-images.githubusercontent.com/67357426/98646677-08c2da00-2377-11eb-88c3-5fea12d37596.png)

쉽게생각하자면 Big-O 표기법는 최악의 경우 일 때의 시간 복잡도라고 생각하면 편할것 같다.

Big-O 표기법에는 2가지 규칙이 있다.

> 1.  최대 차수보다 작은 차수의 항들은 생략한다.
>
> 2.  최대 차수의 계수도 생략한다.

ex) 어떤것이 O(N^2+3N)의 복잡도를 갖고 있다 하더라도 3N은 N^2이 주는 영향보다 아주 미미한 영향을 끼치기 때문에 제거하고 O(N^2)라고 표현한다.

**Big-O Complexity Chart**

Big-O 표기법의 복잡도이다.

아래에서도 보인듯이 데이터가 많아질수록 시간복잡도에 따라서 성능의 차이가 크기 때문에 유의해야 한다.

![Big-O Complexity Chart](https://miro.medium.com/max/875/1*5ZLci3SuR0zM_QlZOADv8Q.jpeg)

참고자료 : https://noahlogs.tistory.com/27

https://towardsdatascience.com/understanding-time-complexity-with-python-examples-2bda6e8158a7
