class Storage {
  constructor(storage) {
    this.storage = storage;
  }
  get(key) {
    const storageValue = this.storage.getItem(key);
    if (!storageValue) return [];
    else return JSON.parse(storageValue);
  }
  save(storageKey, parsedArray) {
    this.storage.setItem(storageKey, JSON.stringify(parsedArray));
  }
}

class Model {
  constructor(storage, storageKey) {
    this.todoArray = [];
    this.storage = storage;
    this.storageKey = storageKey;
  }
  addItem(id, todo) {
    const newTodo = { key: id, value: todo };
    this.todoArray.push(newTodo);
    this.storage.save(this.storageKey, this.todoArray);
  }
  deleteItem(id) {
    this.todoArray = this.todoArray.filter((v) => v.key !== Number(id));
    this.storage.save(this.storageKey, this.todoArray);
  }
  getTodoList() {
    this.resetTodoArray();
    return this.todoArray;
  }
  editItem(id, editedTodo) {
    this.todoArray.forEach((v) => {
      if (v.key === Number(id)) {
        v.value = editedTodo;
      }
    });
    this.storage.save(this.storageKey, this.todoArray);
  }
  resetTodoArray() {
    const parsedStorage = this.storage.get(this.storageKey);
    parsedStorage.forEach((item, idx) => (item.key = idx + 1));
    this.todoArray = parsedStorage;
    this.storage.save(this.storageKey, this.todoArray);
  }
}

class RenderTodoView {
  constructor({ todoForm, ulTodoList, todoModel }) {
    this.listId = 1;
    this.todoForm = todoForm;
    this.todoModel = todoModel;
    this.ulTodoList = ulTodoList;
  }
  init() {
    this.todoForm.addEventListener("submit", this.handleSubmit.bind(this));
  }
  handleSubmit({ target: { todo } }) {
    const todoValue = todo.value;
    todo.value = "";
    this.todoModel.addItem(this.listId, todoValue);
    this.createLi(todoValue);
  }
  createLi(todo) {
    const template = `<li id=${this.listId++}>
      <input type="checkbox" class="check__input">
      <span id='todo__text'>${todo}</span>
      <div class="list__btn">
        <i class="far fa-edit edit__btn" id="edit__btn"></i>
        <i class="fas fa-trash-alt delete__btn" id="delete__btn"></i>
      </div>
    </li>`;
    this.ulTodoList.innerHTML = template + this.ulTodoList.innerHTML;
  }
  renderTodo() {
    const todoArray = this.todoModel.getTodoList();
    todoArray.forEach((todo) => this.createLi(todo.value));
  }
}

class EventTodoView {
  constructor({ ulTodoList, todoModel }) {
    this.ulTodoList = ulTodoList;
    this.todoModel = todoModel;
  }
  init() {
    this.ulTodoList.addEventListener("click", this.handleClick.bind(this));
  }
  handleClick({ target }) {
    const CHECK_BOX = "check__input";
    const DELETE_BTN = "delete__btn";
    const EDIT_BTN = "edit__btn";
    if (target.className === CHECK_BOX) this.lineThrough(target);
    else if (target.id === DELETE_BTN) this.deleteTodo(target);
    else if (target.id === EDIT_BTN) this.editTodo(target);
  }
  lineThrough(target) {
    const todo = this.getTodoText(target);
    const LINE = "lineThrough";
    if (target.checked) todo.classList.add(LINE);
    else todo.classList.remove(LINE);
  }
  deleteTodo(target) {
    const li = this.getLi(target);
    this.todoModel.deleteItem(li.id);
    li.remove();
  }
  editTodo(target) {
    const HIDDEN = "hidden";
    target.classList.add(HIDDEN);
    const todoText = this.getTodoText(target);
    const editForm = this.createForm(todoText.innerText);
    todoText.innerHTML = editForm;
    todoText.addEventListener("submit", this.editConfirm.bind(this));
  }
  editConfirm({ target }) {
    const HIDDEN = "hidden";
    const editedTodo = target.todo.value;
    const todoText = this.getTodoText(target);
    const li = this.getLi(target);
    const editBtn = li.lastElementChild.firstElementChild;
    todoText.innerHTML = editedTodo;
    editBtn.classList.remove(HIDDEN);
    this.todoModel.editItem(li.id, editedTodo);
  }
  getLi(target) {
    return target.closest("li");
  }
  getTodoText(target) {
    const li = this.getLi(target);
    const todoText = li.firstElementChild.nextElementSibling;
    return todoText;
  }
  createForm(todo) {
    const newForm = `
      <form class="todo__edit" id="js-todo__edit" onsubmit="return false;">
        <input type="text" name="todo" value = ${todo} class="edit__input">
        <button type="submit" class="edit-confirm__btn"><i class="fas fa-check edit-confirm__icon"></i></button>
      </form>`;
    return newForm;
  }
}
function init() {
  const STORAGE_KEY = "todo";
  const todoForm = document.getElementById("js-todo__form");
  const ulTodoList = document.getElementById("js-todoList");
  const localStorage = new Storage(window.localStorage);
  const todoModel = new Model(localStorage, STORAGE_KEY);
  const todoView = new RenderTodoView({ todoForm, ulTodoList, todoModel });
  const eventTodoView = new EventTodoView({ ulTodoList, todoModel });
  todoView.renderTodo();
  todoView.init();
  eventTodoView.init();
}

init();
