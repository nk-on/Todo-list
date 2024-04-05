import { closeCreateProjectDialog, closeEditProject, projectContainer } from './UI.js';
import { createProject } from './logic.js';

const deleteProjectButton = document.querySelector('[data-delete-project]');
const submitEditProject = document.querySelector('[data-submit-editedProject]');
const projectForm = document.querySelector('[data-project-form]');
const templateProject = document.querySelector('#project');
const editProjectForm = document.querySelector('[ data-edit-project]');
const editProjectInput = document.querySelector('#edited-project-description');
let projectArray = JSON.parse(localStorage.getItem('projects')) || [];
let selectedProject;
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
function editProject(event) {
  event.preventDefault();
  if (!selectedProject) {
    return;
  }
  projectArray.forEach((project) => {
    if (project.id === selectedProject.id) {
      // eslint-disable-next-line no-param-reassign
      console.log(editProjectInput.value);
      project.title = editProjectInput.value;
    }
  });
  console.log(projectArray);
  saveProject();
  createProjectBoxes();
}
function deleteProject() {
  if (!selectedProject) {
    return;
  }
  projectArray = projectArray.filter(
    (project) => selectedProject.id !== project.id
  );
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
  closeCreateProjectDialog();
});
editProjectForm.addEventListener('submit', (event) => {
  event.preventDefault();
  editProject();
  closeEditProject();
});
deleteProjectButton.addEventListener('click', deleteProject);
submitEditProject.addEventListener('click', editProject);
createProjectBoxes();
export { selectedProject, saveProject, projectArray };
