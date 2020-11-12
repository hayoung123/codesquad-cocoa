const ArrayInfo = require("./dataTree-recursion");
const { filterBraceNuM } = require("./filterData");

//올바른 데이터 check & value
function checkArr(str) {
  const stack = [];
  const value = [];
  let maxDepth = 0;
  let depth = 0;
  let data = filterBraceNuM(str);
  for (let x of data) {
    if (x === "[") {
      stack.push("[");
      depth++;
      maxDepth = maxDepth < depth ? depth : maxDepth;
    } else if (x === "]") {
      if (stack.pop() === "[") {
        depth--;
      } else {
        console.log("잘못된 정보입니다.");
        return false;
      }
    } else {
      value.push(x);
    }
  }
  if (stack.length) {
    console.log("잘못된 정보입니다.");
    return true;
  } else {
    console.log(
      `깊이 수준은 ${maxDepth}이며, 총 ${value.length}개의 원소가 포함되어 있습니다.`
    );
    return false;
  }
}
function run(data) {
  checkArr(data);
  const a = new ArrayInfo(data);
  a.run();
  console.log(JSON.stringify(a.dataTree, null, "\t"));
}

console.log("-----------------Test Case---------------");
// console.log("[1,2,[3,4,[5,[6]]]]");
// run("[1,2,[3,4,[5,[6]]]]");
run("[1,'ab',[3,4,[5,[6]]]]");
// console.log("[1,2,[3,4,[5,[6]]");
// run("[1,2,[3,4,[5,[6]]");
