// function plus() {
//   let a = 1;
//   setTimeout(() => console.log(++a), 1000);
//   return a;
// }

// const result = plus();
// console.log("result :", result); //?

// const baseData = [1, 2, 3, 4, 5, 6, 100];

// const asyncRun = (arr, fn) => {
//   arr.forEach((v, i) => {
//     setTimeout(() => {
//       setTimeout(() => {
//         console.log("cb 2");
//         fn(i);
//       }, 1000);
//       console.log("cb 1");
//     }, 1000);
//   });
// };

// asyncRun(baseData, (idx) => console.log(idx));

// setTimeout(() => console.log("hello1"), 1000);
// setTimeout(() => console.log("hello2"), 1000);
// setTimeout(() => console.log("hello3"), 1000);
// setTimeout(() => console.log("hello4"), 1000);

// const first = document.getElementById("1");
// first.addEventListener("mouseover", () => {
//   setTimeout(() => console.log("hello"), 1);
// });

// console.log(1);
// setTimeout(() => console.log(2), 1000);
// console.log(3);

const baseData = [1, 2, 3, 4, 5, 6, 100];

const asyncRun = (arr, fn) => {
  arr.forEach((v, i) => {
    setTimeout(() => {
      setTimeout(() => {
        console.log("cb 2");
        fn(i);
      }, 1000);
      console.log("cb 1");
    }, 1000);
  });
};

asyncRun(baseData, (idx) => console.log(idx));
