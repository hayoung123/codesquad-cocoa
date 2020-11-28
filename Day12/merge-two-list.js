/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const mergeTwoLists = (l1, l2) => {
  let linkedList = new ListNode();
  const head = linkedList;

  while (l1 !== null && l2 !== null) {
    if (l1.val < l2.val) {
      linkedList.next = new ListNode(l1.val);
      l1 = l1.next;
    } else {
      linkedList.next = new ListNode(l2.val);
      l2 = l2.next;
    }
    linkedList = linkedList.next;
  }
  if (l1 !== null) linkedList.next = l1;
  else linkedList.next = l2;

  return head.next;
};
