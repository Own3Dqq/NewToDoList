/* ------------------------------------------ */
const todoList = document.querySelector('.todo__list');
const todoInput = document.querySelector('.todo__input');
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

const deleteTask = (id) => {
	tasks = tasks.filter((task) => task.id !== id);

	renderAndSave(tasks);
};

const completeTask = (id) => {
	tasks.map((task) => {
		if (task.id === id) {
			if (task.completed) {
				return (task.completed = !task.completed);
			} else {
				return (task.completed = !task.completed);
			}
		}

		return task;
	});

	renderAndSave(tasks);
};

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
			const classCompleted = task.completed ? 'completed' : '';
			tasksToHTML += `
				<li class="todo__item ${classCompleted}" data-todo-state="action" data-todo-key="${task.id}">
						<span class="todo__task">${task.text}</span>
						<span class='todo__date'>${task.date}</span>
						<span class="todo__action todo__action_delete" data-todo-action="deleted"></span>
						<span class="todo__action todo__action_complete" data-todo-action="completed"></span>
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
	let count = document.querySelector('.todo__count');
	count.innerHTML = arg;
};

const action = (e) => {
	const target = e.target;

	if (e.keyCode == 13 || target.classList.contains('todo__btn')) {
		if (todoInput.disabled || !todoInput.value.length) {
			return;
		}
		addTask(todoInput.value, getNowDate());
		todoInput.value = '';
	} else if (target.parentNode.tagName === 'LI') {
		const setTargetID = target.parentNode.dataset.todoKey;
		if (target.dataset.todoAction == 'deleted') {
			deleteTask(parseInt(setTargetID));
		} else if (target.dataset.todoAction == 'completed') {
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

/* const addTask = () => {
	todoList.insertAdjacentHTML('afterbegin', createItem(inputAdd.value));
	save();
	counter();
	inputAdd.value = '';
}; */

/* const save = () => {
	localStorage.setItem('todo', document.querySelector('.todo__list').innerHTML);
};

const use = (e) => {
	const target = e.target;
	if (e.keyCode == 13 || target.classList.contains('todo__btn')) {
		if (inputAdd.disabled || !inputAdd.value.length) {
			return;
		}
		addTask();
		reload();
	}
}; */

/* const counter = () => {
	let count = document.querySelector('.todo__general-count');
	count.innerHTML = todoList.children.length;
}; */

/* const removeItem = (e) => {
	let target = e.target;
	if (
		target.parentNode.tagName == 'LI' &&
		target.dataset.todoAction == 'deleted'
	) {
		target.parentNode.remove();
		save();
		counter();
	} else if (target.dataset.todoAction == 'completed') {
		target.parentNode.classList.toggle('complete');
		save();
	}
	reload();
}; */

/* const reload = () => {
	if (todoList.children.length == 0) {
		todoList.insertAdjacentHTML(
			'afterbegin',
			"<span class='message'>You have 0 task, add a new task</span>"
		);
	} else if (
		
		todoList.children.length > 1 &&
		todoList.querySelector('.message')
	) {
		todoList.querySelector('.message').remove();
	}
}; */

/* const render = () => {
	const fromStorage = localStorage.getItem('todo');
	if (fromStorage) {
		document.querySelector('.todo__list').innerHTML = fromStorage;
	}
}; */

/* inputAdd.addEventListener('keydown', use);
todoBtn.addEventListener('click', use); */
/* document.addEventListener('click', removeItem); */
