//거의 뷰
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
    if (this.checked) {
      const li = this.parentNode;
      li.classList.add("strikeThrough");
    } else {
      const li = this.parentNode;
      li.classList.remove("strikeThrough");
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

//-----------------------------------------------------------------------
// 배열 이용 시도

// const todoForm = document.getElementById("js-todo__form");
// const ulTodoList = document.getElementById("js-todoList");
// let todoList = [];
// let listId = 1;

// class View {
//   createLi(id, todo) {
//     const li = document.createElement("li");
//     const checkBox = document.createElement("input");
//     checkBox.type = "checkbox";
//     checkBox.addEventListener("input", this.strikethrough);
//     const deleteBtn = document.createElement("span");
//     deleteBtn.innerText = "❌";
//     deleteBtn.addEventListener("click", this.deleteTodo);
//     const text = document.createElement("span");
//     text.innerText = todo;
//     li.appendChild(checkBox);
//     li.appendChild(text);
//     li.appendChild(deleteBtn);
//     li.id = id;
//     ulTodoList.appendChild(li);
//   }
//   completeList(todoList) {
//     const liIdList = ulTodoList.childNodes.map((v) => v.id);
//     todoList.forEach((v) => {
//       if (!liIdList.includes(v.key)) {
//         createLi(v.id, v.content);
//       }else if()
//     });
//   }
//   deleteTodo() {
//     const li = this.parentNode;
//     Model.prototype.deleteItem(li.id);
//     li.remove();
//   }
//   strikethrough() {
//     if (this.checked) {
//       const li = this.parentNode;
//       li.classList.add("strikeThrough");
//     } else {
//       const li = this.parentNode;
//       li.classList.remove("strikeThrough");
//     }
//   }
// }
// class Model {
//   addItem(event) {
//     event.preventDefault();
//     const todo = this.todo.value;
//     this.todo.value = "";
//     let newId = listId++;
//     todoList.push({ key: newId, content: todo });
//     View.prototype.completeList(todo);
//   }
//   deleteItem(li) {
//     todoList = todoList.filter((v) => v.key !== li.id);
//   }
// }

// function init() {
//   todoForm.addEventListener("submit", Model.prototype.addItem);
// }
// init();
