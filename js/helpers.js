const getNowDate = () => {
	const options = {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	};
	return new Intl.DateTimeFormat(navigator.language, options).format(new Date());
};