/* ------------------------------------------ */
const todoList = document.querySelector('.todo__list');
const todoBtn = document.querySelector('.todo__btn');
const todoInput = document.querySelector('.todo__input');

const tasks = [];

const addTask = (text) => {
	const task = {
		text,
		id: Date.now(),
		completed: false,
	};

	tasks.push(task);

	renderTasks(tasks);
	saveToLocalStorage(tasks);
	updateCounter(tasks.length);
};

const deleteTask = (id) => {
	tasks = tasks.filter((task) => task.id != id);

	renderTasks(tasks);
	saveToLocalStorage(tasks);
	updateCounter(tasks.length);
};

const completeTask = (id) => {
	tasks = tasks.map((task) =>
		task.id === id ? (task.completed = true) : task
	);

	renderTasks(tasks);
	saveToLocalStorage(tasks);
};

const renderTasks = (tasks) => {
	if (!tasks.length) {
		//show you have 0 task, add a new task
		//clear ul
		return;
	}

	let tasksToHTML;

	tasks.forEach((task) => {
		tasksToHTML += `
				<li class="todo__item ${
					task.completed ? 'complete' : ''
				}" data-todo-state="action" data-todo-key="${task.id}">
						<span class="todo__task">${task.text}</span>
						<span class="todo__action todo__action_restore" data-todo-action="active"></span>
						<span class="todo__action todo__action_delete" data-todo-action="deleted"></span>
						<span class="todo__action todo__action_complete" data-todo-action="completed"></span>
				</li>`;
	});
	todoList.insertAdjacentHTML('afterbegin', tasksToHTML);
};

const saveToLocalStorage = (tasks) => {};

const init = () => {};

document.addEventListener('click', addTask(todoInput.value));

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
