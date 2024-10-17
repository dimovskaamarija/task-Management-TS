/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/ts/main.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
const containers = document.querySelectorAll(".container-item");
const addTaskButton = document.getElementById("addTaskButton");
const input = document.getElementById("addInput");
const todo = document.getElementById("toDoList");
const inProgress = document.getElementById("inProgressList");
const done = document.getElementById("doneList");
let tasks = {
    todo: [],
    inProgress: [],
    done: []
};
function loadContent() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    tasks.todo.forEach(task => addNewTask(task, todo));
    tasks.inProgress.forEach(task => addNewTask(task, inProgress));
    tasks.done.forEach(task => addNewTask(task, done));
}
function saveTasks() {
    tasks.todo = Array.from(document.querySelectorAll("#toDoList .task")).map((task) => task.textContent?.replace("Delete", "").trim() || "").map(taskName => ({
        id: Math.random().toString(36),
        taskName,
        state: 'todo'
    }));
    tasks.inProgress = Array.from(document.querySelectorAll("#inProgressList .task")).map((task) => task.textContent?.replace("Delete", "").trim() || "").map(taskName => ({
        id: Math.random().toString(36),
        taskName,
        state: 'inProgress'
    }));
    tasks.done = Array.from(document.querySelectorAll("#doneList .task")).map((task) => task.textContent?.replace("Delete", "").trim() || "").map(taskName => ({
        id: Math.random().toString(36),
        taskName,
        state: 'done'
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function addNewTask(task, list) {
    const newTask = document.createElement("li");
    newTask.classList.add("task");
    newTask.setAttribute("draggable", "true");
    newTask.innerHTML = task.taskName;
    const btn = document.createElement("button");
    btn.classList.add("btnDelete");
    btn.innerText = "Delete";
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        newTask.remove();
        saveTasks();
    });
    newTask.appendChild(btn);
    newTask.addEventListener("dragstart", () => {
        newTask.classList.add("dragStyle");
    });
    newTask.addEventListener("dragend", () => {
        newTask.classList.remove("dragStyle");
    });
    list.appendChild(newTask);
}
addTaskButton.addEventListener("click", (e) => {
    e.preventDefault();
    const value = input.value.trim().toString();
    if (!value) {
        return;
    }
    const newTask = {
        id: Math.random().toString(36),
        taskName: value,
        state: 'todo'
    };
    addNewTask(newTask, todo);
    tasks.todo.push(newTask);
    saveTasks();
    input.value = "";
});
containers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
        e.preventDefault();
    });
    container.addEventListener("drop", (e) => {
        e.preventDefault();
        const draggedElement = document.querySelector(".dragStyle");
        if (draggedElement) {
            const newList = container.querySelector("ul");
            newList?.appendChild(draggedElement);
            const taskName = draggedElement.textContent?.replace("Delete", "").trim() || "";
            const newState = container.id === "toDoList" ? "todo" :
                container.id === "inProgressList" ? "inProgress" : "done";
            const taskToUpdate = tasks[newState].find(task => task.taskName === taskName);
            if (taskToUpdate) {
                taskToUpdate.state = newState;
            }
            saveTasks();
        }
    });
});
loadContent();


/******/ })()
;
//# sourceMappingURL=main.bundle.js.map