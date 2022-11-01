function toggleLoader() {
	const loader = document.querySelector('.lds-dual-ring');
	loader.classList.toggle('preloader-active');
}

// Вызовем её вот так:
async function handleFormSubmit(body, method) {
	fetch(`https://reqres.in/api/${method}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
		.then((responce) => {
			if (responce.status !== 200) {
				alert('error', responce);
			}
			return responce.json();
		})
		.then((json) => localStorage.setItem('auth', JSON.stringify(json)));
}
