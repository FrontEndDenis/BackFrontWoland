async function getData() {
	const request = await fetch('./static/js/city.json'),
		data = await request.json();
	return data;
}

async function renderCity() {
	const data = await getData();
	filterCity(data);
}

// Поиск городов
function filterCity(data) {
	const input = document.querySelector('.modal-w__search input'),
		btns = document.querySelectorAll('.modal-w__button-city input'),
		reset = document.querySelector('.modal-w__search .search-input__reset'),
		outputList = document.querySelector('.modal-w__list'),
		title = document.querySelector('.modal-w__subtitle'),
		createLi = item => `<li><a href="${item.pathCity}">${item.city}<svg class="svg-sprite-icon icon-arrow-right "><use xlink:href="/static/images/svg/symbol/sprite.svg#arrow-right"></use></svg></a></li>`;
		renderList = res => outputList.innerHTML = res.map(e => createLi(e)).join('');

	function filterValue() {
		let value = input.value.toLowerCase().replace(/[^a-zа-яё]/gi, ''),
			result;
		if (value != '') {
			result = data.find(el => el.country == checkBtnActive()).cityChild.filter(e => e.city.toLowerCase().replace(/[^a-zа-яё]/gi, '').startsWith(value));
			if (result.length === 0) title.textContent = 'Мы ничего не нашли'
			else title.textContent = 'Мы нашли ваш город?';
			renderList(result);
		}
		else {
			renderList(data.find(el => el.country == checkBtnActive()).cityChild.filter(e => e.popular == true))
			title.textContent = 'Популярные города';
		}
	}
	
	function checkBtnActive() {
		let active;
		btns.forEach(btn => {if (btn.checked == true) active = btn.dataset.city})
		return active;
	}

	input.addEventListener('input', filterValue);
	reset.addEventListener('click', () => setTimeout(filterValue, 1));
	btns.forEach(btn => btn.addEventListener('change', filterValue))
	filterValue();
}

document.addEventListener('DOMContentLoaded', renderCity);