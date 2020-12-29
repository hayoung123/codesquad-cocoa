// const elems = document.querySelectorAll("*");
// elems.forEach((v) => {
//   v.addEventListener("click", handleClick, false);
//   v.addEventListener("click", handleClick);
// });
// const first = document.querySelector(".first");
// first.removeEventListener("click", handleClick);
// first.removeEventListener("click", handleClick, true);
// let i = 1;
// function handleClick(event) {
//   event.preventDefault();
//   console.log(`이벤트 발생 순서: ${i++}`);
//   console.log(`이벤트 타겟: ${event.target.className}`);
//   console.log(`이벤트 currentTarget : ${event.currentTarget.className}`);
//   console.log("-------------------------------------");
// }

// const a = document.querySelector("a");
// a.addEventListener("contextmenu", handler);
// document.addEventListener("contextmenu", documentContext);
// function handler(event) {
//   event.preventDefault();
//   console.log("click handler");
// }

// function documentContext(event) {
//   if (event.defaultPrevented) return;
//   else {
//     event.preventDefault();
//     console.log(event.defaultPrevented);
//     console.log("document");
//   }
// }

const first = document.querySelector('.first');
const second = document.querySelector('.second');
const third = document.querySelector('.third');

first.addEventListener(
  'click',
  (event) => {
    event.stopPropagation();
    console.log('first');
  },
  true
);
second.addEventListener('click', () => {
  console.log('second');
});
third.addEventListener('click', () => {
  console.log('third');
});
