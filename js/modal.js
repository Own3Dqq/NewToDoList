const btnAuth = document.querySelector('.btn__log');
const btnReg = document.querySelector('.btn__reg');

const popupWindow = document.querySelector('.modal');
const modalOverlay = document.querySelector('.overlay');
const btnClosePopupWindow = document.querySelector('.modal__close');

const formAuth = `
	<form class="modal__form"  data-url=login action="">
		<h3 class="modal__title">Log In</h3>
		<div class="modal__list">
			<div class="modal__item">
				<input class="modal__input" type="email" placeholder="Enter your email" name="email" required />
			</div>
			<div class="modal__item">
				<input class="modal__input" type="password" placeholder="Enter your password" name="password" required />
			</div>
		</div>
		<div class="modal__item">
			<input class="modal__checkbox" type="checkbox" name="remember" />
			<span class="modal__text">Запомнить меня</span>
		</div>
		<button class="modal__btn" type="submit">Отправить</button>
	</form>
`;

const formReg = `
		<form class="modal__form" data-url=reg action="">
		<h3 class="modal__title">Registation</h3>
		<div class="modal__list">
			<div class="modal__item">
				<input class="modal__input" type="email" placeholder="Enter your email" name="email" required />
			</div>
			<div class="modal__item">
				<input class="modal__input" type="password" placeholder="Enter your password" name="password" required />
			</div>
			<div class="modal__item">
				<input class="modal__input" type="password" placeholder="Confirm your password" name="password" required />
			</div>
		</div>
		<div class="modal__item">
		<input class="modal__checkbox" type="checkbox" name="remember" />
		<span class="modal__text">Правила использования</span>
	</div>
		<button class="modal__btn" data-url=reg type="submit">Отправить</button>
		</form>
`;

const showModalWindow = (e) => {
	e.preventDefault();
	const modalContent = document.querySelector('.modal__content');
	modalContent.innerHTML = '';
	popupWindow.classList.add('active');
	modalOverlay.classList.add('active');

	modalContent.insertAdjacentHTML('beforeend', e.target.classList.contains('btn__log') ? formAuth : formReg);
	const applicantForm = document.querySelector('.modal__form');
	applicantForm.addEventListener('submit', handleFormSubmit);
};

const closeModalWindow = () => {
	popupWindow.classList.remove('active');
	modalOverlay.classList.remove('active');
};

btnAuth.addEventListener('click', (e) => showModalWindow(e));
btnReg.addEventListener('click', (e) => showModalWindow(e));
btnClosePopupWindow.addEventListener('click', closeModalWindow);

/*  */
