const todoList = document.querySelector('.todo__list');
const todoBtn = document.querySelector('.todo__btn');
const inputAdd = document.querySelector('.todo__input');
const todo__item = document.querySelector('.todo__item');

const createItem = (textItem, key) => {
	return `
		<li class="todo__item" data-todo-state="active" data-todo-key="${key}">
			<span class="todo__task">${textItem}</span>
			<span class="todo__action todo__action_restore" data-todo-action="active"></span>
			<span class="todo__action todo__action_delete" data-todo-action="deleted"></span>
			<span class="todo__action todo__action_complete" data-todo-action="completed"></span>
		</li>`;
};

const add = () => {
	todoList.insertAdjacentHTML(
		'afterbegin',
		createItem(inputAdd.value, inputAdd.value)
	);
	save();
	inputAdd.value = '';
	return;
};

const save = () => {
	localStorage.setItem(inputAdd.value, inputAdd.value);
};

const use = (e) => {
	const target = e.target;
	if (e.keyCode == 13 || target.classList.contains('todo__btn')) {
		if (inputAdd.disabled || !inputAdd.value.length) {
			return;
		} else {
			add();
		}
	} else if (e) {
		return;
	}
};

const reload = () => {
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		inputAdd.value = key;
		add();
	}
};

const init = () => {
	if (localStorage.length > 0) {
		reload();
	} else {
		return;
	}
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
	} else if (target.dataset.todoAction == 'completed') {
		target.parentNode.classList.toggle('complete');
	}
};

inputAdd.addEventListener('keydown', use);
todoBtn.addEventListener('click', use);
document.addEventListener('click', removeItem);

init();
