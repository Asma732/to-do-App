const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Page khulte hi purane tasks load karein
let tasks = JSON.parse(localStorage.getItem("myTodoTasks")) || [];
renderTasks();

// Tasks ko browser ki localStorage mein save karne ka function
function saveTasks() {
  localStorage.setItem("myTodoTasks", JSON.stringify(tasks));
}

// Naya task add karne ka function
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({
    text: text,
    done: false
  });

  saveTasks();
  renderTasks();
  taskInput.value = "";
}

// Screen par tasks dikhane ka function
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) {
      li.classList.add("done");
    }

    const span = document.createElement("span");
    span.textContent = task.text;

    // Click karne par complete/uncomplete ho aur save bhi ho
    span.addEventListener("click", function () {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    });

    // Delete button dabane par task hate aur save bhi ho
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});