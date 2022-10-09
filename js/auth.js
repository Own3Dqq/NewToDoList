// const formAuth = document.querySelector('.popup__btn');

// const forms = () => {
// 	const form = document.querySelector('.popup__form'),
// 		inputs = document.querySelectorAll('.popup__input');

// 	// const message = {
// 	// 	loading: 'Загрузка...',
// 	// 	success: 'Спасибо! Скоро мы с вами свяжемся',
// 	// 	failure: 'Что-то пошло не так...',
// 	// };

// 	const postData = async (url, data) => {
// 		// document.querySelector('.status').textContent = message.loading;
// 		let res = await fetch(url, {
// 			method: 'POST',
// 			body: data,
// 		});

// 		return await res.text();
// 	};

// 	const clearInputs = () => {
// 		inputs.forEach((item) => {
// 			item.value = '';
// 		});
// 	};

// 	form.forEach((item) => {
// 		item.addEventListener('submit', (e) => {
// 			e.preventDefault();

// 			// let statusMessage = document.createElement('div');
// 			// statusMessage.classList.add('status');
// 			// item.appendChild(statusMessage);

// 			const formData = new FormData(item);

// 			postData('https://reqres.in/api/register', formData)
// 				.then((res) => {
// 					console.log(res);
// 					// statusMessage.textContent = message.success;
// 				})
// 				.catch(() => console.log('Error'))
// 				.finally(() => {
// 					clearInputs();
// 					// setTimeout(() => {
// 					// 	statusMessage.remove();
// 					// }, 5000);
// 				});
// 		});
// 	});

//   closeAuth()
// };

/* Auth - Regist */
// const sendFormData = async (url, data) => {
// 	let res = await fetch(url, {
// 		method: 'POST',
// 		body: data,
// 	});
// 	return await res
// };

// function retrieveFormValue(e) {
// 	e.preventDefault();
// 	let url = 'https://reqres.in/api/register';

// const formData = new FormData(form);
// const values = Object.fromEntries(formData.entries());

// 	sendFormData(url, values)
// 		.then((res) => {
// 			console.log(res);
// 		})
// 		.catch(() => console.log('Error'));
// }

// const formData = {
// 	name: 'morpheus',
// 	job: 'leader',
// };

// const retrieveFormValue = (data) => {
// 	fetch('https://reqres.in/api/users', {
// 		method: 'POST',
// 		body: data,
// 	})
// 		.then((responce) => responce.json())
// 		.then((json) => {
// 			console.log(json);
// 		})
// 		.catch(() => {
// 			console.error(responce);
// 		});
// };

// form.addEventListener('submit', retrieveFormValue(formData));
