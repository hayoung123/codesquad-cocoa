class Node {
  constructor(type = "root", value) {
    if (value) {
      this.type = type;
      this.value = value;
      this.child = [];
    } else {
      this.type = type;
      this.child = [];
    }
  }
}

function solution(str) {
  let stack = 0;
  const data = new Node("root");
  data.child.push(run(str));
  return data;
}
//root에 맨 마지막에 넣는거야
//즉 stack.lenght===0일때
function run(stack, str, nowData, i = 0, data) {
  if (i === str.length) return data;
  else {
    if (str[i] === "]") {
      data.push(nowData);
      run(stack, str, data, i);
    }
  }
}

solution("[1,[2,[3],[4]],[5]]");
