let todoInput = document.querySelector(".todo-input");
let todoBtn = document.querySelector(".todo-btn");
let todoList = document.querySelector(".todo-list");
let filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getTodos);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteChecked);
filterOption.addEventListener("click", filterTodo);

function addTodo(event) {
     event.preventDefault();
     let todoDiv = document.createElement("div");
     todoDiv.classList.add("todo");

     let newTodo = document.createElement("li");
     newTodo.innerHTML = todoInput.value;

     saveLocalTodos(todoInput.value);

     newTodo.classList.add("todo-item");
     todoDiv.appendChild(newTodo);

     let completeButton = document.createElement("button");
     completeButton.innerHTML = `<i class="fas fa-check"></i>`;
     completeButton.classList.add("complete");
     todoDiv.appendChild(completeButton);

     let deleteButton = document.createElement("button");
     deleteButton.innerHTML = `<i class = "fas fa-trash"></i>`;
     deleteButton.classList.add("trash");
     todoDiv.appendChild(deleteButton);

     todoList.appendChild(todoDiv);
     todoInput.value = " ";
}
function deleteChecked(e) {
     let item = e.target;
     if (item.classList[0] === "trash") {
          let todo = item.parentElement;
          todo.classList.add("fall");
          removeLocalTodos(todo);
          todo.addEventListener("transitionend", function () {
               todo.remove();
          });
     }

     if (item.classList[0] === "complete") {
          let todo = item.parentElement;
          todo.classList.toggle("complete");
     }
}

function filterTodo(event) {
     let todo = todoList.childNodes;
     todo.forEach(function (todo) {
          switch (event.target.value) {
               case "all":
                    todo.style.display = "flex";
                    break;
               case "completed":
                    if (todo.classList.contains("complete")) {
                         todo.style.display = "flex";
                    } else {
                         todo.style.display = "none";
                    }
                    break;
               case "uncompleted":
                    if (!todo.classList.contains("complete")) {
                         todo.style.display = "flex";
                    } else {
                         todo.style.display = "none";
                    }
          }
     });
}

function saveLocalTodos(data) {
     let todos;
     if (localStorage.getItem("todos") === null) {
          todos = [];
     } else {
          todos = JSON.parse(localStorage.getItem("todos"));
     }
     todos.push(data);
     localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
     // console.log("Hi");
     let todos;
     if (localStorage.getItem("todos") === null) {
          todos = [];
     } else {
          todos = JSON.parse(localStorage.getItem("todos"));
     }
     todos.forEach(function (data) {
          let todoDiv = document.createElement("div");
          todoDiv.classList.add("todo");

          let newTodo = document.createElement("li");
          newTodo.innerText = data;
          newTodo.classList.add("todo-item");
          todoDiv.appendChild(newTodo);

          let completeButton = document.createElement("button");
          completeButton.innerHTML = `<i class="fas fa-check"></i>`;
          completeButton.classList.add("complete");
          todoDiv.appendChild(completeButton);

          let deleteButton = document.createElement("button");
          deleteButton.innerHTML = `<i class = "fas fa-trash"></i>`;
          deleteButton.classList.add("trash");
          todoDiv.appendChild(deleteButton);

          todoList.appendChild(todoDiv);
     });
}
function removeLocalTodos(data) {
     let todos;
     if (localStorage.getItem("todos") === null) {
          todos = [];
     } else {
          todos = JSON.parse(localStorage.getItem("todos"));
     }
     let dataIndex = data.children[0].innerText;
     console.log(todos.indexOf(dataIndex));
     todos.splice(todos.indexOf(dataIndex), 1);
     localStorage.setItem("todos", JSON.stringify(todos));
}
