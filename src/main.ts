import { Task, TaskLists } from "./model";

let containers = document.querySelectorAll<HTMLDivElement>(".container-item");
let addTaskButton = document.getElementById("addTaskButton") as HTMLButtonElement;
let input = document.getElementById("addInput") as HTMLInputElement;
let todo = document.getElementById("toDoList") as HTMLUListElement;
let inProgress = document.getElementById("inProgressList") as HTMLUListElement;
let done = document.getElementById("doneList") as HTMLUListElement;

let tasks: TaskLists = {
    todo: [],
    inProgress: [],
    done: []
};

function loadContent(): void {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks) as TaskLists;
    }
    tasks.todo.forEach(task => addNewTask(task, todo));
    tasks.inProgress.forEach(task => addNewTask(task, inProgress));
    tasks.done.forEach(task => addNewTask(task, done));
}

function saveTasks(): void {
    tasks.todo = Array.from(document.querySelectorAll("#toDoList .task")).map((task) => 
        task.textContent?.replace("Delete", "").trim() || ""
    ).map(taskName => ({
        id: Math.random().toString(36),
        taskName,
        state: 'todo'
    }));

    tasks.inProgress = Array.from(document.querySelectorAll("#inProgressList .task")).map((task) => 
        task.textContent?.replace("Delete", "").trim() || ""
    ).map(taskName => ({
        id: Math.random().toString(36),
        taskName,
        state: 'inProgress'
    }));

    tasks.done = Array.from(document.querySelectorAll("#doneList .task")).map((task) => 
        task.textContent?.replace("Delete", "").trim() || ""
    ).map(taskName => ({
        id: Math.random().toString(36),
        taskName,
        state: 'done'
    }));

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addNewTask(task: Task, list: HTMLUListElement): void {
    const newTask = document.createElement("li") as HTMLLIElement;
    newTask.classList.add("task");
    newTask.setAttribute("draggable", "true");
    newTask.innerHTML = task.taskName;
    
    const btn = document.createElement("button") as HTMLButtonElement;
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
    const value = input.value.trim();
    if (!value) return;

    const newTask: Task = {
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
        const draggedElement = document.querySelector(".dragStyle") as HTMLLIElement | null;
        if (draggedElement) {
            container.querySelector("ul")?.appendChild(draggedElement);
            saveTasks();
        }
    });
});

loadContent();
