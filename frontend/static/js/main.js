const modalList = {
	basket: new bootstrap.Modal(document.getElementById('modal-basket')),
	search: new bootstrap.Modal(document.getElementById('modal-search')),
	city: new bootstrap.Modal(document.getElementById('modal-city')),
	callback: new bootstrap.Modal(document.getElementById('modal-callback')),
	
}

if(document.getElementById('modal-filters')) {
	modalList['filters'] = new bootstrap.Modal(document.getElementById('modal-filters'));
}

svg4everybody();

// Инициализация слайдеров
function slidersInit() {
	const interleaveOffset = .5;
	let mainText = ['Бесплатная доставка', 'Скидка на 1-ый заказ', 'Акции месяца', 'Новый Год', 'Текст из массива js'];
	const mainSlider = new Swiper('.main-slider', {
		slidesPerView: 1,
		loop: true,
		speed: 1000,
		watchSlidesProgress: true,
		mousewheelControl: true,
		keyboardControl: true,
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.s-main-slider__pagination',
			clickable: true,
			renderBullet: function (index, className) {
				return `<span class="` + className + `">` + (mainText[index]) + `</span>`;
			}
		},
		on: {
			progress(swiper) {
				for (let i = 0; i < swiper.slides.length; i++) {
					const slideProgress = swiper.slides[i].progress;
					const innerOffset = swiper.width * interleaveOffset;
					const innerTranslate = slideProgress * innerOffset;

					swiper.slides[i].querySelector('.main-slider__item').style.transform = `translateX(${innerTranslate}px)`;
				}
			},
			touchStart(swiper) {
				for (let i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = '';
				}
			},
			setTransition(swiper, speed) {
				for (let i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = speed + 'ms';
					swiper.slides[i].querySelector('.main-slider__item').style.transition = `all ${speed}ms ease 0s`;
				}
			}
		}
	})
	const popularCategoriesSlider = new Swiper('.popular-categories-slider', {
		spaceBetween: 24,
		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			576: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
			1024: {
				slidesPerView: 4,
			}
		},
		navigation: {
			prevEl: '.popular-categories-slider__prev',
			nextEl: '.popular-categories-slider__next',
		},
	})
	const catalogSlider = new Swiper('.catalog-slider', {
		spaceBetween: 24,
		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			576: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
			1024: {
				slidesPerView: 4,
			}
		},
		navigation: {
			prevEl: '.catalog-slider__prev',
			nextEl: '.catalog-slider__next',
		},
	})
	const manufacturingSlider = new Swiper('.manufacturing-slider', {
		spaceBetween: 24,
		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			576: {
				slidesPerView: 2,
			},
			1024: {
				slidesPerView: 3,
			}
		},
		navigation: {
			prevEl: '.manufacturing-slider__prev',
			nextEl: '.manufacturing-slider__next',
		},
	})
	const stocksSlider = new Swiper('.stocks-slider', {
		spaceBetween: 24,
		loop: true,
		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			576: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
			1024: {
				slidesPerView: 4,
			},
			1200: {
				slidesPerView: 5,
			}
		},
		navigation: {
			prevEl: '.stocks-slider__prev',
			nextEl: '.stocks-slider__next',
		},
	})
	const newsSlider = new Swiper('.news-slider', {
		spaceBetween: 24,
		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			576: {
				slidesPerView: 2,
			},
			1024: {
				slidesPerView: 3,
			}
		},
		navigation: {
			prevEl: '.news-slider__prev',
			nextEl: '.news-slider__next',
		},
	})
}
slidersInit();

// Запуск функций при изменении разрешения экрана
document.addEventListener("DOMContentLoaded", function () {
	window.onresize = () => {
		heightCatalogCard();
		headerFixed();
		allCardHeight();
		descriptionStocksCard();
		gostWidth();
		sidebar();
	};
});

// Проверка с какого устройства зашли на сайт
function isMobile() {
	let isMobile = {
		Android: function () { return navigator.userAgent.match(/Android/i); },
		BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
		iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
		Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
		Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	}
	if (isMobile.any()) {
		return true
	} else {
		return false
	}
}

// Анимации
function animateCSS(element, animation) {
	return new Promise((resolve, reject) => {
		const animationName = animation;
		const node = (element.nodeType === 1) ? element : document.querySelector(element);

		node.classList.add('animation', ...animationName.split(' '));

		function handleAnimationEnd() {
			node.classList.remove('animation', ...animationName.split(' '));
			resolve('Animation ended');
		}

		node.addEventListener('animationend', handleAnimationEnd, { once: true });
	});
}

// Валидация
(function () {
	window.addEventListener('load', function () {
		let forms = document.getElementsByClassName('needs-validation');
		let validation = Array.prototype.filter.call(forms, function (form) {
			form.addEventListener('submit', function (event) {
				if (form.checkValidity() === false) {
					event.preventDefault();
					event.stopPropagation();
				}
				form.classList.add('was-validated');
			}, false);
		});
	}, false);
})();

// Фиксирование шапки
function headerFixed() {
	const mediaQuery = window.matchMedia('(min-width: 1024px)');
	if (mediaQuery.matches) {
		const header = document.querySelector('.header'),
		offsetHeight = header.offsetHeight;

		window.addEventListener('load', () => {
			const height = window.innerHeight;
			let lostY = 0;

			document.addEventListener('scroll', () => {
				if (lostY >=900) {
					if (window.scrollY > lostY) {
						header.classList.add('hide');
					} else {
						if (window.scrollY > height || lostY < offsetHeight) header.classList.remove('hide');
					}
				}
				lostY = window.scrollY;
			});
		});
	}
}
headerFixed();

// Отслеживаем событие Bootstrap modal window
function eventBsModal(elem, events, fn) {
	document.querySelector(elem).addEventListener(`${events}.bs.modal`, function (e) {
		fn()
	});
}

// Поиск в шапке
function openSearchHeader() {
	const btn = document.querySelector('#open-search-header'),
		bottomLine = document.querySelector('.bottom-line'),
		btnClose = btn.previousElementSibling.querySelector('.search-input__close'),
		input = btn.previousElementSibling.querySelector('input');

	const show = () => {
		bottomLine.classList.add('open-search');
		btn.previousElementSibling.classList.add('active');
		input.focus();
		animateCSS(btn.previousElementSibling, 'fade-in')
	}

	const hide = () => {
		bottomLine.classList.remove('open-search');
		btn.previousElementSibling.classList.remove('active');
		input.value = '';
	}

	btn.addEventListener('click', show)
	btnClose.addEventListener('click', hide)
}
openSearchHeader();

// Компания
function catalogListInfo() {
	const elem = document.querySelector('.catalog-list'),
		block = elem.querySelector('.catalog-list__wrap');

	const show = () => {
		elem.classList.add('active');
		animateCSS(block, 'fade-in');
	}

	const hide = () => {
		elem.classList.remove('active');
	}
	elem.addEventListener('mouseenter', show, false);
	elem.addEventListener('mouseleave', hide, false);
}
catalogListInfo();

// Каталог
function catalogMenu() {
	const bottom = document.querySelector('.bottom-line__left'),
		panel = document.querySelector('.bottom-line__navitagion-panel'),
		elems = panel.querySelectorAll('li'),
		block = document.querySelector('.bottom-line__catalog');

	const checkEl = item => {
		if (item.classList.contains('active')) {
			addEl(item)
		} else if (item.classList.contains('spacial')) {
			addEl(item)
			block.classList.remove('active');
		} else {
			addEl(item)
			show();
		}
	}

	const addEl = item => {
		elems.forEach(el => el.classList.remove('active'))
		panel.classList.add('open-catalog');
		item.classList.add('active');
	}

	const hide = item => {
		panel.classList.remove('open-catalog');
		block.classList.remove('active', 'fade-in');
		item.classList.remove('active');
	}

	const show = () => {
		block.classList.add('active', 'fade-in');
	}

	elems.forEach(elem => {
		elem.addEventListener('mouseenter', function () {
			checkEl(elem);
		}, false);
		bottom.addEventListener('mouseleave', function () {
			hide(elem);
		}, false);
	})
}
catalogMenu();

// Табы
function tabs() {
	const tabs = document.querySelectorAll('.tabs');
	if (tabs.length == 0) return;
	show(document.querySelector('.tabs'), 0);
	tabs.forEach((tab) => {
		const navs = tab.querySelectorAll('.tabs__nav-item');
		navs.forEach((nav, index) => {
			nav.addEventListener('click', (evt) => {
				evt.preventDefault();
				if (!navs[index].classList.contains('active')) {
					show(tab, index);
				}
			});
		});
	});

	function show(parent, id) {
		const navs = parent.querySelectorAll('.tabs__nav-item'),
			contents = parent.querySelectorAll('.tabs__content-item');
		navs.forEach((nav) => nav.classList.remove('active'));
		contents.forEach((content) => content.classList.remove('active'));
		navs[id].classList.add('active');
		contents[id].classList.add('active', 'fade-in-scale');
	}
}
tabs();

// Кнопки +- в карточке
function inputNumber() {
	const el = document.querySelectorAll('.input-number');

	el.forEach((e) => {
		const input = e.querySelector('.input-number__field'),
			plus = e.querySelector('.input-number__plus'),
			minus = e.querySelector('.input-number__minus');

		const delStr = item => {
			input.value = parseInt(item.replace(/[^\d]/g, ''));
		}

		const addUnits = item => {
			return item += ' шт.'
		}

		if (input && plus && minus) {
			plus.addEventListener('click', () => {
				delStr(input.value);
				if (input.max && Number(input.value) + 1 <= input.max) {
					input.value = addUnits((Number(input.value) + 1));
				}
			});

			minus.addEventListener('click', () => {
				delStr(input.value);
				(input.min && Number(input.value) - 1 >= input.min) ? input.value = addUnits((Number(input.value) - 1)) : input.value = 1 + ' шт.'

			});

			input.addEventListener('input', () => {
				delStr(input.value);
				input.value = input.value.replace(/[^0-9+]/, '');
				if (input.max && Number(input.value) > input.max) {
					input.value = input.max;
				} else if (input.value === 'aN') {
					input.value = '';
				}
			});
			input.addEventListener('change', () => {
				input.value = input.value + ' шт.';
			});
		}
	});
}
inputNumber();

// Сброс текста в поиске
function resetSearch() {
	const parent = document.querySelectorAll('.search-input--reset');

	const addReset = elem => {
		const input = elem.querySelector('input'),
			btnReset = elem.querySelector('.search-input__reset');

		(input.value != '') ? btnReset.classList.add('reset') : btnReset.classList.remove('reset')

		btnReset.addEventListener('click', () => {
			input.value = '';
			input.focus();
			btnReset.classList.remove('reset');
		})
	}

	parent.forEach(item => {
		item.addEventListener('input', () => addReset(item))
	});
}
resetSearch()

// Склонение слов
function declOfNum(number, titles) {
	let cases = [2, 0, 1, 1, 1, 2];
	return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

// Корзина
class Basket {
	constructor(className) {
		this.element = document.querySelector(className);
	}

	show(n, classElem) {
		const sections = this.element.querySelectorAll(classElem);

		this.hideAll(classElem);

		sections[n].classList.add('show-section', 'fade-in');
	}

	hideAll(classElem) {
		const sections = this.element.querySelectorAll(classElem);

		sections.forEach((section) => {
			section.classList.remove('show-section');
		});
	}
}

window.basket = new Basket('.modal-basket');

const parent = document.querySelector('.modal-basket'),
	section = parent.querySelectorAll('.modal-basket__section'),
	item = parent.querySelectorAll('.modal-basket__basket-item'),
	request = parent.querySelector('.modal-basket__request'),
	clearList = parent.querySelector('.modal-basket__clear-list'),
	yes = parent.querySelector('.modal-basket__yes'),
	no = parent.querySelector('.modal-basket__no'),
	prevBasket = parent.querySelector('.modal-basket__prev-basket'),
	counter = parent.querySelector('.modal-basket__count-product'),
	delCard = document.querySelectorAll('.basket-card__close');

let count = 0,
	countSec = 0;

function basketApp() {
	document.addEventListener('changeBasket', (evt) => {
		const cards = document.querySelectorAll('.basket-card');

		counter.textContent = `${cards.length + ' ' + declOfNum(cards.length, ['товар', 'товара', 'товаров'])}`;

		if (cards.length > 0) {
			basket.show(countSec, '.modal-basket__section');
			basket.show(count, '.modal-basket__basket-item');
		} else {
			basket.show(countSec, '.modal-basket__section');
			basket.show(2, '.modal-basket__basket-item');
			counter.textContent = `Нет товаров`;
		}
	});

	basket.show(0, '.modal-basket__section')
	basket.show(0, '.modal-basket__basket-item')
	document.dispatchEvent(new Event('changeBasket'));
}
basketApp();

clearList.addEventListener('click', () => {
	count++;
	basket.show(count, '.modal-basket__basket-item');
});

delCard.forEach((del) => {
	del.addEventListener('click', (evt) => {
		evt.preventDefault();

		del.closest('.basket-card').remove();

		document.dispatchEvent(new Event('changeBasket'));
	});
});

yes.addEventListener('click', (evt) => {
	evt.preventDefault();

	const cards = document.querySelectorAll('.basket-card');

	cards.forEach(card => card.remove());

	document.dispatchEvent(new Event('changeBasket'));
});

no.addEventListener('click', () => {
	count--;
	basket.show(count, '.modal-basket__basket-item');

	document.dispatchEvent(new Event('changeBasket'));
});

request.addEventListener('click', () => {
	countSec++;
	basket.show(countSec, '.modal-basket__section');
})

prevBasket.addEventListener('click', () => {
	countSec--;
	basket.show(countSec, '.modal-basket__section');
});


// Custom select
function select() {
	let selectHeader = document.querySelectorAll('.select__header'),
		selectItem = document.querySelectorAll('.select__item');

	selectHeader.forEach(item => {
		item.addEventListener('click', selectToggle)
	});
	selectItem.forEach(item => {
		item.addEventListener('click', selectChoose)
	});
	function selectToggle() {
		this.parentElement.classList.toggle('active');
	}
	function selectChoose() {
		let text = this.innerText,
			select = this.closest('.select'),
			currentText = select.querySelector('.select__text');
		currentText.setAttribute('value', text)
		currentText.innerText = text;
		select.classList.remove('active');
	}
};
select();

// Загрузка файла
function inputFile() {
	const inputFile = document.querySelectorAll('.input-file');

	const processing = elem => {
		const input = elem.querySelector('input'),
			file = input.files[0],
			txt = elem.querySelector('.input-file__txt'),
			sizeTxt = elem.querySelector('.input-file__size'),
			resetBtn = elem.querySelector('.input-file__reset'),
			parts = file.name;

		const reset = e => {
			e.preventDefault();
			e.stopPropagation();
			if (input.value) {
				txt.innerText = 'Добавить файл';
				sizeTxt.innerText = 'до 10Mb';
				elem.classList.remove('error', 'add-file')
				input.value = '';
			}
		}

		let fileSize = parseFloat((file.size / 1024 ** 2).toFixed(4));

		if (fileSize > 10) {
			elem.classList.add('error', 'add-file');
			txt.innerText = parts;
			sizeTxt.innerText = 'Файл слишком большой';
			return
		} else {
			elem.classList.remove('error');
			elem.classList.add('add-file')
		}

		resetBtn.addEventListener('click', reset);

		sizeTxt.innerText = fileSize + 'Mb';
		txt.innerText = parts;
	}

	inputFile.forEach(item => {
		item.addEventListener('change', () => processing(item));
	});
}
inputFile()

// Аккардион
function accordionEvent() {
	const acc = document.querySelectorAll('.accordion');

	acc.forEach(item => {
		item.addEventListener('click', (evt) => {
			evt.preventDefault();

			let panel = item.nextElementSibling;

			const hideAll = () => accordion.hideAll();

			if (item.classList.contains('accordion--hide')) hideAll();

			if (panel.style.maxHeight) {
				accordion.hide(item)
			} else {
				accordion.show(item)
			}
		});
	});
}
accordionEvent();

class Accordion {
	constructor(className) {
		this.element = document.querySelectorAll(className)
	}
	show(item) {
		let panel = item.nextElementSibling;
		panel.style.maxHeight = panel.scrollHeight + 'px';
		item.classList.add('active');
	}
	hide(item) {
		let panel = item.nextElementSibling;
		panel.style.maxHeight = null;
		item.classList.remove('active');
	}
	hideAll() {
		this.element.forEach(elem => {
			let block = elem.nextElementSibling;
			block.style.maxHeight = null;
			elem.classList.remove('active')
		})
	}
}
window.accordion = new Accordion('.accordion');


// Закрытие модальных окон
function allCloseModal() {
	const btns = document.querySelectorAll('.top-line__mobile button')

	btns.forEach(btn => btn.classList.remove('open'))

	for (let key in modalList) {
		modalList[key].hide();
	}
	openMobileMenu.hide();
}

// Кнопка открытия мобильных кнопок поиска и корзины
function openMobileBtn(btnClass, icon, modalListElem, modalClass) {
	const btn = document.querySelector(btnClass);

	const open = () => {
		allCloseModal();
		btn.classList.add('open');
		if (icon) animateCSS(btn.querySelector('.icon-close'), 'fade-in')
	}

	const close = () => {
		btn.classList.remove('open');
		if (icon) animateCSS(btn.querySelector(icon), 'fade-in')
	}

	btn.addEventListener('click', () => {
		(btn.classList.contains('open')) ? close() : open();
		modalListElem.toggle();
	})
	eventBsModal(modalClass, 'hide', close)
}
openMobileBtn('#open-basket', '.icon-basket', modalList.basket, '#modal-basket')
openMobileBtn('#open-search', '.icon-search', modalList.search, '#modal-search')
openMobileBtn('#open-callback', false, modalList.callback, '#modal-callback')
openMobileBtn('#open-city', false, modalList.city, '#modal-city')

// Открытие меню
function mobileMenu() {
	const menu = document.querySelector('.mobile-menu'),
		over = menu.querySelector('.mobile-menu__overlay'),
		menuBtn = document.querySelector('#mobile-menu');

	const showMenu = () => {
		openMobileMenu.show();
		menuBtn.classList.toggle('open');
		animateCSS(menuBtn, 'fade-in')
	}

	const closeMenu = () => {
		menuBtn.classList.remove('open');
		openMobileMenu.hide();
	}

	menuBtn.addEventListener('click', () => {
		(menuBtn.classList.contains('open')) ? closeMenu() : showMenu();
	});
	over.addEventListener('click', () => {
		closeMenu();
	})
}
mobileMenu()

class OpenMobileMenu {
	constructor(className) {
		this.element = document.querySelector(className);
		this.over = this.element.querySelector('.mobile-menu__overlay');
	}
	show() {
		allCloseModal();
		document.querySelector('body').classList.add('menu-open');
		this.element.style.right = '0';
		this.over.classList.add('active');
		animateCSS(this.over, 'fade-in');
	}

	hide() {
		document.querySelector('body').classList.remove('menu-open');
		this.element.style.right = '-100%';
		this.over.classList.remove('active');
	}
}

window.openMobileMenu = new OpenMobileMenu('.mobile-menu');

// Открытие каталога в мобильном меню
function catalogMobMenu() {
	const items = document.querySelectorAll('.catalog-m-menu__item a'),
		prev = document.querySelectorAll('.catalog-m-menu__prev');

	const show = item => {
		let block = item.nextElementSibling;
		if (!block) return
		block.style.transform = 'translate(0)';
	}

	const fade = item => {
		let block = item.closest('.catalog-m-menu__sub')
		block.style.transform = 'translate(100%)';
	}

	items.forEach(item => {
		item.addEventListener('click', () => show(item))
	});

	prev.forEach(item => {
		item.addEventListener('click', () => fade(item))
	})
}
catalogMobMenu();

// Высота скролла карточек Каталога
function heightCatalogCard() {
	const cards = document.querySelectorAll('.catalog-card');

	const calcHeight = elem => {
		const hiddenCard = elem.querySelector('.catalog-card__hidden'),
			scrollList = elem.querySelector('.catalog-card__list'),
			titleCard = elem.querySelector('.catalog-card__h-title');

		if(!hiddenCard) return

		let heightCalc = 0;

		heightCalc = hiddenCard.offsetHeight - ((titleCard.offsetHeight + 20) + 48);
		scrollList.style.maxHeight = heightCalc + 'px';
	}

	cards.forEach(item => {
		calcHeight(item)
	})
}
heightCatalogCard()

// Секция как мы работаем
function howWork() {
	const items = document.querySelectorAll('.s-main-work__item .s-main-work__header'),
		images = document.querySelectorAll('.s-main-work__block img');

	if(items.length == 0) return

	let index = 0;

	function addClass(elem, ind) {
		elem[ind].classList.add('active');
	}

	function searchActive() {
		items.forEach(item => {
			item.classList.remove('active');
			accordion.hide(item);
		})
		images.forEach(img => {
			if (img.classList.contains('active')) {
				animateCSS(img, 'fade-in-scale-bottom');
				img.addEventListener('animationend', () => {
						img.classList.remove('active')
				}, { once: true });
			}
		})
	}

	const showBlock = elem => {
		index = Number(elem.getAttribute('data-id'));
		if (!images[index].classList.contains('active')) {
			searchActive();
			allClass(index);
		}
	}
	
	function allClass(index) {
		addClass(items, index);
		addClass(images, index);
		animateCSS(images[index], 'fade-in-scale-top');
		accordion.show(items[index]);
	}

	items.forEach(item => {
		item.addEventListener('click', () => showBlock(item))
	})
	showBlock(items[index])
}
howWork()

// // Анимация грузовика
function animationTruck(boolean) {
	const truck = document.querySelector('.s-main-delivery__img');
	if (truck == 0) return
	(boolean) ? truck.classList.add('active') : truck.classList.remove('active');
}

// Зона видимости
function isOnVisibleSpace(element) {
	let bodyHeight = window.innerHeight,
		elemRect = element.getBoundingClientRect(),
		offset = elemRect.top;

	if (offset < 0) return false;
	if (offset > bodyHeight) return false;
	return true;
}

let listenedElements = [];

window.onscroll = function () {
	listenedElements.forEach(item => {
		let result = isOnVisibleSpace(item.el);
		if (item.el.isOnVisibleSpace && !result) {
			item.el.isOnVisibleSpace = false;
			item.outVisibleSpace(item.el);
			return;
		}
		if (!item.el.isOnVisibleSpace && result) {
			item.el.isOnVisibleSpace = true;
			item.inVisibleSpace(item.el);
			return;
		}
	});
}

function onVisibleSpaceListener(elementId, cbIn, cbOut) {
	let el = document.querySelector(elementId);
	if(el == null) return
	listenedElements.push({
		el: el,
		inVisibleSpace: cbIn,
		outVisibleSpace: cbOut
	});
}

onVisibleSpaceListener('.s-main-delivery__text', el => {animationTruck(true)},el => {});

// Высота карточек
function heightStocksCard(el) {
	const cards = document.querySelectorAll(el);
	let maxHeightCard = 0;

	cards.forEach(card => {
		if (card.offsetHeight > maxHeightCard) {
			maxHeightCard = card.offsetHeight
		}
	});
	cards.forEach(card => card.style.minHeight = maxHeightCard + 'px')
}



function allCardHeight() {
	heightStocksCard('.stocks-card');
	heightStocksCard('.popular-categories-card');
}
allCardHeight();

// Описание карточки
function descriptionStocksCard() {
	const desc = document.querySelectorAll('.stocks-card__warning'),
		btns = document.querySelectorAll('.warning__close');
	if(desc.length == 0) return

	const show = elem => {
		let element = elem.querySelector('.warning__wrap');
		desc.forEach(el => el.querySelector('.warning__wrap').classList.remove('active'))
		element.classList.add('active', 'fixed');
		isHidden(element);
		if(countHidden(element).right > 0) {
			element.style.right = 0 + 'px';
			element.classList.remove('fixed');
		}
		element.classList.remove('fixed');
	}

	const hide = elem => {
		elem.querySelector('.warning__wrap').classList.remove('active');
		
	}

	desc.forEach(el => {
		if(isMobile()) {
			el.addEventListener('click', () => show(el));
		} else {
			el.addEventListener('mouseenter', () => show(el));
			el.addEventListener('mouseleave', () => hide(el));
		}
	});

	btns.forEach(btn => btn.addEventListener('click', (e) => {
		e.stopPropagation();
		btn.closest('.warning__wrap').classList.remove('active');
	}))
}
descriptionStocksCard()

// Положение элемента в окне
function isHidden(element) {
	const elementRect = element.getBoundingClientRect();
	const elementHidesUp = elementRect.top < 0;
	const elementHidesLeft = elementRect.left < 0;
	const elementHidesDown = elementRect.bottom > window.innerHeight;
	const elementHidesRight = elementRect.right > window.innerWidth;
	const elementHides = elementHidesUp || elementHidesLeft || elementHidesDown || elementHidesRight;
	return elementHides;
}

function countHidden(element) {
	const elementRect = element.getBoundingClientRect();
	const elementHides = { 
		// up: Math.max(0,0 - elementRect.top),
		// left: Math.max(0,0 - elementRect.left),
		// down: Math.max(0,elementRect.bottom - window.innerHeight),
		right: Math.max(0,elementRect.right - window.innerWidth)
	};
	return elementHides;
}

// Компания
function breadCrumbs() {
	if(isMobile()) return
	
	const elems = document.querySelectorAll('.breadcrumbs__item');

	const show = (item, block) => {
		item.classList.add('active');
		animateCSS(block, 'fade-in');
	}

	const hide = (item) => {
		item.classList.remove('active');
	}

	elems.forEach(elem => {
		elem.addEventListener('mouseenter', () => {
			const block = elem.querySelector('.breadcrumbs__sidebar');
			if(block) show(elem, block)
		}, false);
		elem.addEventListener('mouseleave', () => {
			hide(elem)
		}, false);
	});
}
breadCrumbs();

//Пагинация
const Pagination = {
	code: '',

	Extend: function(data) {
		data = data || {};
		Pagination.size = data.size || 300;
		Pagination.page = data.page || 1;
		Pagination.step = data.step || 2;
	},

	Add: function(s, f) {
		for (let i = s; i < f; i++) {
			Pagination.code += '<li><a>' + i + '</a></li>';
		}
	},

	Last: function() {
		Pagination.code += '<li><i>...</i></li><li><a>' + Pagination.size + '</a></li>';
	},

	First: function() {
		Pagination.code += '<li><a>1</a></li><li><i>...</i></li>';
	},

	Click: function() {
		Pagination.page = +this.innerHTML;
		Pagination.Start();
	},

	Input: function(n) {
		if(n > Pagination.size || n < 1) return
		Pagination.page = n;
		Pagination.Start();
	},

	Prev: function() {
		Pagination.page--;
		if (Pagination.page < 1) {
			Pagination.page = 1;
		}
		Pagination.Start();
	},

	Next: function() {
		Pagination.page++;
		if (Pagination.page > Pagination.size) {
			Pagination.page = Pagination.size;
		}
		Pagination.Start();
	},

	Bind: function() {
		let a = Pagination.e.getElementsByTagName('a');
		for (let i = 0; i < a.length; i++) {
			if (+a[i].innerHTML === Pagination.page) a[i].className = 'current';
			a[i].addEventListener('click', Pagination.Click, false);
		}
	},

	Finish: function() {
		Pagination.e.innerHTML = Pagination.code;
		Pagination.code = '';
		Pagination.Bind();
		Pagination.ShowButtons()
	},

	Start: function() {
		if (Pagination.size < Pagination.step * 2 + 4) {
			Pagination.Add(1, Pagination.size + 1);
		}
		else if (Pagination.page < Pagination.step * 2 + 1) {
			Pagination.Add(1, Pagination.step * 2 + 2);
			Pagination.Last();
		}
		else if (Pagination.page > Pagination.size - Pagination.step * 2) {
			Pagination.First();
			Pagination.Add(Pagination.size - Pagination.step * 2 , Pagination.size + 1);
		}
		else {
			Pagination.First();
			Pagination.Add(Pagination.page - Pagination.step + 1, Pagination.page + Pagination.step);
			Pagination.Last();
		}
		Pagination.Finish();
	},

	ShowButtons: function() {
		const next = document.querySelector('.pagination__next'),
			prev = document.querySelector('.pagination__prev');
		if (Pagination.page == 1) {
			prev.style.display = 'none';
			next.style.display = 'flex';
		}
		else if (Pagination.page == Pagination.size) {
			prev.style.display = 'flex';
			next.style.display = 'none';
		}
		else {
			prev.style.display = 'flex';
			next.style.display = 'flex';
		}
	},

	Fuild: function() {
		const fuild = document.querySelector('.pagination__fiuld input');
		Pagination.Input(+fuild.value);
	},

	Buttons: function(e) {
		let nav = e.getElementsByTagName('a'),
			btn = document.querySelector('.pagination__fiuld button'),
			fuild = document.querySelector('.pagination__fiuld input');
		nav[0].addEventListener('click', Pagination.Prev, false);
		nav[1].addEventListener('click', Pagination.Next, false);
		btn.addEventListener('click', Pagination.Fuild, false);
		fuild.addEventListener('keydown', function(e) {
			if (e.keyCode === 13) {
				Pagination.Input(+fuild.value);
			}
		});
	},

	Create: function(e) {
		let prevTxt = 'Назад',
			nextTxt = 'Вперед';

		if (document.documentElement.clientWidth < 767) {
			prevTxt = '',
			nextTxt = '';
		}

		let html = [
			`<a class='pagination__prev'><svg class="svg-sprite-icon icon-arrow-right-2"><use xlink:href="static/images/svg/symbol/sprite.svg#arrow-right-2"></use></svg>${prevTxt}</a>`, // previous button
			`<ul class='pagination__list'></ul>`,  // pagination container
			`<a class='pagination__next'>${nextTxt}<svg class="svg-sprite-icon icon-arrow-right-2"><use xlink:href="static/images/svg/symbol/sprite.svg#arrow-right-2"></use></svg></a>`  // next button
			],
			block = `<nav class='pagination__left'>${html.join('')}</nav>`,
			blockRight = `<div class='pagination__right'>
							<span class='pagination__text'>Перейти на страницу</span>
							<div class='pagination__fiuld'>
								<input type='number' placeholder='№' inputmode='numeric'>
								<button type='button' class='btn btn--circle'><svg class="svg-sprite-icon icon-arrow-right"><use xlink:href="static/images/svg/symbol/sprite.svg#arrow-right"></use></svg></button>
							</div>
						</div>`
		e.innerHTML = block;
		if(Pagination.size > 7) {
			e.insertAdjacentHTML('beforeend', blockRight)
		}
		Pagination.e = e.getElementsByTagName('ul')[0];
		Pagination.Buttons(e);
	},

	Init: function(e, data) {
		if(e == null) return
		Pagination.Extend(data);
		Pagination.Create(e);
		Pagination.Start();
	}
};

const init = function() {
	Pagination.Init(document.getElementById('pagination'), {
		size: 30, // pages size
		page: 1,  // selected page
		step: 2   // pages before and after current
	});
};

document.addEventListener('DOMContentLoaded', init, false);

// Проверка на видимость
function isVisible(e) {return e.offsetWidth > 0 || e.offsetHeight > 0;}

//Гост и марки
function gostWidth() {
	const navs = document.querySelectorAll('.s-all-gost__item');

	if(navs == 0) return;

	const toggleShow = (el, style) => {
		let li = el.closest('ul').querySelectorAll('li');
		li.forEach(l => l.style.display = style)
	};

	const hideEl = el =>  {
		let li = el.querySelectorAll('ul li'),
				wCont = el.clientWidth - 100,
				calc = 0,
				index = 0,
				index2 = 0;
			li.forEach((l, ind) => {
				calc += l.clientWidth;
				if (calc < wCont) {
					index = ind;
				} else {
					li[ind].style.display = 'none';
					index2 = ind;
				}
			});
			(!el.querySelector('.s-all-gost__more')) ? 
				createEl(li, (index2 - index)) : 
				el.querySelector('.s-all-gost__more').style.display = 'inline-block'
	};

	const createEl = (el, ind) => {
		if(ind <= 0) return
		let more = `<li class='s-all-gost__more'><span>Еще </span><span>${ind}</span></li>`;
		el[ind].closest('ul').insertAdjacentHTML('beforeend', more);
	}

	const calcF = () => {
		navs.forEach(nav => {
			hideEl(nav);
		});
	}
	calcF();

	const toggleEl = el => {
		if (el.classList.contains('active')) {
			hideEl(el.closest('nav'));
			el.querySelector('span').textContent = 'Еще ';
		} else {
			toggleShow(el, 'inline-block');
			el.querySelector('span').textContent = 'Скрыть ';
		}
		el.classList.toggle('active')
	}

	let btns = document.querySelectorAll('.s-all-gost__more');
	btns.forEach(btn => btn.addEventListener('click', () => toggleEl(btn)))
}
gostWidth()

// Scroll-sidebar
function sidebar() {
	if (document.documentElement.clientWidth > 1199) {
		const sidebare = document.querySelector('.scroll-sidebar'),
		header = document.querySelector('header');

		if(sidebare == null) return
		
		addEventListener('scroll', () => {
			(header.classList.contains('hide')) ? sidebare.classList.add('hide-header') : sidebare.classList.remove('hide-header')
		});
	}
}
sidebar();

// Открытие модального фильтра
function openModalFilters() {
	const btns = document.querySelectorAll('.p-product-listing__filters button:not(.filter-price)');

	btns.forEach(btn => {
		btn.addEventListener('click', () => {
			modalList.filters.show();
			openFiltersAccordion(btn.getAttribute('data-filter'))
		})
	})
}
openModalFilters();

// Открытие аккордиона в модальном окне фильтров
function openFiltersAccordion(value) {
	const acc = document.querySelectorAll('.modal-f__header');

	acc.forEach(el => accordion.hide(el));

	acc.forEach(el => {
		if(el.getAttribute('data-filter') == value) {
			el.classList.add('active');
			accordion.show(el);
		}
	})
}

// Скрывать элементы фильтров модалки
function hideElModalFilter() {
	const ul = document.querySelectorAll('.modal-f__list');

	ul.forEach(item => hide(item))
}