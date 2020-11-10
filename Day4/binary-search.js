//array가 정렬돼 있는 상태에서 item이 어느 index에 위치하는지
//이진 검색으로 찾는 것

function binarySearch(arr, item) {
  let start = 0;
  let end = arr.length - 1;

  arr.sort((a, b) => a - b);

  while (start <= end) {
    let mid = Math.ceil(start + end / 2);
    if (arr[mid] === item) {
      return mid;
    } else if (arr[mid] > item) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
}

let arr = [23, 87, 65, 12, 57, 32, 99, 81];
let item = 32;

console.log(binarySearch(arr, item));
