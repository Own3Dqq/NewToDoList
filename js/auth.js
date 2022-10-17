function serializeForm(formNode) {
	return new FormData(formNode);
}

const obj = {
	reg: 'https://reqres.in/api/register',
	login: 'https://reqres.in/api/login',
};

async function sendData(e, data) {
	return await fetch(e.dataset.url === 'login' ? obj.login : obj.reg, {
		method: 'POST',
		headers: { 'Content-Type': 'multipart/form-data' },
		body: data,
	});
}

function toggleLoader() {
	const loader = document.querySelector('.lds-dual-ring');
	loader.classList.toggle('preloader-active');
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

	const data = serializeForm(event.target);

	toggleLoader();

	const { status, error } = await sendData(event.target, data);

	status === 200 ? onSuccess() : onError(error);

	toggleLoader();
}
