const todoForm = document.getElementById("js-todo__form");
const ulTodoList = document.getElementById("js-todoList");

let listId = 1;

function addList(event) {
  event.preventDefault();
  const todo = this.todo.value;
  this.todo.value = "";
  viewMakeLi(todo);
}

function viewMakeLi(todo) {
  const li = document.createElement("li");
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.addEventListener("input", strikethrough);
  const deleteBtn = document.createElement("span");
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", deleteTodo);
  const text = document.createElement("span");
  text.innerText = todo;
  li.appendChild(checkBox);
  li.appendChild(text);
  li.appendChild(deleteBtn);
  li.id = listId++;
  ulTodoList.appendChild(li);
}

function strikethrough(event) {
  if (event.target.checked) {
    const li = event.target.parentNode;
    li.classList.add("middleLine");
  } else {
    const li = event.target.parentNode;
    li.classList.remove("middleLine");
  }
}

function deleteTodo(event) {
  const li = event.target.parentNode;
  console.log(li);
  li.remove();
  //   const liId = li.id;
  //   const ul = li.parentNode;
}

function init() {
  todoForm.addEventListener("submit", addList, false);
}

init();
