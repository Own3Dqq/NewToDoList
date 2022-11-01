const btnAuth = document.querySelector('.btn__log');
const btnReg = document.querySelector('.btn__reg');

const popupWindow = document.querySelector('.modal');
const modalOverlay = document.querySelector('.overlay');
const btnClosePopupWindow = document.querySelector('.modal__close');

const formAuth = `
		<form class="modal__form" data-url='login' method="POST">
			<h3 class="modal__title">Log In</h3>
			<div class="modal__list">
				<div class="modal__item">
					<input class="modal__input" type="email" placeholder="Enter your email" name="email" required />
				</div>
				<div class="modal__item">
					<input class="modal__input" type="password" placeholder="Enter your password" name="password" required />
				</div>
					<div class="modal__item">
					<input class="modal__checkbox" type="checkbox" name="checked" />
					<span class="modal__text">Запомнить меня</span>
				</div>
			</div>
			<button class="modal__btn" data-url='login' type="submit">Отправить</button>
		</form>
`;

const formReg = `
		<form class="modal__form" data-url='register'  method="POST">
			<h3 class="modal__title">Registation</h3>
			<div class="modal__list">
				<div class="modal__item">
					<input class="modal__input" type="email" placeholder="Enter your email" name="email" required />
				</div>
				<div class="modal__item">
					<input class="modal__input" type="password" placeholder="Enter your password" name="password" required />
				</div>
				<div class="modal__item">
					<input class="modal__input" type="password" placeholder="Confirm your password" name="confirm-password" required />
				</div>
			</div>
				<div class="modal__item">
				<input class="modal__checkbox" type="checkbox" name="cheked" />
				<span class="modal__text">Правила использования</span>
			</div>
			<button class="modal__btn" data-url='register' type="submit">Отправить</button>
		</form>
`;

const showModalWindow = (e) => {
	// e.preventDefault();
	const modalContent = document.querySelector('.modal__content');
	modalContent.innerHTML = '';
	popupWindow.classList.add('active');
	modalOverlay.classList.add('active');

	modalContent.insertAdjacentHTML('beforeend', e.target.classList.contains('btn__log') ? formAuth : formReg);
	const sendRequest = document.querySelector('.modal__form');
	const emailInput = document.querySelector('input[name=email]');
	const passwordInput = document.querySelector('input[name=password]');

	sendRequest.addEventListener('submit', (e) => {
		e.preventDefault();
		const body = {
			email: emailInput.value,
			password: passwordInput.value,
		};

		const method = e.target.getAttribute('data-url');

		handleFormSubmit(body, method);
		closeModalWindow();
		checkedAuthKey();
	});
};

const closeModalWindow = () => {
	popupWindow.classList.remove('active');
	modalOverlay.classList.remove('active');
};

btnAuth.addEventListener('click', (e) => showModalWindow(e));
btnReg.addEventListener('click', (e) => showModalWindow(e));
btnClosePopupWindow.addEventListener('click', closeModalWindow);
