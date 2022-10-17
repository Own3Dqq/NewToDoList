let tasks = [];

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

const editTask = (elem) => {
	initTaskActions();
	let editInput = elem.querySelector('.editInput');
	let label = elem.querySelector('.item__label');

	if (!elem.classList.contains('editMode')) {
		label.style.display = 'none';
		editInput.style.display = 'block';
		editInput.focus();

		taskDeleteBtns.forEach((btn) => {
			btn.disabled = true;
		});
		taskCompleteBtns.forEach((btn) => {
			btn.disabled = true;
		});
		taskEditBtns.forEach((btn) => {
			btn.disabled = true;
		});
	}

	const inputChange = document.querySelectorAll('.editInput');

	inputChange.forEach((btn) => {
		btn.addEventListener('keydown', (e) => {
			if (e.keyCode === 13) {
				editInput.style.display = 'none';
				label.style.display = 'block';
				tasks.map((task) => {
					if (task.id == elem.dataset.todoKey) {
						task.text = editInput.value;
					}
				});
				renderAndSave(tasks);
				initTaskActions();
			} else if (e.keyCode === 27) {
				editInput.style.display = 'none';
				label.style.display = 'block';
				renderAndSave(tasks);
				initTaskActions();
			}
		});
	});

	elem.classList.toggle('editMode');
};
