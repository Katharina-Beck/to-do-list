/* local storage */
let todos = [];
let filter = "all";

// Render todos based on the initial state
renderTodos();

function saveState() {
  // Save the current state to local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  // store filtered Todos

  const filteredTodos = todos.filter(
    (todo) =>
      filter === "all" ||
      (filter === "open" && !todo.done) ||
      (filter === "done" && todo.done)
  );

  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => toggleDone(todo.id));

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(todo.description));

    todoList.appendChild(li);
  });
  saveState();
}

function addTodo() {
  const todoInput = document.getElementById("todoInput");
  const description = todoInput.value.trim();

  if (
    description === "" ||
    todos.some(
      (todo) => todo.description.toLowerCase() === description.toLowerCase()
    )
  ) {
    alert("Please enter a valid and unique todo description.");
    return;
  }

  const newTodo = { id: Date.now(), description, done: false };
  todos.push(newTodo);

  todoInput.value = "";
  renderTodos();
}

function toggleDone(todoId) {
  const todo = todos.find((todo) => todo.id === todoId);
  if (todo) {
    todo.done = !todo.done;
    renderTodos();
  }
}

function filterTodos(selectedFilter) {
  filter = selectedFilter;
  renderTodos();
}

function removeDoneTodos() {
  todos = todos.filter((todo) => !todo.done);
  renderTodos();
}
