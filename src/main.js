import { createProject } from './logic.js';

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
const deleteProjectButton = document.querySelector('[data-delete-project]');
const projectForm = document.querySelector('[data-project-form]');
const templateProject = document.querySelector('#project');
const projectContainer = document.querySelector('[data-project-container]');
let projectArray = JSON.parse(localStorage.getItem('projects')) || [];
let selectedProject;
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
function saveProject() {
  localStorage.setItem('projects', JSON.stringify(projectArray));
}
function getSelectedProject(projectDiv) {
  return projectArray.find(
    (project) => project.id === Number(projectDiv.className)
  );
}
function createProjectBoxes() {
  if (projectContainer.innerHTML.length) {
    projectContainer.innerHTML = '';
  }
  projectArray.forEach((project) => {
    const projectElement = document.importNode(templateProject.content, true);
    const projectDiv = projectElement.querySelector('[data-project-box]');
    const title = projectElement.querySelector('[data-title]');
    title.textContent = project.title;
    projectContainer.appendChild(projectElement);
    projectDiv.classList.add(String(project.id));
  });
  const projectDivs = document.querySelectorAll('[data-project-box]');
  projectDivs.forEach((projectDiv) => {
    projectDiv.addEventListener('click', () => {
      selectedProject = getSelectedProject(projectDiv);
    });
  });
}
function deleteProject() {
  if (!selectedProject) {
    return;
  }
  projectArray = projectArray.filter((project) => selectedProject.id === project.id);
  saveProject();
  createProjectBoxes();
}
function renderProjects() {
  projectArray.push(createProject());
  saveProject();
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
deleteProjectButton.addEventListener('click', deleteProject)
createProjectBoxes();
