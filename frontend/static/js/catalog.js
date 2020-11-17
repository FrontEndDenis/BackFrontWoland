// Каталог
'use strict';

renderCatalog();

async function renderCatalog() {
	const data = await getData();

	drawList(data);

	window.addEventListener('popstate', (evt) => {
		if (Array.isArray(evt.state)) {
			drawList(evt.state);
		} else {
			if (evt.state.childs && evt.state.childs.length > 0) {
				drawList(evt.state.childs);
			}
		}
	});
}

async function getData() {
	const request = await fetch('./static/js/catalog.json'),
		data = await request.json();
	return data;
}

function drawList(data) {
	if (!data && data.length === 0) {
		return;
	}

	const main = document.querySelector('.bottom-line__catalog');

	const app = document.createElement('div');
	app.classList.add('catalog-menu');

	if (main) {
		main.innerHTML = '';
		app.append(getList(data));
		main.append(app);
	}
	// addHandleLink(data);
}

function getList(data) {
	const div = document.createElement('div'),
		items = data.map(item => {
			let subUl = '';
			if (item && item.childs && item.childs.length > 0) {
				const subList = getSubList(item.childs),
					subItems = subList.querySelectorAll('li');

				for (let i = 4; i < subItems.length; i++) {
					subItems[i].style.display = 'none';
				}

				if (subItems.length >= 4) {
					const li = document.createElement('li');
					li.innerHTML = `<a href="${item.sitePath}" class="icon-back">Еще` + ' ' + (subItems.length - 4) + `<div class="icon-back__icon"><svg class="svg-sprite-icon icon-arrow"><use xlink:href="static/images/svg/symbol/sprite.svg#arrow"></use></svg></div>` + `</a>`;
					li.classList.add('catalog-menu__stell')
					subList.appendChild(li);
				}
				subUl = subList.outerHTML;
			}

			return `
				<div class="catalog-menu__item">
					<a href="${item.sitePath}" class="catalog-menu__title">${item.name}</a>
					${subUl}
				</div>
			`;
		}).join('');

	div.classList.add('catalog-menu__list');
	div.innerHTML = items;
	return div;
}

function getSubList(data) {
	const ul = document.createElement('ul'),
		items = data.map(item => {
			return `
				<li>
					<a href="${item.sitePath}">${item.name}</a>
				</li>
			`;
		}).join('');

	ul.innerHTML = items;

	return ul;
}

// function addHandleLink(data) {
// 	const links = document.querySelectorAll('.catalog-menu__item > .catalog-menu__title, .catalog-menu__stell > a'),
// 		suBlink = document.querySelectorAll('.catalog-menu__item li:not(.catalog-menu__stell) > a');
// 	links.forEach(link => {
// 		link.addEventListener('click', evt => {
// 			evt.preventDefault();
// 			const href = link.getAttribute('href'),
// 				result = data.find(el => el.sitePath === href);
// 			if (result && result.childs && result.childs.length > 0) {
// 				drawList(result.childs);
// 				history.pushState(result, '', '');
// 			} else {
// 				open('https://leroymerlin.ru' + href, '_blank');
// 			}
// 		});
// 	});

// 	suBlink.forEach(link => {
// 		link.addEventListener('click', evt => {
// 			evt.preventDefault();
// 			const parentHref = link.parentElement.parentElement.parentElement.querySelector('.catalog-menu__item > .catalog-menu__title, .catalog-menu__stell > a').getAttribute('href'),
// 				href = link.getAttribute('href');
// 			let result = data.find(el => el.sitePath === parentHref);
// 			result = result.childs.find(el => el.sitePath === href);
// 			if (result && result.childs && result.childs.length > 0) {
// 				drawList(result.childs);
// 				history.pushState(result, '', '');
// 			} else {
// 				open('https://leroymerlin.ru' + href, '_blank');
// 			}
// 		});
// 	});
// }
