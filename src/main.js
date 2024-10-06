"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var containers = document.querySelectorAll(".container-item");
var addTaskButton = document.getElementById("addTaskButton");
var input = document.getElementById("addInput");
var todo = document.getElementById("toDoList");
var inProgress = document.getElementById("inProgressList");
var done = document.getElementById("doneList");
var tasks = {
    todo: [],
    inProgress: [],
    done: []
};
function loadContent() {
    var storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    tasks.todo.forEach(function (task) { return addNewTask(task, todo); });
    tasks.inProgress.forEach(function (task) { return addNewTask(task, inProgress); });
    tasks.done.forEach(function (task) { return addNewTask(task, done); });
}
function saveTasks() {
    tasks.todo = Array.from(document.querySelectorAll("#toDoList .task")).map(function (task) { var _a; return ((_a = task.textContent) === null || _a === void 0 ? void 0 : _a.replace("Delete", "").trim()) || ""; }).map(function (taskName) { return ({
        id: Math.random().toString(36),
        taskName: taskName,
        state: 'todo'
    }); });
    tasks.inProgress = Array.from(document.querySelectorAll("#inProgressList .task")).map(function (task) { var _a; return ((_a = task.textContent) === null || _a === void 0 ? void 0 : _a.replace("Delete", "").trim()) || ""; }).map(function (taskName) { return ({
        id: Math.random().toString(36),
        taskName: taskName,
        state: 'inProgress'
    }); });
    tasks.done = Array.from(document.querySelectorAll("#doneList .task")).map(function (task) { var _a; return ((_a = task.textContent) === null || _a === void 0 ? void 0 : _a.replace("Delete", "").trim()) || ""; }).map(function (taskName) { return ({
        id: Math.random().toString(36),
        taskName: taskName,
        state: 'done'
    }); });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function addNewTask(task, list) {
    var newTask = document.createElement("li");
    newTask.classList.add("task");
    newTask.setAttribute("draggable", "true");
    newTask.innerHTML = task.taskName;
    var btn = document.createElement("button");
    btn.classList.add("btnDelete");
    btn.innerText = "Delete";
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        newTask.remove();
        saveTasks();
    });
    newTask.appendChild(btn);
    newTask.addEventListener("dragstart", function () {
        newTask.classList.add("dragStyle");
    });
    newTask.addEventListener("dragend", function () {
        newTask.classList.remove("dragStyle");
    });
    list.appendChild(newTask);
}
addTaskButton.addEventListener("click", function (e) {
    e.preventDefault();
    var value = input.value.trim();
    if (!value)
        return;
    var newTask = {
        id: Math.random().toString(36),
        taskName: value,
        state: 'todo'
    };
    addNewTask(newTask, todo);
    tasks.todo.push(newTask);
    saveTasks();
    input.value = "";
});
containers.forEach(function (container) {
    container.addEventListener("dragover", function (e) {
        e.preventDefault();
    });
    container.addEventListener("drop", function (e) {
        var _a;
        e.preventDefault();
        var draggedElement = document.querySelector(".dragStyle");
        if (draggedElement) {
            (_a = container.querySelector("ul")) === null || _a === void 0 ? void 0 : _a.appendChild(draggedElement);
            saveTasks();
        }
    });
});
loadContent();
