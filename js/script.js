/* ------------------------------------------ */
const todoList = document.querySelector('.todo__list');
const todoBtn = document.querySelector('.todo__btn');
const inputAdd = document.querySelector('.todo__input');
const todo__item = document.querySelector('.todo__item');
const task = [];

const createItem = (textItem) => {
	return `
		<li class="todo__item" data-todo-state="action" data-todo-key="task${task.length}">
			<span class="todo__task">${textItem}</span>
			<span class="todo__action todo__action_restore" data-todo-action="active"></span>
			<span class="todo__action todo__action_delete" data-todo-action="deleted"></span>
			<span class="todo__action todo__action_complete" data-todo-action="completed"></span>
		</li>`;
};

const addTask = () => {
	todoList.insertAdjacentHTML('afterbegin', createItem(inputAdd.value));
	save();
	counter();
	inputAdd.value = '';
};

const save = () => {
	task.push({
		name: `task${task.length}`,
		text: inputAdd.value,
		checked: 'active',
	});
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
};

const counter = () => {
	let count = document.querySelector('.todo__general-count');
	count.innerHTML = localStorage.length;
};

const removeItem = (e) => {
	let target = e.target;
	if (
		target.parentNode.tagName == 'LI' &&
		target.dataset.todoAction == 'deleted'
	) {
		target.parentNode.remove();
		let itemTargetTodo = target.parentNode.dataset.todoKey;
		localStorage.removeItem(itemTargetTodo);
		counter();
	} else if (target.dataset.todoAction == 'completed') {
		target.parentNode.classList.toggle('complete');
	}
	reload();
};

const reload = () => {
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
};

const render = () => {};

const init = () => {
	reload();
	/* render(); */
};

inputAdd.addEventListener('keydown', use);
todoBtn.addEventListener('click', use);
document.addEventListener('click', removeItem);

init();
