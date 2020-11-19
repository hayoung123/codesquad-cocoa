//storage class 사용할 storage를 인자로 받아서 사용 / local,sessionStoarge 생각하고 만든 클래스
class Storage {
  constructor(storage) {
    this.storage = storage;
  }
  get(key) {
    const storageValue = this.storage.getItem(key);
    if (!storageValue) return [];
    else return JSON.parse(storageValue);
  }
  set(storageKey, parsedArray) {
    this.storage.setItem(storageKey, JSON.stringify(parsedArray));
  }
}

//todolist를 배열로 관리하는 class
//View단에서 변경될 때마다 정보를 받아와 변경시킨다. 변경되면 storage에도 저장한다.
class Model {
  constructor(storage, storageKey) {
    this.todoArray = [];
    this.storage = storage;
    this.storageKey = storageKey;
  }
  addItem(id, todo) {
    const newTodo = { key: id, value: todo };
    this.todoArray.push(newTodo);
    this.storage.set(this.storageKey, this.todoArray);
  }
  deleteItem(id) {
    this.todoArray = this.todoArray.filter((v) => v.key !== Number(id));
    this.storage.set(this.storageKey, this.todoArray);
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
    this.storage.set(this.storageKey, this.todoArray);
  }
  resetTodoArray() {
    const parsedStorage = this.storage.get(this.storageKey);
    parsedStorage.forEach((item, idx) => (item.key = idx + 1));
    this.todoArray = parsedStorage;
    this.storage.set(this.storageKey, this.todoArray);
  }
}

// add, delete, edit, check 등의 이벤트가 일어나는 View class
class TodoView {
  constructor({ todoForm, ulTodoList, todoModel }) {
    this.listId = 1;
    this.ulTodoList = ulTodoList;
    this.todoModel = todoModel;
    this.todoForm = todoForm;
  }
  init() {
    this.todoForm.addEventListener("submit", this.handleSubmit.bind(this));
    this.ulTodoList.addEventListener("click", this.handleClick.bind(this));
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
    this.updateEditBtn(target);
    const todoText = this.getTodoText(target);
    const editForm = this.createForm(todoText.innerText);
    todoText.innerHTML = editForm;
    todoText.addEventListener("submit", this.editConfirm.bind(this));
  }
  editConfirm({ target }) {
    this.updateEditBtn(target);
    const editedTodo = target.todo.value;
    const todoText = this.getTodoText(target);
    const li = this.getLi(target);
    todoText.innerHTML = editedTodo;
    this.todoModel.editItem(li.id, editedTodo);
  }
  updateEditBtn(target) {
    const HIDDEN = "hidden";
    const editBtn = this.getEditBtn(target);
    if (editBtn.classList.contains(HIDDEN)) editBtn.classList.remove(HIDDEN);
    else editBtn.classList.add(HIDDEN);
  }
  getEditBtn(target) {
    const li = this.getLi(target);
    return li.lastElementChild.firstElementChild;
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
  renderTodo() {
    const todoArray = this.todoModel.getTodoList();
    todoArray.forEach((todo) => this.createLi(todo.value));
  }
}
/*
1. storage class를 통해 localStorage를 사용하게 하는 객체를 생성
2. todoList를 다룰 model을 생성.
  2-1. todoList가 변경 될 시 storage에 저장을 해준다.
3. View처리를 맡은 TodoView 객체생성
  3-1. 새로고침 시 model로부터 정보를 받아와 render
  3-1. form에서 제출되면 list를 추가한다.
  3-2. check,edit,delete event가 일어나면 li를 업데이트, 삭제 한다. 
  3-3. evnet 처리가 일어날 때 변경되는 데이터를 model에 넘겨준다.

?ㅁ? 새로고침 될 때 model로 부터 정보를 받아와 render한다. 
    이 과정에서 eventTodoView에 있는 createLi 메소드가 필요해 받아와서 사용하지만,,, 좋은 방법인지에 대한 의문은 있다...
    나누었었지만 다시 합쳤다. 고민이 되기 때문에 이 주석은 남겨두고 계속 생각해봐야곘다.
*/

function init() {
  const STORAGE_KEY = "todo";
  const todoForm = document.getElementById("js-todo__form");
  const ulTodoList = document.getElementById("js-todoList");
  const localStorage = new Storage(window.localStorage);
  const todoModel = new Model(localStorage, STORAGE_KEY);
  const todoView = new TodoView({ todoForm, ulTodoList, todoModel });
  todoView.renderTodo();
  todoView.init();
}

init();
