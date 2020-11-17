const todoForm = document.getElementById("js-todo__form");
const ulTodoList = document.getElementById("js-todoList");
let listId = 1;

class View {
  createLi(todo) {
    const li = this.createDom("li");
    const checkBox = this.createDom("input");
    checkBox.type = "checkbox";
    checkBox.addEventListener("input", this.strikethrough);
    const deleteBtn = this.createDom("span", "❌");
    deleteBtn.addEventListener("click", this.deleteTodo);
    const text = this.createDom("span", todo);
    li.appendChild(checkBox);
    li.appendChild(text);
    li.appendChild(deleteBtn);
    li.id = listId++;
    ulTodoList.appendChild(li);
  }
  createDom(type, content) {
    const element = document.createElement(type);
    if (content) element.innerText = content;
    return element;
  }
  deleteTodo() {
    const li = this.parentNode;
    li.remove();
  }
  strikethrough() {
    const li = this.parentNode;
    const todo = li.childNodes[1];
    if (this.checked) {
      todo.classList.add("strikeThrough");
    } else {
      todo.classList.remove("strikeThrough");
    }
  }
}
class Model {
  addItem(event) {
    event.preventDefault();
    const todo = this.todo.value;
    this.todo.value = "";
    View.prototype.createLi(todo);
  }
}

function init() {
  todoForm.addEventListener("submit", Model.prototype.addItem);
}
init();
