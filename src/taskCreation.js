import {
  projectArray,
  selectedProject,
  saveProject,
  projectContainer,
} from './projectCreation.js';
//app should be able to dsiplay tasks from default task array
//when user clicks on specific selected project it should display its subtasks
//when user click on home button it should display general task array
import { createTask } from './logic.js';
const addTaskForm = document.querySelector('[data-task-dialog]');
const taskTemplate = document.querySelector('#task');
const taskContainer = document.querySelector('[data-task-container]');
const homeButton = document.querySelector('[data-home-button] ');
const deleteTaskButton = document.querySelector('[data-delete-task]');
const editTaskButton = document.querySelector('[data-edit-task]');
const editedTaskDescription = document.querySelector(
  '#edited-task-description'
);
const editedDate = document.querySelector('#edited-date');
let taskArray = JSON.parse(localStorage.getItem('tasks')) || [];
let selectedTask;
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(taskArray));
}
function getSelectedTask(taskDiv) {
  if (selectedProject) {
    return selectedProject.tasks.find(
      (task) => task.id === Number(taskDiv.className)
    );
  }
  return taskArray.find((task) => task.id === Number(taskDiv.className));
}
function deleteTask() {
  console.log('i work')
  if (selectedProject) {
    selectedProject.tasks = selectedProject.tasks.filter((task) => task.id !== selectedTask.id);
    saveProject();
    saveTasks();
    renderTaskArray(selectedProject.tasks);
    return;
  }
  taskArray = taskArray.filter((task) => task.id !== selectedTask.id);
  saveTasks();
  renderTaskArray(taskArray);
}
function renderTaskArray(tasks) {
  if (taskContainer.innerHTML.length) {
    taskContainer.innerHTML = '';
  }
  tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const taskDiv = taskElement.querySelector('#task');
    const taskTitle = taskElement.querySelector('[data-task-title]');
    const taskDueDate = taskElement.querySelector('[data-task-dueDate]');
    taskTitle.textContent = task.title;
    taskDueDate.textContent = task.dueDate;
    taskContainer.appendChild(taskElement);
    taskDiv.classList.add(String(task.id));
  });
  const taskDivs = document.querySelectorAll('[data-task-box]');
  taskDivs.forEach((taskDiv) => {
    taskDiv.addEventListener('click', () => {
      selectedTask = getSelectedTask(taskDiv);
    });
  });
}
function createTaskArray() {
  const task = createTask();
  if (selectedProject) {
    selectedProject.tasks.push(task);
    saveProject();
    renderTaskArray(selectedProject.tasks);
    return;
  }
  taskArray.push(task);
  saveTasks();
  renderTaskArray(taskArray);
}
console.log(projectContainer.children);
projectContainer.childNodes.forEach((project) => {
  project.addEventListener('click', () => {
    if (String(selectedProject.id) === project.className) {
      renderTaskArray(selectedProject.tasks);
    }
  });
});
addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  createTaskArray();
});
deleteTaskButton.addEventListener('click', deleteTask)
homeButton.addEventListener('click', () => {
  renderTaskArray(taskArray);
});
renderTaskArray(taskArray);
