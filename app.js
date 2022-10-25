// ======================== Classes ========================
// Book Constructor
class Task {
  constructor(sr, task, description) {
    this.sr = sr;
    this.task = task;
    this.description = description;
  }
}

// Book Storage
class Storage {
  static getTasks() {
    if (localStorage.getItem("tasks") === null) {
      const tasks = [];
      tasks.push({
        sr: 0,
      });

      localStorage.setItem("tasks", JSON.stringify(tasks));
      return tasks;
    } else {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      return tasks;
    }
  }

  static addToArray(task, description) {
    let tasks = Storage.getTasks();

    // Adds 1 to serial number everytime new task is created
    let sr = tasks[tasks.length - 1].sr + 1;

    tasks.push(new Task(sr, task, description));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  static removeFromArray(sr) {
    let tasks = Storage.getTasks();

    // Removes the specific task from the array
    tasks.forEach((element, index) => {
      if (element.sr === Number(sr)) {
        tasks.splice(index, 1);
      }
    });

    // Resets the serial number
    for (let i = 0; i < tasks.length; i++) {
      tasks[i].sr = 0;
      tasks[i].sr = i;
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

// User Interface
class UI {
  static populateTaskList(tasks) {
    let tableBody = document.querySelector("#table-body");
    tableBody.innerHTML = "";
    tasks.shift();
    tasks.forEach((element) => {
      let tr = document.createElement("tr");

      tr.innerHTML = `
            <td>${element.sr}</td>
            <td>${element.task}</td>
            <td>${element.description}</td>
            <td> 
            <button type="button" class="btn btn-danger btn-sm del" onclick="removeTask(this)">X</button>
            </td>
            `;

      tableBody.appendChild(tr);
    });
    console.log(tasks);
  }
}

// ======================== Events ========================
// Populate book list on window load
window.onload = () => {
  let tasks = Storage.getTasks();
  UI.populateTaskList(tasks);
};

// Add Book on Enter
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Add Book on Click
function addTask() {
  let task = document.querySelector("#task").value,
    description = document.querySelector("#description").value;

  if (task === "" || description === "") {
    alert("Please fill the fields!");
  } else {
    Storage.addToArray(task, description);
    let tasks = Storage.getTasks();
    UI.populateTaskList(tasks);

    (document.querySelector("#task").value = ""),
      (document.querySelector("#description").value = "");

    console.log(tasks);
  }
}

// Remove Book on Click
function removeTask(e) {
  let tasks = Storage.getTasks();
  Storage.removeFromArray(
    // Targets the serial number of the specific task
    e.parentNode.previousElementSibling.previousElementSibling
      .previousElementSibling.textContent
  );

  tasks = Storage.getTasks();
  UI.populateTaskList(tasks);
}
