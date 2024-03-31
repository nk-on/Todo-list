const createTaskDialog = document.querySelector('.Create-task-dialog');
const createProjectDialog = document.querySelector('.Create-project-dialog');
const closeTaskDialogButton = document.querySelector('.close-task-dialog');
const closeProjectDialogButton = document.querySelector(
  '.close-project-dialog'
);
const submitProjectButton = document.querySelector('[data-submit-project]');
const addProjectButton = document.querySelector('[data-create-project]');
const createTaskButton = document.querySelector('.Create-task');
const editProjectDialog = document.querySelector('.edit-project-dialog');
const closeEditProjectDialog = document.querySelector(
  '.close-edit-project-dialog'
);
const editProjectButton = document.querySelector('[data-edit-project]');
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
function showEditProjectDialog() {
  editProjectDialog.showModal();
}
function closeEditProject() {
  editProjectDialog.close();
}
createTaskButton.addEventListener('click', showCreateTaskDialog);
closeTaskDialogButton.addEventListener('click', closeCreateTaskDialog);
addProjectButton.addEventListener('click', showCreateProjectDialog);
closeProjectDialogButton.addEventListener('click', closeCreateProjectDialog);
editProjectButton.addEventListener('click', showEditProjectDialog);
closeEditProjectDialog.addEventListener('click', closeEditProject)
