/* eslint-disable no-param-reassign */
import {
  createTask,
  createProject,
  projectArray,
  submitProjectButton,
  taskArray,
} from './logic.js';

const homeButton = document.querySelector('.Home');
const createTaskDialog = document.querySelector('.Create-task-dialog');
const submitTaskButton = document.querySelector('.add-task');
const createTaskButton = document.querySelector('.Create-task');
const createProjectDialog = document.querySelector('.Create-project-dialog');
const createProjectButton = document.querySelector('.Create-project');
const closeTaskDialogButton = document.querySelector('.close-task-dialog');
const projectContainer = document.querySelector('.project-container');
const taskContainer = document.querySelector('.task-container');
const closeProjectDialogButton = document.querySelector(
  '.close-project-dialog'
);
function showCreateTaskDialog() {
  createTaskDialog.showModal();
}
function closeCreateTaskDialog() {
  createTaskDialog.close();
}
function showCreateProjectDialog() {
  createProjectDialog.showModal();
}
function closeCreateProjectDialog() {
  createProjectDialog.close();
}
function removeAllClicked() {
  projectArray.forEach((project) => {
    // eslint-disable-next-line no-param-reassign
    project.clicked = false;
  });
}
function removeClicked(currentIndex) {
  projectArray.forEach((project, index) => {
    if (currentIndex !== index) {
      // eslint-disable-next-line no-param-reassign
      project.clicked = false;
    }
  });
}
function markClickedProject(projectBoxes) {
  if (projectBoxes.length > 0) {
    projectBoxes.forEach((projectBox, index) => {
      projectBox.addEventListener('click', () => {
        projectArray[index].clicked = true;
        removeClicked(index);
      });
    });
  }
}
function deleteProject(project) {
  const containerDiv = project.parentNode;
  if (containerDiv) {
    const containerDivArr = Array.from(containerDiv.children);
    const index = containerDivArr.indexOf(project);
    projectArray.splice(index, index);
    taskContainer.innerHTML = '';
    containerDiv.removeChild(project);
  }
}
function renderTasks(tasks) {
  if (taskContainer.innerHTML.length > 0) {
    taskContainer.innerHTML = '';
  }
  tasks.forEach((task) => {
    const taskHTML = `
  <div class="task">
    <p class = "task-description">${task.taskDescription}</p>
    <p class = "due-date">${task.dueDate}</p>
    <button class="action-button delete-button">Delete</button>
    <button class="action-button edit-button">Edit</button>
  </div>`;
    taskContainer.insertAdjacentHTML('beforeend', taskHTML);
  });
  const deleteButtons = document.querySelectorAll('.delete-button');
  // deleteButtons.forEach((deleteButton) => {
  //   deleteButton.addEventListener('click', (event) => {
  //     deleteButton();
  //     event.stopPropagation();
  //   });
  // });
}
function createTaskBoxes(event) {
  event.preventDefault();
  const createdTaskArray = createTask();
  renderTasks(createdTaskArray);
  closeCreateTaskDialog();
}
function createProjectBox() {
  const projectInstance = createProject();
  const projectHTML = `
    <div class="project">
      <p class="project-description">${projectInstance.projectDescription}</p>
      <button class="delete-button">Delete</button>
    </div>
    `;
  projectContainer.insertAdjacentHTML('beforeend', projectHTML);
  const projectBoxes = document.querySelectorAll('.project');
  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', (event) => {
      deleteProject(projectBoxes[index]);
      event.stopPropagation();
    });
  });
  markClickedProject(projectBoxes);
  projectBoxes.forEach((projectBox, index) => {
    projectBox.addEventListener('click', () => {
      renderTasks(projectArray[index].tasks);
    });
  });
  closeCreateProjectDialog();
}
homeButton.addEventListener('click', () => {
  removeAllClicked();
  renderTasks(taskArray);
});
closeTaskDialogButton.addEventListener('click', closeCreateTaskDialog);
createProjectButton.addEventListener('click', showCreateProjectDialog);
closeProjectDialogButton.addEventListener('click', closeCreateProjectDialog);
submitProjectButton.addEventListener('click', createProjectBox);
homeButton.addEventListener('click', removeAllClicked);
submitTaskButton.addEventListener('click', createTaskBoxes);
createTaskButton.addEventListener('click', showCreateTaskDialog);
