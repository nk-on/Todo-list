const taskDescriptionInput = document.querySelector('#task-description');
const dueDateInput = document.querySelector('#date');
const projectDescriptionInput = document.querySelector('#project-description')
const submitProjectButton = document.querySelector('.add-project');
const tasks = [];
const projectArray = [];
class Project {
  constructor(projectDescription) {
    this.projectDescription = projectDescription;
    this.clicked = false;
  }
}
function createProject() {
  const project = new Project(projectDescriptionInput.value);
  projectArray.push(project);
  return project;
}
export { createProject, submitProjectButton, projectArray };
