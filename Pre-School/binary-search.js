/*
binary는 오름차순으로 정렬이 돼 있는 상태에서만 사용가능하다.
절반을 잘라서 비교하고 남은 절반에서만 검사를 해나아 가는 것는 것을 이진검색이라한다.

그리고 start,end값 까지 총 4개의 파라미터가 들어와야 된다는 것도 별로인 점 같다.
*/

const binarySearch = (arr, start, end, target) => {
  //다 탐색해도 값이 없는 것이기 때문에 -1리턴
  if (start > end) return -1;
  //start,end의 중앙 값
  const mid = Math.floor((end + start) / 2);
  if (arr[mid] === target) return mid;
  else if (arr[mid] > target) {
    //mid보다 작은 쪽에 있다는 뜻
    return binarySearch(arr, start, mid - 1, target);
  } else {
    //mid보다 큰 쪽에 있다는 뜻
    return binarySearch(arr, mid + 1, end, target);
  }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const findIdx = binarySearch(arr, 0, arr.length - 1, 9);
console.log(findIdx);
