/* ------------------------------------------ */
const todoList = document.querySelector('.todo__list');
const todoInput = document.querySelector('.form__input');
const todoForm = document.querySelector('.todo__form');
const authBtns = document.querySelector('.authorization');
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
						<label class='item__label'>${task.text}</label>
						<input class='editInput' value='${task.text}'>
 						<span class='item__date'>${task.date}</span>
						<div class='item__action'>
							<button class='item_action_btn item-action__delete' data-todo-action="deleted"></button>
							<button class='item_action_btn item-action__edit' data-todo-action="edit"></button>
							<button class='item_action_btn item-action__complete' data-todo-action="completed"></button>
						</div>
 						
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

const initTaskActions = () => {
	taskDeleteBtns = document.querySelectorAll('.item-action__delete');
	taskEditBtns = document.querySelectorAll('.item-action__edit');
	taskCompleteBtns = document.querySelectorAll('.item-action__complete');

	taskDeleteBtns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			const target = e.target.parentNode;
			const targetId = target.parentNode.dataset.todoKey;

			deleteTask(parseInt(targetId));
			initTaskActions();
		});
	});

	taskEditBtns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			const target = e.target.parentNode;
			editTask(target.parentNode);
		});
	});

	taskCompleteBtns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			const target = e.target.parentNode;
			const targetId = target.parentNode.dataset.todoKey;
			completeTask(parseInt(targetId));
			initTaskActions();
		});
	});
};

const checkedAuthKey = () => {
	if (localStorage.hasOwnProperty('auth')) {
		authBtns.innerHTML = '';
		const authLogOut = `
			<div class="authorization__account account">
					<span class="account__img"><i class="fa-solid fa-user"></i></span>
					<span class="account__user">Own3Dqq@gmail.com</span>
					<menu class="account__menu">
						<ul class="account-menu__list">
							<li class="account-menu__item">
								<a class="account-menu__link" href="#">Profile</a>
							</li>
							<li class="account-menu__item">
								<a class="account-menu__link" href="#">Setting</a>
							</li>
						</ul>
					</menu>
			</div>
			<button class="btn__out"><i class="fa-sharp fa-solid fa-right-from-bracket"></i> Log Out</button>
		`;

		authBtns.insertAdjacentHTML('afterbegin', authLogOut);

		const logOutBtn = document.querySelector('.btn__out');
		const accountMenu = document.querySelector('.account__menu');

		accountMenu.addEventListener('click', () => {
			const dropDownMenu = document.querySelector('.account-menu__list');
			dropDownMenu.classList.toggle('active-menu');
		});

		logOutBtn.addEventListener('click', () => {
			localStorage.removeItem('auth');
			location.reload();
		});
	}
};

const init = () => {
	checkedAuthKey();
	let getStorage = JSON.parse(localStorage.getItem('todo'));

	if (getStorage) {
		tasks.push(...getStorage);
	}

	renderTasks(tasks);
	initTaskActions();
	updateAllTasksCounter(tasks.length);
	updateCompletedTasksCounter(tasks);
};

init();

todoForm.addEventListener('submit', (e) => renderTask(e));
