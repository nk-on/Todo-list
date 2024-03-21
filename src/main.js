/* eslint-disable no-param-reassign */
import {
  createTask,
  createProject,
  projectArray,
  submitProjectButton,
  taskArray,
  getClickedProject,
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
    console.log(projectArray);
    taskContainer.innerHTML = '';
    containerDiv.removeChild(project);
  }
}
function deleteTask(taskBox, index) {
  const clickedProject = getClickedProject();
  const containerDiv = taskBox.parentNode;
  if (clickedProject) {
    const projectTasks = clickedProject.tasks;
    projectTasks.splice(index, index);
  } else {
    taskArray.splice(index, index);
  }
  taskArray.pop();
  if (clickedProject) {
    const projectTasks = clickedProject.tasks;
    projectTasks.pop();
  }
  containerDiv.removeChild(taskBox);
}
// function editTask(taskBox) {
//   //find parent element of clicked edit button
//   //replace task description and due date with forms
//   //change their content
//   //change content of created task object
//   const taskDescription = document.querySelector('.task-description');
//   const dueDate = document.querySelector('.due-date');
//   taskDescription.contentEditable = true;
//   dueDate.contentEditable = true;
//   return () => {
//     console.log(taskDescription.textContent)
//   };
// }
function renderTasks(tasks) {
  if (taskContainer.innerHTML.length > 0) {
    taskContainer.innerHTML = '';
  }
  if (tasks.length > 0) {
    tasks.forEach((task) => {
      const taskHTML = `
    <div class="task">
      <p class = "task-description">${task.taskDescription}</p>
      <p class = "due-date">${task.dueDate}</p>
      <button class="delete-task-button">Delete</button>
      <button class="edit-button">Edit</button>
    </div>`;
      taskContainer.insertAdjacentHTML('beforeend', taskHTML);
    });
    const taskBoxes = document.querySelectorAll('.task');
    const deleteButtons = document.querySelectorAll('.delete-task-button');
    const editButtons = document.querySelectorAll('.edit-button');
    deleteButtons.forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', (event) => {
        deleteTask(taskBoxes[index], index);
        event.stopPropagation();
      });
    });
    // editButtons.forEach((editButton, index) => {
    //   editButton.addEventListener('click', (event) => {
    //     editTask(taskBoxes[index]);
    //     event.stopPropagation();
    //   });
    // });
  }
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
      <button class="delete-project-button">Delete</button>
    </div>
    `;
  projectContainer.insertAdjacentHTML('beforeend', projectHTML);
  const projectBoxes = document.querySelectorAll('.project');
  const deleteButtons = document.querySelectorAll('.delete-project-button');
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
