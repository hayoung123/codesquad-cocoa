const elems = document.querySelectorAll("*");
elems.forEach((v) => {
  v.addEventListener("click", handleClick, true);
  v.addEventListener("click", handleClick);
});
const first = document.querySelector(".first");
first.removeEventListener("click", handleClick);
first.removeEventListener("click", handleClick, true);
let i = 1;
function handleClick(event) {
  console.log(`이벤트 발생 순서: ${i++}`);
  console.log(`이벤트 타겟: ${event.target.className}`);
  console.log(`이벤트 currentTarget : ${event.currentTarget.className}`);
  console.log("-------------------------------------");
}
