import { createProject, projectArray } from './logic.js';
const createTaskDialog = document.querySelector('.Create-task-dialog');
const createTaskButton = document.querySelector('.Create-task');
const createProjectDialog = document.querySelector('.Create-project-dialog');
const createProjectButton = document.querySelector('.Create-project');
const closeTaskDialogButton = document.querySelector('.close-task-dialog');
const closeProjectDialogButton = document.querySelector(
  '.close-project-dialog'
);
const addProjectButton = document.querySelector('[data-create-project]');
const submitProjectButton = document.querySelector('[data-submit-project]');
const projectForm = document.querySelector('[data-project-form]');
const templateProject = document.querySelector('#project');
const projectContainer = document.querySelector('[data-project-container]');
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
function createProjectBoxes() {
  projectArray.forEach((project) => {
    const projectElement = document.importNode(templateProject.content, true);
    const title = projectElement.querySelector('[data-title]');
    title.textContent = project.title;
    projectContainer.appendChild(projectElement);
  });
}
function renderProjects() {
  createProject();
  createProjectBoxes();
}
projectForm.addEventListener('submit', (event) => {
  event.preventDefault();
  renderProjects();
});
createTaskButton.addEventListener('click', showCreateTaskDialog);
closeTaskDialogButton.addEventListener('click', closeCreateTaskDialog);
createProjectButton.addEventListener('click', showCreateProjectDialog);
closeProjectDialogButton.addEventListener('click', closeCreateProjectDialog);
console.log(projectArray)
createProjectBoxes();