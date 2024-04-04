const projectInput = document.querySelector('#project-description');
const taskDescription = document.querySelector('#task-description');
const taskDueDate = document.querySelector('#date');
class Project {
  constructor(title, id) {
    this.title = title;
    this.id = id;
    this.tasks = [];
  }
}
class Task {
  constructor(title, dueDate, id) {
    this.title = title;
    this.dueDate = dueDate;
    this.id = id;
  }
}
function createTask() {
  const taskInstance = new Task(taskDescription.value, taskDueDate.value, Date.now());
  return taskInstance;
}
function createProject() {
  const projectInstance = new Project(projectInput.value, Date.now());
  return projectInstance;
}
export { createProject, createTask };
