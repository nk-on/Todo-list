import {
  projectArray,
  selectedProject,
  saveProject,
} from './projectCreation.js';
//app should be able to dsiplay tasks from default task array
//when user clicks on specific selected project it should display its subtasks
//when user click on home button it should display general task array
import { createTask } from './logic.js';
const addTaskForm = document.querySelector('[data-task-dialog]');
const taskTemplate = document.querySelector('#task');
const taskContainer = document.querySelector('[data-task-container]');
const homeButton = document.querySelector('[data-home-button] ');
const taskArray = [];
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
};
function createTaskArray() {
  const task = createTask();
  if (selectedProject) {
    selectedProject.tasks.push(task);
    renderTaskArray(selectedProject.tasks);
    return;
  }
  taskArray.push(task);
  renderTaskArray(taskArray);
}
addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  createTaskArray();
});
homeButton.addEventListener('click', () => {
    renderTaskArray(taskArray);
});
