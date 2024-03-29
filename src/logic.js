const projectInput = document.querySelector('#project-description');
const projectArray = JSON.parse(localStorage.getItem('projects')) || [];
class Project {
  constructor(title, id) {
    this.title = title;
    this.id = id;
    this.tasks = [];
  }
}
function saveProject() {
  localStorage.setItem('projects', JSON.stringify(projectArray));
}
function createProject() {
  const projectInstance = new Project(projectInput.value, Date.now());
  projectArray.push(projectInstance);
  saveProject();
}
export { createProject, projectArray };
