class Model {}

class View {
  constructor() {
    this.todoList = document.getElementById("js-todoList");
    this.todoForm = document.getElementById("js-todo__form");
    this.todoItem = this.todoList.childNodes;
  }
  init() {
    this.todoForm.addEventListener("submit", this.handleSubmit);
    this.todoList.addEventListener("click", this.handleClick);
  }
  handleSubmit = ({ target }) => {
    const todo = target.todo.value;
    target.todo.value = "";
    this.addList(todo);
  };
  addList(todo) {
    const template = `<li><input type="checkbox" class="check__input"><span>${todo}</span><span class="delete__btn">❌</span></li>`;
    this.todoList.innerHTML += template;
  }
  handleClick = ({ target }) => {
    const CHECK_BOX = "check__input";
    const DELETE_BTN = "delete__btn";
    const targetClass = target.className;
    if (targetClass === CHECK_BOX) this.lineThrough(target);
    else if (targetClass === DELETE_BTN) this.deleteList(target);
  };
  lineThrough(target) {
    const todo = target.nextSibling;
    const LINE = "lineThrough";
    if (target.checked) todo.classList.add(LINE);
    else todo.classList.remove(LINE);
  }
  deleteList = (target) => {
    const li = target.parentNode;
    li.remove();
  };
}

const todoView = new View();
todoView.init();
