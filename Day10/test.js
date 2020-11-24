function kk({ num1, num2 }, num) {
  console.log(arguments);
  console.log(`num: ${num}`);
  console.log(num1);
  console.log(num2);
  console.log(num1 + num2);
}

// let num = 3;

// let num1 = 1;
// let num2 = 2;
//   const a = { num1, num2 };
//   kk(a, 1);

const [num1, num2] = [1, 2];
console.log(num1);
console.log(num2);
