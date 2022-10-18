function serializeForm(formNode) {
	return new FormData(formNode);
}

const obj = {
	login: 'https://reqres.in/api/login',
	reg: 'https://reqres.in/api/register',
};

function toggleLoader() {
	const loader = document.querySelector('.lds-dual-ring');
	loader.classList.toggle('preloader-active');
}

/* 'https://reqres.in/api/' + e.dataset.url */

async function sendData(e, data) {
	return await fetch('https://reqres.in/api/' + e.dataset.url, {
		method: 'POST',
		mode: 'no-cors',
		headers: { 'Content-Type': 'multipart/form-data' },
		body: data,
	});
}

function onSuccess(formNode) {
	alert('Ваша заявка отправлена!');
	formNode.classList.toggle('hidden');
}

function onError(error) {
	alert(error);
}

// Вызовем её вот так:
async function handleFormSubmit(event) {
	event.preventDefault();
	const targetBtn = event.target;
	const data = serializeForm(event.target);

	toggleLoader();

	const { status, error } = await sendData(targetBtn, data);
	console.log(await sendData(data));
	toggleLoader();

	if (status === 200) {
		onSuccess(event.target);
	} else {
		onError(error);
	}
}
