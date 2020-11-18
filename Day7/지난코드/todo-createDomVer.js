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
  resetTodoArray() {
    const stringStorage = localStorage.getItem(this.storageKey);
    const parsedStorage = JSON.parse(stringStorage);
    parsedStorage.forEach((item, idx) => (item.key = idx + 1));
    this.todoArray = parsedStorage;
    this.saveStorage();
  }
}
class View {
  constructor(todoForm, todoList, todoModel) {
    this.listId = 1;
    this.todoForm = todoForm;
    this.todoList = todoList;
    this.todoModel = todoModel;
  }
  init() {
    this.todoForm.addEventListener("submit", this.handleSubmit);
  }
  handleSubmit = ({ target }) => {
    const todo = target.todo.value;
    target.todo.value = "";
    this.todoModel.addItem(this.listId, todo);
    this.createLi(todo);
  };
  createLi(todo) {
    const li = this.createDom("li");
    const checkBox = this.createDom("input");
    const deleteBtn = this.createDom("span", "❌");
    const text = this.createDom("span", todo);
    checkBox.type = "checkbox";
    checkBox.addEventListener("input", this.strikethrough);
    deleteBtn.addEventListener("click", this.deleteTodo);
    li.appendChild(checkBox);
    li.appendChild(text);
    li.appendChild(deleteBtn);
    li.id = this.listId++;
    this.todoList.prepend(li);
  }
  createDom(type, content) {
    const element = document.createElement(type);
    if (content) element.innerText = content;
    return element;
  }

  deleteTodo = ({ target }) => {
    const li = target.parentNode;
    this.todoModel.deleteItem(li.id);
    li.remove();
  };
  strikethrough = ({ target }) => {
    const LINE_THROUGH = "lineThrough";
    const spanTodo = target.nextSibling;
    if (target.checked) {
      spanTodo.classList.add(LINE_THROUGH);
    } else {
      spanTodo.classList.remove(LINE_THROUGH);
    }
  };
  renderList() {
    const todoArray = this.todoModel.getTodoList();
    for (let x of todoArray) {
      this.createLi(x.value);
    }
  }
}

function init() {
  const todoList = document.getElementById("js-todoList");
  const todoForm = document.getElementById("js-todo__form");
  const todoModel = new Model("todo");
  const todoView = new View(todoForm, todoList, todoModel);
  todoView.renderList();
  todoView.init();
}
init();
