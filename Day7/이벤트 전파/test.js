const ul = document.querySelector("ul");
const divs = document.querySelectorAll("div");

// divs.forEach((v) => v.addEventListener("click", handleClick, true));
document.body.addEventListener("click", handleClick);
divs.forEach(function (div) {
  div.addEventListener("click", handleClick, false);
});
// document.addEventListener("click", handleClick);
let i = 1;
function handleClick(event) {
  console.log(`이벤트 발생 순서: ${i++}`);
  console.log(`이벤트 타겟: ${event.target.className}`);
  console.log(`이벤트 currentTarget : ${event.currentTarget.className}`);
  console.log("-------------------------------------");
}
