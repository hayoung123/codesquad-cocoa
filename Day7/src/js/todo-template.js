class Model {
  constructor(storageKey) {
    this.todoArray = [];
    this.storageKey = storageKey;
  }
  addItem(id, todo) {
    const newTodo = { key: id, value: todo };
    this.todoArray.push(newTodo);
    this.saveStorage();
  }
  deleteItem(id) {
    this.todoArray = this.todoArray.filter((v) => v.key !== Number(id));
    this.saveStorage();
  }
  saveStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.todoArray));
  }
  getTodoList() {
    this.resetTodoArray();
    return this.todoArray;
  }
  editItem(id, editedTodo) {
    this.todoArray.forEach((v) => {
      if (v.key === Number(id)) {
        v.value = editedTodo;
        return;
      }
    });
    this.saveStorage();
  }
  resetTodoArray() {
    let stringStorage = localStorage.getItem(this.storageKey);
    if (stringStorage === null) stringStorage = "[]";
    const parsedStorage = JSON.parse(stringStorage);
    parsedStorage.forEach((item, idx) => (item.key = idx + 1));
    this.todoArray = parsedStorage;
    this.saveStorage();
  }
}
class TodoView {
  constructor({ todoModel }) {
    this.listId = 1;
    this.todoForm = document.getElementById("js-todo__form");
    this.todoList = document.getElementById("js-todoList");
    this.todoModel = todoModel;
  }
  init() {
    this.todoForm.addEventListener("submit", this.handleSubmit);
    this.todoList.addEventListener("click", this.handleClick, false);
  }
  handleSubmit = ({ target: { todo } }) => {
    const todoValue = todo.value;
    todo.value = "";
    this.todoModel.addItem(this.listId, todoValue);
    this.createLi(todoValue);
  };
  createLi(todo) {
    const template = `<li id=${this.listId++}>
      <input type="checkbox" class="check__input">
      <span id='todo__text'>${todo}</span>
      <div class="list__btn">
        <i class="far fa-edit edit__btn" id="edit__btn"></i>
        <i class="fas fa-trash-alt delete__btn" id="delete__btn"></i>
      </div>
    </li>`;
    this.todoList.innerHTML = template + this.todoList.innerHTML;
  }
  handleClick = ({ target }) => {
    const CHECK_BOX = "check__input";
    const DELETE_BTN = "delete__btn";
    const EDIT_BTN = "edit__btn";
    if (target.className === CHECK_BOX) this.lineThrough(target);
    else if (target.id === DELETE_BTN) this.deleteTodo(target);
    else if (target.id === EDIT_BTN) this.editTodo(target);
  };
  lineThrough(target) {
    const todo = target.nextSibling;
    const LINE = "lineThrough";
    if (target.checked) todo.classList.add(LINE);
    else todo.classList.remove(LINE);
  }
  deleteTodo(target) {
    const li = target.parentNode.parentNode;
    console.log(li);
    this.todoModel.deleteItem(li.id);
    li.remove();
  }
  editTodo(target) {}
  renderTodo() {
    const todoArray = this.todoModel.getTodoList();
    for (let x of todoArray) {
      this.createLi(x.value);
    }
  }
}

function init() {
  const todoModel = new Model("todo");
  const todoView = new TodoView({ todoModel });
  todoView.renderTodo();
  todoView.init();
}
init();
