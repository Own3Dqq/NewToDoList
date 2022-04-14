/* ------------------------------------------ */
const todoList = document.querySelector('.todo__list');
const todoInput = document.querySelector('.form__input');
let tasks = [];

const addTask = (text, date) => {
	const task = {
		text,
		id: Date.now(),
		completed: false,
		date
	};
	tasks.push(task);
	renderAndSave(tasks);
	todoInput.innerHTML = '';
};

const deleteTask = id => {
	tasks = tasks.filter((task) => task.id !== id);

	renderAndSave(tasks);
};

const completeTask = id => {
	tasks.map((task) => {
		if (task.id === id) {
			task.completed = !task.completed
		}

		return task;
	});

	renderAndSave(tasks);
};

const counterCompleted = (tasks) => {
	const completedTask = document.querySelector('.counter_complete .counter__value');

	tasks = tasks.filter((task) => task.completed === true);
	completedTask.innerHTML = tasks.length;
}

const renderTasks = (tasks) => {
	if (!tasks.length) {
		todoList.innerHTML = '';
		todoList.insertAdjacentHTML(
			'afterbegin',
			`<span class='message'>You have 0 task, add a new task</span>`
		);
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

const updateCounter = (arg) => {
	let count = document.querySelector('.counter__value');
	count.innerHTML = arg;
};

const action = (e) => {
	const target = e.target;

	if (e.keyCode == 13 || target.classList.contains('form__btn')) {
		if (todoInput.disabled || !todoInput.value.length) {
			return;
		}
		addTask(todoInput.value, getNowDate());
		todoInput.value = '';
	} else if (target.parentNode.tagName === 'LI') {
		const setTargetID = target.parentNode.dataset.todoKey;
		if (target.dataset.todoAction === 'deleted') {
			deleteTask(parseInt(setTargetID));
		} else if (target.dataset.todoAction === 'completed') {
			completeTask(parseInt(setTargetID));
		}
	}
};

const getNowDate = () => {
	const options = {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	};
	return new Intl.DateTimeFormat(navigator.language, options).format(
		new Date()
	);
};

const renderAndSave = (tasks) => {
	renderTasks(tasks);
	saveToLocalStorage(tasks);
	updateCounter(tasks.length);
	counterCompleted(tasks);
};

const init = () => {
	let getStorage = JSON.parse(localStorage.getItem('todo'));

	if (getStorage) {
		tasks.push(...getStorage);
	}

	renderTasks(tasks);
	updateCounter(tasks.length);
};

document.addEventListener('keydown', action);
document.addEventListener('click', action);

init();