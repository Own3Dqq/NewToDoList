/* ------------------------------------------ */
const todoList = document.querySelector('.todo__list');
const todoInput = document.querySelector('.form__input');

let popupBg = document.querySelector('.popup__bg');
let popup = document.querySelector('.popup');
let popupContent = document.querySelector('.popup--content');
let openPopupButtons = document.querySelectorAll('.button--invite');
let closePopupButton = document.querySelector('.popup--close');
let popupAgree = document.querySelector('.btn-agree');

let tasks = [];
/* ------------------------------------------- */

const addTask = (text, date) => {
	const task = {
		text,
		id: Date.now(),
		completed: false,
		date,
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
			task.completed = !task.completed;
		}

		return task;
	});

	renderAndSave(tasks);
};

const counterCompleted = (tasks) => {
	const completedTask = document.querySelector('.counter_complete .counter__value');

	tasks = tasks.filter((task) => task.completed === true);
	completedTask.innerHTML = tasks.length;
};

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
 						<span class="item__action item__action_complete" data-todo-action="completed"></span>
 				</li>`;
		});
		todoList.insertAdjacentHTML('afterbegin', tasksToHTML);
	}
};

/* Form Data */
openPopupButtons.forEach((button) => {
	//Перебираем все кнопки
	button.addEventListener('click', (e) => {
		//Для каждой вешаем обработчик событий на клик
		e.preventDefault(); //Предотвращаем дефолтное поведение браузера
		popupBg.classList.add('active'); //Добавляем класс 'active' для фона
		popup.classList.add('active'); //И для самого окна
	});
});

closePopupButton.addEventListener('click', () => {
	//Вешаем обработчик на крестик
	popupBg.classList.remove('active'); //Убираем активный класс с фона
	popup.classList.remove('active'); //И с окна
});

/* Popup End */

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
	return new Intl.DateTimeFormat(navigator.language, options).format(new Date());
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
	counterCompleted(tasks);
};

document.addEventListener('keydown', action);
document.addEventListener('click', action);

init();

/* Form Data */

// const form = document.querySelectorAll('form'),
// 	inputs = document.querySelectorAll('input');

// const message = {
// 	loading: 'Загрузка...',
// 	success: 'Спасибо! Скоро мы с вами свяжемся',
// 	failure: 'Что-то пошло не так...',
// };

// const postData = async (url, data) => {
// 	document.querySelector('.status').textContent = message.loading;
// 	let res = await fetch(url, {
// 		method: 'POST',
// 		body: data,
// 	});

// 	return await res.text();
// };

// const clearInputs = () => {
// 	inputs.forEach((item) => {
// 		item.value = '';
// 	});
// };

// form.forEach((item) => {
// 	item.addEventListener('submit', (e) => {
// 		e.preventDefault();

// 		let statusMessage = document.createElement('div');
// 		statusMessage.classList.add('status');
// 		item.appendChild(statusMessage);

// 		const formData = new FormData(item);

// 		postData('https://reqres.in/api/register', formData)
// 			.then((res) => {
// 				console.log(res);
// 				statusMessage.textContent = message.success;
// 			})
// 			.catch(() => (statusMessage.textContent = message.failure))
// 			.finally(() => {
// 				clearInputs();
// 				setTimeout(() => {
// 					statusMessage.remove();
// 				}, 5000);
// 			});
// 	});
// });

const postData = async (url, data) => {
	let res = await fetch(url, {
		method: 'POST',
		body: data,
	});

	return await res;
};

document.addEventListener('submit', (e) => {
	e.preventDefault();
	const form = document.querySelectorAll('.popup');
	form.forEach((item) => {
		const formData = new FormData(item);

		postData('https://reqres.in/api/register', formData)
			.then((res) => {
				console.log(res);
			})
			.catch(() => console.log('2'));
	});
});
