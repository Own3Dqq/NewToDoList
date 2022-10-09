const formData = {
	email: 'eve.holt@reqres.in',
	// password: 'pistol',
};

const retrieveFormValue = (e, data) => {
	e.preventDefault();

	fetch('https://reqres.in/api/register', {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify(data),
	})
		.then((responce) => {
			if (responce !== 200) {
				console.log('error');
			}

			return responce.json();
		})
		.then((json) => console.log('ss', json));
};

form.addEventListener('submit', (e) => retrieveFormValue(e, formData));
