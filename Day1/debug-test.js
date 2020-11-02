//watch 예제 -  result===5
function fibonacci(n) {
  if (n < 2) return n;
  const result = fibonacci(n - 1) + fibonacci(n - 2);
  return result;
}

//call stack 확인할 때 함수에서 사용
console.log(new Error().stack);

// callstack 예제

function firstFunc() {
  secondFunc();
  console.log("first");
}

function secondFunc() {
  let a = 0;
  thirdFunc();
  console.log("second");
}

function thirdFunc() {
  console.log("third");
}

firstFunc();

//step over, step into, step out 예제

function main() {
  let s = foo();
  bar(s);
}

function foo() {
  return "hi";
}

function bar(s) {
  let t = s + foo(); // Debugger is currently here
  return console.log(t);
}

main();
