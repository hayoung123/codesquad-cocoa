function solution(board, moves) {
  const stack = [];
  let cnt = 0;
  for (let move of moves) {
    for (let x of board) {
      if (x[move - 1]) {
        if (stack[stack.length - 1] === x[move - 1]) {
          cnt += 2;
          stack.pop();
        } else stack.push(x[move - 1]);
        x[move - 1] = 0;
        break;
      }
    }
  }
  return cnt;
}
