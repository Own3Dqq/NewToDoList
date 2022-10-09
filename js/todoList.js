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
	let editInput = elem.querySelector('.editInput');
	let label = elem.querySelector('.item__label');

	if (elem.classList.contains('editMode')) {
		editInput.style.display = 'none';
		label.style.display = 'block';
		tasks.map((task) => {
			if (task.id == elem.dataset.todoKey) {
				task.text = editInput.value;
				console.log('1');
			}
		});

		renderAndSave(tasks);
	} else {
		label.style.display = 'none';
		editInput.style.display = 'block';
	}

	//toggle .editmode on the parent.
	elem.classList.toggle('editMode');
};
