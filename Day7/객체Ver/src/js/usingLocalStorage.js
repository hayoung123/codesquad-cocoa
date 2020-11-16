const todoForm = document.getElementById("js-todo__form");
const ulTodoList = document.getElementById("js-todoList");
const TODO = "todo";
let todoArr;
let listId = 1;

class View {
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
    li.id = listId++;
    ulTodoList.prepend(li);
  }
  createDom(type, content) {
    const element = document.createElement(type);
    if (content) element.innerText = content;
    return element;
  }

  deleteTodo() {
    const li = this.parentNode;
    Model.prototype.deleteItem(li.id);
    li.remove();
  }
  strikethrough() {
    const li = this.parentNode;
    const childLi = li.childNodes;
    if (this.checked) {
      childLi[1].classList.add("strikeThrough");
    } else {
      childLi[1].classList.remove("strikeThrough");
    }
  }
  //localStorage에 없을 때 초기화 해줘야 한다.
  showList() {
    todoArr = localStorage.getItem(TODO)
      ? JSON.parse(localStorage.getItem(TODO))
      : [];
    for (let x of todoArr) {
      this.createLi(x.value);
    }
  }
}
class Model {
  //this가 event호출한 form으로 묶이기 때문에 this.메소드하면 에러남
  handleForm(event) {
    const todo = this.todo.value;
    this.todo.value = "";
    Model.prototype.addItem(listId, todo);
    View.prototype.createLi(todo);
  }
  addItem(id, todo) {
    const newTodo = { key: id, value: todo };
    todoArr.push(newTodo);
    this.saveStorage();
  }
  deleteItem(id) {
    todoArr = todoArr.filter((v) => v.key !== Number(id));
    this.saveStorage();
  }
  saveStorage() {
    localStorage.setItem(TODO, JSON.stringify(todoArr));
  }
}

View.prototype.showList();
todoForm.addEventListener("submit", Model.prototype.handleForm);
