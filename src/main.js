import { createProject, projectArray, submitProjectButton } from './logic.js';

const createTaskDialog = document.querySelector('.Create-task-dialog');
const createTaskButton = document.querySelector('.Create-task');
const createProjectDialog = document.querySelector('.Create-project-dialog');
const createProjectButton = document.querySelector('.Create-project');
const closeTaskDialogButton = document.querySelector('.close-task-dialog');
const projectContainer = document.querySelector('.project-container');
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
function markClickedProject(projectBoxes) {
  if (projectBoxes.length > 0) {
    projectBoxes.forEach((projectBox, index) => {
      projectBox.addEventListener('click', () => {
        projectArray[index].clicked = true;
        console.log(projectArray[index]);
      });
    });
  }
}
function createProjectBox() {
  const projectInstance = createProject();
  const projectHTML = `
    <div class="project">
      <p class="project-description">${projectInstance.projectDescription}</p>
      <button class="delete-button">Delete</button>
    </div>
    `;
  const projectBoxes = document.querySelectorAll('.project');
  markClickedProject(projectBoxes);
  projectContainer.insertAdjacentHTML('beforeend', projectHTML);
  closeCreateProjectDialog();
}
createTaskButton.addEventListener('click', showCreateTaskDialog);
closeTaskDialogButton.addEventListener('click', closeCreateTaskDialog);
createProjectButton.addEventListener('click', showCreateProjectDialog);
closeProjectDialogButton.addEventListener('click', closeCreateProjectDialog);
submitProjectButton.addEventListener('click', createProjectBox);
