export interface Task {
    id: string;
    taskName: string;
    state: 'todo' | 'inProgress' | 'done';
}

export interface TaskLists {
    todo: Task[];
    inProgress: Task[];
    done: Task[];
}
