function checkArr(str) {
  const stack = [];
  const value = [];
  let maxDepth = 0;
  let depth = 0;
  for (let x of str) {
    if (x === "[") {
      stack.push("[");
      depth++;
      maxDepth = maxDepth < depth ? depth : maxDepth;
    } else if (x === "]") {
      if (stack[stack.length - 1] === "[") {
        stack.pop();
        depth--;
      } else return "닫는 괄호가 일치하지 않습니다";
    } else if (x === ",") continue;
    else {
      value.push(x);
    }
  }
  if (stack.length) return "닫는 괄호가 일치하지 않습니다";
  else
    return `깊이 수준은 ${maxDepth}이며, 총 ${value.length}개의 원소가 포함되어 있습니다.`;
}

console.log(checkArr("[1,2,[3,4,[5,[6]]]]"));
console.log(checkArr("[1,2,[3,4,[5,[6]]"));
