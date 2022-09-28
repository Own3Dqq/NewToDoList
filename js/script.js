/* ------------------------------------------ */
const todoList = document.querySelector('.todo__list');
const todoInput = document.querySelector('.form__input');
const todoForm = document.querySelector('.todo__form');
let taskDeleteBtns, taskEditBtns, taskCompleteBtns;
/* ------------------------------------------- */

const renderTasks = (tasks) => {
	if (!tasks.length) {
		todoList.innerHTML = '';
		todoList.insertAdjacentHTML('afterbegin', `<span class='message'>You have 0 task, add a new task</span>`);
	} else {
		todoList.innerHTML = '';
		let tasksToHTML = '';

		tasks.forEach((task) => {
			const classCompleted = task.completed ? 'list__item_completed' : '';
			tasksToHTML += `
 				<li class="list__item item ${classCompleted}" data-todo-state="action" data-todo-key="${task.id}">
 						<span class="item__text">${task.text}</span>
 						<span class='item__date'>${task.date}</span>
 						<span class="item__action item__action_delete" data-todo-action="deleted"></span>
						 <span class="item__action item__action_edit" data-todo-action="edit"></span>
 						<span class="item__action item__action_complete" data-todo-action="completed"></span>
 				</li>`;
		});
		todoList.insertAdjacentHTML('afterbegin', tasksToHTML);
	}
};

const saveToLocalStorage = (tasks) => {
	let setStorage = JSON.stringify(tasks);
	localStorage.setItem('todo', setStorage);
};

const updateCompletedTasksCounter = (tasks) => {
	let completeCounter = document.querySelector('.couter__complete');
	tasks = tasks.filter((task) => task.completed === true);
	completeCounter.innerHTML = tasks.length;
};

const updateAllTasksCounter = (arg) => {
	let count = document.querySelector('.counter__value');
	count.innerHTML = arg;
};

const renderTask = (e) => {
	e.preventDefault();
	if (!todoInput.value.length) {
		return;
	}

	addTask(todoInput.value, getNowDate());
	todoInput.value = '';
	initTaskActions();
};

const renderAndSave = (tasks) => {
	renderTasks(tasks);
	saveToLocalStorage(tasks);
	updateAllTasksCounter(tasks.length);
	updateCompletedTasksCounter(tasks);
};

const initTaskActions = (e) => {
	taskDeleteBtns = document.querySelectorAll('.item__action_delete');
	taskEditBtns = document.querySelectorAll('.item__action_edit');
	taskCompleteBtns = document.querySelectorAll('.item__action_complete');

	taskDeleteBtns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			const target = e.target;
			const targetId = target.parentNode.dataset.todoKey;
			deleteTask(parseInt(targetId));
			initTaskActions();
		});
	});

	taskEditBtns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			const target = e.target;
			const targetId = target.parentNode.dataset.todoKey;
			editTask(parseInt(targetId));
			initTaskActions();
		});
	});

	taskCompleteBtns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			const target = e.target;
			const targetId = target.parentNode.dataset.todoKey;
			completeTask(parseInt(targetId));
			initTaskActions();
		});
	});
};

const init = () => {
	let getStorage = JSON.parse(localStorage.getItem('todo'));

	if (getStorage) {
		tasks.push(...getStorage);
	}

	renderTasks(tasks);
	updateAllTasksCounter(tasks.length);
	updateCompletedTasksCounter(tasks);
};

init();

todoForm.addEventListener('submit', (e) => renderTask(e));
