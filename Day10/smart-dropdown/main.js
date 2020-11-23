const dropWrapper = document.querySelector("#js-dropdown__wrapper");
const listTitle = document.querySelector("#js-list__title");
const listContainer = document.querySelector("#list__container");

const HIDDEN = "hidden";

let timeout;

dropWrapper.addEventListener("mouseenter", () => {
  timeout = setTimeout(showList, 1000);
});

dropWrapper.addEventListener("mouseleave", () => {
  clearTimeout(timeout);
  hideList();
});

function showList() {
  listContainer.classList.remove(HIDDEN);
}
function hideList() {
  listContainer.classList.add(HIDDEN);
}
