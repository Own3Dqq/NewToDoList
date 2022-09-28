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

const editTask = (id) => {
	console.log(id);
};
