const btnAuth = document.querySelector('.btn__log');
const btnReg = document.querySelector('.btn__reg');
const authorization = document.querySelector('.authorization');
const btnClose = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
const content = document.querySelector('.popup__content');

const formAuth = `
		<h3 class="popup__title">Log In</h3>
		<div class="popup__content-input">
			<div class="popup__inner">
				<input class="popup__input" type="text" placeholder="Enter your username" name="username" required />
			</div>	
			<div class="popup__inner">
				<input class="popup__input" type="password" placeholder="Enter your password" name="password" required />
			</div>
			<div class="popup__inner">
				<input class="popup__checkbox" type="checkbox" name="remember" />
				<span class="popup__text" >Запомнить меня</span>
			</div>
			<button class="popup__btn" type="submit">Отправить</button>
			</div>
`;

const formReg = `
		<h3 class="popup__title">Log Out</h3>
		<div class="popup__content-input">
			<div class="popup__inner">
				<input class="popup__input" type="text" placeholder="Enter your firts name" name="first_name" required />
			</div>
			<div class="popup__inner">
				<input class="popup__input" type="text" placeholder="Enter your last name" name="last_name" required />
			</div>
			<div class="popup__inner">
				<input class="popup__input" type="email" placeholder="Enter your email" name="email" required />
			</div>
			<div class="popup__inner">
				<input class="popup__input" type="password" placeholder="Enter your password" name="password" required />
			</div>
			<div class="popup__inner">
				<input
					class="popup__input"
					type="password"
					placeholder="Confirmed your password"
					name="password"
					required
				/>
			</div>
			<button class="popup__btn" type="submit">Отправить</button>
`;


const showModalWindow = (e) => {
	content.insertAdjacentHTML('beforeend', e.target.classList.contains('btn__log') ? formAuth : formReg);
	popup.classList.add('active');
};

const closeAuth = () => {
	popup.classList.remove('active');
	popupForm.classList.remove('active');
	content.innerHTML = '';
};


authorization.addEventListener('click', (e) => showModalWindow(e));
btnClose.addEventListener('click', closeAuth);
