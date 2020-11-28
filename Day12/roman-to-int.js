function romanToInt(str) {
  const roman = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  const arr = str.split("").map((v) => roman[v]);
  const stack = [];
  arr.forEach((v) => {
    if (stack[stack.length - 1] < v) {
      const minus = stack.pop();
      stack.push(minus * -1);
    }
    stack.push(v);
  });
  return stack.reduce((a, b) => a + b, 0);
}
