const taskDescriptionInput = document.querySelector('#task-description');
const dueDateInput = document.querySelector('#date');
const projectDescriptionInput = document.querySelector('#project-description');
const submitProjectButton = document.querySelector('.add-project');
const projectArray = [];
const taskArray = [];
class Project {
  constructor(projectDescription) {
    this.projectDescription = projectDescription;
    this.clicked = false;
    this.tasks = [];
  }
}
class Task {
  constructor(taskDescription, dueDate) {
    this.taskDescription = taskDescription;
    this.dueDate = dueDate;
  }
}
function getClickedProject() {
  let result;
  projectArray.forEach((project) => {
    if (project.clicked === true) {
      result = project;
    }
  });
  return result;
}
function createProject() {
  const project = new Project(projectDescriptionInput.value);
  projectArray.push(project);
  return project;
}
function createTask() {
  const task = new Task(taskDescriptionInput.value, dueDateInput.value);
  const clickedProject = getClickedProject();
  if (clickedProject !== undefined) {
    clickedProject.tasks.push(task);
    return clickedProject.tasks;
  }
  taskArray.push(task);
  return taskArray;
}
export {
  createTask,
  createProject,
  submitProjectButton,
  projectArray,
  taskArray,
  getClickedProject,
};
