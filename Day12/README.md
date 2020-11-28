# leetcode

[two -sum](https://leetcode.com/problems/two-sum/solution/)
[reverse-integer](https://leetcode.com/problems/reverse-integer/submissions/)
[roman-to-integer](https://leetcode.com/problems/roman-to-integer/)
[longest-common-prefix](https://leetcode.com/problems/longest-common-prefix/)

## [merge-two-sorted-lists](https://leetcode.com/problems/merge-two-sorted-lists/)

처음에 list형태여서 concat으로 붙이면 될 것이라 생각했는데 눈에 보기에만 list였을 뿐이고 실제로는 객체였다.

1. `let listNode = new ListNode()`생성 & 변수 head를 만들어 Listnode를 참조해 놓고 마지막 출력에서 이용
2. l1,l2가 null이 아닐때 돈다. 크기 비교 후 new ListNode(~~.val) 로 새로운 객체를 만들어 `listNode.next`에 추가
3. l1 또는 l2 , listNode.next 다시 설정
4. 둘 중 하나는 길이가 남아있을 것이기 때문에 마지막에 뒤에 다 붙여준다.
5. 처음 참조했던 head.next를 반환
