const projectInput = document.querySelector('#project-description');
class Project {
  constructor(title, id) {
    this.title = title;
    this.id = id;
    this.tasks = [];
  }
}
function createProject() {
  const projectInstance = new Project(projectInput.value, Date.now());
  return projectInstance;
}
export  { createProject };
