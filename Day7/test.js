class Event {
  init() {
    div.addEventListener("click", this.sayThis);
    div.addEventListener("click", this.sayThat);
    div.addEventListener("click", this.useBind.bind(this, 1, 2, 3, 4));
  }
  sayThis() {
    console.log("함수 선언식", this); // div
  }
  sayThat = () => {
    console.log("화살표 함수", this); //Event
  };
  useBind() {
    console.log("함수 선언식 with bind", this); //Event
    console.log(arguments);
    console.log(event.target);
  }
}
const div = document.querySelector("div");

const kkk = new Event();
kkk.init();
