
import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";

let tasks: Task[] = [...initialTasks];

let currentGroupIndex = 1;

function task_separation() {
    let inprogressTasks: Task[] = tasks.filter(task => !task.completed).sort((a, b) => a.group - b.group);
  
    let lowestGroupTasks = inprogressTasks.filter(task => task.group === inprogressTasks[0]?.group);
    let higherGroupTasks = inprogressTasks.filter(task => task.group > inprogressTasks[0]?.group);
  
    if (lowestGroupTasks.length < 2) {
      inprogressTasks = [...lowestGroupTasks, ...higherGroupTasks.slice(0, 2 - lowestGroupTasks.length)];
    } else {
      inprogressTasks = lowestGroupTasks.slice(0, 2);
    }
  
    let todoTasks: Task[] = tasks.filter(task => !task.completed && !inprogressTasks.includes(task));
  
    let finishedTasks: Task[] = tasks.filter(task => task.completed === true);
  
    return ({ todoTasks: todoTasks, inprogressTasks: inprogressTasks, finishedTasks: finishedTasks })
  }

export function initializeTasks() {
    const temp = task_separation();
    return temp;
  }

// export function initializeTasks() {
//     if (tasks.length === 0) {
//         tasks.push(new Task(1, "Initial Task", "This is the initial task", "Employee 1", 1, false));
//     }
//     currentGroupIndex = 1;
// }

export function completeTask(taskTitle: string): void {
    const task = tasks.find(task => task.title === taskTitle);
    if (task) {
        task.completed = true;

        const nextTaskInGroup = tasks.find(t => t.group === task.group && !t.completed);
        if (!nextTaskInGroup) {

            const nextGroupTasks = tasks.filter(t => t.group === task.group + 1 && !t.completed);
            if (nextGroupTasks.length > 0) {
                nextGroupTasks[0].completed = false;
            }
        }
    }
}

export function createTask(title: string, description: string, persona: string, group: number): void {
    const newTaskId = tasks.length > 0 ? tasks.length + 1 : 1;
    const newTask = new Task(newTaskId, title, description, persona, group );
    tasks.push(newTask);
}

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    }
}

export function deleteTask(taskId: number): void {
    tasks = tasks.filter(task => task.id !== taskId);
}

export function getActiveTasks(): Task[] {

    const firstIncompleteGroup = Math.min(
        ...tasks.filter(task => !task.completed).map(task => task.group)
    );

    return tasks.filter(task => !task.completed && task.group === firstIncompleteGroup);
}

export function getCompletedTasks(): Task[] {
    return tasks.filter(task => task.completed);
}

export function getAllTasks(): Task[] {
    return tasks;
}