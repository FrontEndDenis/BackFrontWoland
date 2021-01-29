const modalList = {
	basket: new bootstrap.Modal(document.getElementById('modal-basket')),
	search: new bootstrap.Modal(document.getElementById('modal-search')),
	city: new bootstrap.Modal(document.getElementById('modal-city')),
	callback: new bootstrap.Modal(document.getElementById('modal-callback')),
}

if (document.getElementById('modal-filters')) modalList['filters'] = new bootstrap.Modal(document.getElementById('modal-filters'));
if (document.getElementById('modal-need')) modalList['need'] = new bootstrap.Modal(document.getElementById('modal-need'))

svg4everybody();

// const tippy = document.querySelectorAll('[data-tippy-content]');

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
		// autoplay: {
		// 	delay: 3500,
		// 	disableOnInteraction: false,
		// },
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
	const sManufacturingSlider = new Swiper('.s-manufacturing-slider', {
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
			prevEl: '.s-manufacturing-slider__prev',
			nextEl: '.s-manufacturing-slider__next',
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
	// Станица продукции
	const productThumbs = new Swiper('.product-slider-thumbs', {
		direction: 'vertical',
		slidesPerView: 3,
		spaceBetween: 24,
	});
	const product = new Swiper('.product-slider', {
		thumbs: {
			swiper: productThumbs,
		},
		breakpoints: {
			0: {
				direction: 'horizontal',
			},
			767: {
				direction: 'vertical',
			}
		},
		navigation: {
			prevEl: '.product-slider__prev',
			nextEl: '.product-slider__next',
		},
		pagination: {
			el: '.product-slider__pagination',
		},
	});
	// Страница производства
	const manufacturingThumbs = new Swiper('.manufacturing-slider-thumbs', {
		direction: 'vertical',
		slidesPerView: 3,
		spaceBetween: 24,
	});
	const manufacturing = new Swiper('.manufacturing-slider', {
		thumbs: {
			swiper: manufacturingThumbs,
		},
		breakpoints: {
			0: {
				direction: 'horizontal',
			},
			767: {
				direction: 'vertical',
			}
		},
		navigation: {
			prevEl: '.manufacturing-slider__prev',
			nextEl: '.manufacturing-slider__next',
		},
		pagination: {
			el: '.manufacturing-slider__pagination',
		},
	});
	// Страница услуг
	const serviceThumbs = new Swiper('.service-slider-thumbs', {
		direction: 'vertical',
		slidesPerView: 3,
		spaceBetween: 24,
	});
	const service = new Swiper('.service-slider', {
		thumbs: {
			swiper: serviceThumbs,
		},
		breakpoints: {
			0: {
				direction: 'horizontal',
			},
			767: {
				direction: 'vertical',
			}
		},
		navigation: {
			prevEl: '.service-slider__prev',
			nextEl: '.service-slider__next',
		},
		pagination: {
			el: '.service-slider__pagination',
		},
	});
	// Хлебные крошки
	const breadcrumbsSlider = new Swiper('.breadcrumbs-slider-container', {
		slidesPerView: 'auto',
		freeMode: true,
		spaceBetween: 26,
		mousewheel: {
			releaseOnEdges: true,
		},
	});
	// Фильтр
	const filtersHashtagSlider = new Swiper('.filters-hashtag-slider-container', {
		slidesPerView: 'auto',
		freeMode: true,
		spaceBetween: 10,
		mousewheel: {
			releaseOnEdges: true,
		},
	});
	// Фильтр
	const filtersServiceSlider = new Swiper('.service-slider-container', {
		slidesPerView: 'auto',
		freeMode: true,
		spaceBetween: 10,
		mousewheel: {
			releaseOnEdges: true,
		},
	});
	// Каталог
	const headerCatalogSlider = new Swiper('.catalog-slider-container', {
		slidesPerView: 'auto',
		freeMode: true,
		spaceBetween: 20,
		mousewheel: {
			releaseOnEdges: true,
		},
		navigation: {
			prevEl: '.catalog-slider-container__wrap-prev',
			nextEl: '.catalog-slider-container__wrap-next',
		},
	});
}
slidersInit();

const filtersSlider = new Swiper('.filters-slider-container', {
	slidesPerView: 'auto',
	freeMode: true,
	spaceBetween: 10,
	mousewheel: {
		releaseOnEdges: true,
	},
	scrollbar: {
		el: '.filters-swiper-scrollbar',
		hide: false,
		draggable: true,
		snapOnRelease: true,
		dragSize: '14px',
	},
});

document.querySelectorAll('input[type=tel]').forEach((tel) => {
	const mask = IMask(tel, {
		mask: '+{7} (000) 000-00-00'
	});
});

// Запуск функций при изменении разрешения экрана
document.addEventListener("DOMContentLoaded", function () {
	window.onresize = () => {
		heightCatalogCard();
		headerFixed();
		allCardHeight();
		descriptionStocksCard();
		lineWidth('.s-all-gost__item', '.s-all-gost__more');
		lineWidth('.product-content__mark', '.product-content__more');
		sidebar();
		calcWidth();
	};
});

// Проверка с какого устройства зашли на сайт
function isMobile() {
	let isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	}
	return (isMobile.any()) ? true : false;
}

// Анимации
function animateCSS(element, animation) {
	return new Promise((resolve) => {
		const animationName = animation,
			node = (element.nodeType === 1) ? element : document.querySelector(element);

		node.classList.add(...animationName.split(' '));
		function handleAnimationEnd() {
			node.classList.remove(...animationName.split(' '));
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

class ModalSite {
	constructor(className) {
		this.element = document.querySelector(className);
	}
	open() {
		this.element.classList.add('open-catalog');
	}
	close() {
		this.element.classList.remove('open-catalog');
	}
}
window.openmodalsite = new ModalSite('body');

// Отслеживаем событие Bootstrap modal window
function eventBsModal(elem, events, fn) {
	document.querySelector(elem).addEventListener(`${events}.bs.modal`, function (e) {
		fn()
	});
}

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
				if (!document.querySelector('.bottom-line__search-input').classList.contains('active')) {
					if (lostY >= 900) {
						if (window.scrollY > lostY) {
							header.classList.add('hide');
						} else {
							if (window.scrollY > height || lostY < offsetHeight) header.classList.remove('hide');
						}
					}
					lostY = window.scrollY;
				}
			});
		});
	}
}
headerFixed();

// Подсказывающее поле
function tooltipField() {
	const parent = document.querySelector('.bottom-line__search-input'),
		input = parent.querySelector('input');

	const showTooltip = () => {
		if (input.value != '') {
			addFocus();
			parent.classList.add('value');
		} else {
			removeFocus();
			parent.classList.remove('value');
		}
	}

	const addFocus = () => {
		parent.classList.add('focus')
	}
	const removeFocus = () => parent.classList.remove('focus')

	input.addEventListener('focus', () => addFocus())
	input.addEventListener('input', () => showTooltip())
	document.addEventListener('click', e => {
		let target = e.target,
			its_menu = target == parent || parent.contains(target);

		if (!its_menu) {
			removeFocus()
			parent.classList.remove('value');
			input.value = '';
		}
	})
}
tooltipField()

// Поиск в шапке
function openSearchHeader() {
	const btn = document.querySelector('#open-search-header'),
		bottomLine = document.querySelector('.bottom-line'),
		btnClose = btn.previousElementSibling.querySelector('.search-input__close'),
		input = btn.previousElementSibling.querySelector('input');

	const show = () => {
		bottomLine.classList.add('open-search');
		btn.previousElementSibling.classList.add('active');
		animateCSS(btn.previousElementSibling, 'fade-in')
	}

	const hide = () => {
		bottomLine.classList.remove('open-search');
		btn.previousElementSibling.classList.remove('active', 'focus', 'value');
		input.value = '';
	}

	btn.addEventListener('click', show)
	btnClose.addEventListener('click', hide)
}
openSearchHeader();

// Компания
function catalogListInfo() {
	const elems = document.querySelectorAll('.catalog-list');

	const show = item => {
		item.classList.add('active');
		animateCSS(item.querySelector('.catalog-list__wrap'), 'fade-in');
	}

	const hide = item => {
		item.classList.remove('active');
	}
	elems.forEach(elem => {
		elem.addEventListener('mouseenter', () => show(elem))
		elem.addEventListener('mouseleave', () => hide(elem))
	})
}
catalogListInfo();

// Подсвечивать категории в шапке
function headerCatalogSlider() {
	const parent = document.querySelector('.bottom-line__slider'),
		items = parent.querySelectorAll('.swiper-slide a');

	const hideAll = () => {
		parent.classList.remove('active');
		items.forEach(item => item.classList.remove('active'));
	}

	const addActive = elem => {
		hideAll();
		parent.classList.add('active');
		elem.classList.add('active');
	}

	items.forEach(item => {
		item.addEventListener('mouseenter', () => addActive(item));
		item.addEventListener('mouseleave', () => hideAll());
	})
}
headerCatalogSlider();

// Каталог
function catalogMenu() {
	const bottom = document.querySelector('.bottom-line__left'),
		catalog = document.querySelector('.bottom-line__catalog-menu > a'),
		block = document.querySelector('.bottom-line__catalog');

	let timer;

	catalog.addEventListener('mouseenter', () => timerEnter(), false)
	bottom.addEventListener('mouseleave', () => timerleave(), false);


	function timerEnter() {
		clearTimeout(timer);
		timer = setTimeout(() => {
			block.classList.add('active');
			animateCSS(block, 'catalog-open');
			openmodalsite.open();
		}, 300);
	}

	function timerleave() {
		clearTimeout(timer);
		block.classList.remove('active');
		openmodalsite.close();
		document.querySelectorAll('.catalog-menu__submenu').forEach(item => item.classList.remove('active'));
		document.querySelectorAll('.catalog-menu__items > li').forEach(item => item.classList.remove('active'));
		document.querySelectorAll('.catalog-menu__submenu-level').forEach(item => item.classList.remove('show'));
	}
}
catalogMenu();

// Работа списков меню
function catalogMenuList() {
	const items = document.querySelectorAll('.catalog-menu__items > li'),
		level = document.querySelectorAll('.catalog-menu__submenu-level'),
		titles = document.querySelectorAll('.catalog-menu__title');

	function hideAll(elem) {
		const searchСurrentLevel = elem.dataset.level,
			arr = Array.from(level).slice(searchСurrentLevel-1, level.length);
		
		arr.forEach(item => {
			item.querySelectorAll('.catalog-menu__submenu').forEach(item => item.classList.remove('active'));
			item.querySelectorAll('.catalog-menu__items > li').forEach(item => item.classList.remove('active'));
			item.classList.remove('show');
		})
	}

	function removeCurrentLevelActive(item) {
		item.closest('.catalog-menu__submenu-level').querySelectorAll('li').forEach(item => item.classList.remove('active'));
	}

	function checkValue(elem) {
		let flag = true
		if (elem.dataset.level != undefined) hideAll(elem);
		else flag = false
		return flag
	}
	
	function searchLevel(attrValue) {
		let elem;
		level.forEach(item => (item.dataset.level == attrValue) ? elem = item : '')
		return elem
	}

	const show = item => {
		const attr = item.dataset.categoryId,
			parent = searchLevel(item.dataset.level);

		if (!checkValue(item)) return

		item.classList.add('active');
		parent.querySelectorAll('.catalog-menu__submenu').forEach(subItem => {
			if (subItem.dataset.categoryId === attr) {
				subItem.classList.add('active');
				parent.classList.add('show');
				return;
			}
		})
	}

	items.forEach(item => {
		item.addEventListener('mouseenter', () => {
			removeCurrentLevelActive(item);
			show(item);
			calcWidth();
		});
	});
	titles.forEach(item => item.addEventListener('mouseenter', () => {
		removeCurrentLevelActive(item);
		checkValue(item);
	}))
}
catalogMenuList();

function calcWidth() {
	const calcItem = ((document.querySelector('.container-xxl').clientWidth - 24) - 270) / 3,
		catalogItems = document.querySelectorAll('.catalog-menu__submenu-level.show');
	
	if (catalogItems.length == 0) return

	catalogItems.forEach(item => item.style.width = calcItem + 'px')	
}

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
		contents[id].classList.add('active');
		animateCSS(contents[id], 'fade-in-scale');
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
	delCard = document.querySelectorAll('.remove-basket-card');

let count = 0,
	countSec = 0;

function basketApp() {
	document.addEventListener('changeBasket', (evt) => {
		const prodCards = document.querySelectorAll('.basket-card'),
			servCards = document.querySelectorAll('.basket-card-service'),
			manCards = document.querySelectorAll('.basket-card-manufacturing');

		let arr = [];

		addTextModalBasket(prodCards, ['товар', 'товара', 'товаров'])
		addTextModalBasket(servCards, ['услуга', 'услуги', 'услуг'])
		addTextModalBasket(manCards, ['производство', 'производства', 'производств'])

		function addTextModalBasket(element, array) {
			if (element.length > 0) {
				arr.push(element.length + ' ' + declOfNum(element.length, array))
			}
		}

		counter.textContent = arr.join(', ');

		if ((prodCards.length || servCards.length || manCards.length) > 0) {
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

		del.closest('.basket-card-modal').remove();

		document.dispatchEvent(new Event('changeBasket'));
	});
});

yes.addEventListener('click', (evt) => {
	evt.preventDefault();

	const cards = document.querySelectorAll('.basket-card-modal');

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

	const enumeration = (el, fn) => el.forEach(item => item.addEventListener('click', fn));

	enumeration(selectHeader, selectToggle);
	enumeration(selectItem, selectChoose);

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
			resetBtn = elem.querySelector('.input-file__reset');

		reset();

		const parts = file.name;
			
		function reset() {
			txt.innerText = 'Добавить файл';
			sizeTxt.innerText = 'до 10Mb';
			elem.classList.remove('error', 'add-file')
			input.value = '';
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

		resetBtn.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			reset();
		});

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
	for (let key in modalList) {
		modalList[key].hide();
	}
	openMobileMenu.hide();
}

// кнопки закрытия модальных окон
function btnAllCloseModal() {
	const btns = document.querySelectorAll('.top-line__mobile button')
	btns.forEach(btn => btn.classList.remove('open'))
	allCloseModal();
}

// Кнопка открытия мобильных кнопок поиска и корзины
function openMobileBtn(btnClass, icon, modalListElem, modalClass) {
	const btn = document.querySelector(btnClass);

	const open = () => {
		btnAllCloseModal();
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
	over.addEventListener('click', () => closeMenu())
}
mobileMenu()

class OpenMobileMenu {
	constructor(className) {
		this.element = document.querySelector(className);
		this.over = this.element.querySelector('.mobile-menu__overlay');
	}

	show() {
		btnAllCloseModal();
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

	const hide = item => {
		let block = item.closest('.catalog-m-menu__sub')
		block.style.transform = 'translate(100%)';
	}

	items.forEach(item => item.addEventListener('click', () => show(item)));
	prev.forEach(item => item.addEventListener('click', () => hide(item)));
}
catalogMobMenu();

// Высота скролла карточек Каталога
function heightCatalogCard() {
	const cards = document.querySelectorAll('.catalog-card');

	const calcHeight = elem => {
		const hiddenCard = elem.querySelector('.catalog-card__hidden'),
			scrollList = elem.querySelector('.catalog-card__list'),
			titleCard = elem.querySelector('.catalog-card__h-title');

		if (!hiddenCard) return

		let heightCalc = 0;

		heightCalc = hiddenCard.offsetHeight - ((titleCard.offsetHeight + 20) + 48);
		scrollList.style.maxHeight = heightCalc + 'px';
	}

	cards.forEach(item => calcHeight(item));
}

heightCatalogCard()

// Секция как мы работаем
function howWork() {
	const items = document.querySelectorAll('.s-main-work__item .s-main-work__header'),
		images = document.querySelectorAll('.s-main-work__block img');

	if (items.length == 0) return

	let index = 0;

	const addClass = (elem, ind) => {
		elem[ind].classList.add('active');
	}

	const searchActive = () => {
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
			addClass(items, index);
			addClass(images, index);
			animateCSS(images[index], 'fade-in-scale-top');
			accordion.show(items[index]);
		}
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
		// if (item.el.isOnVisibleSpace && !result) {
		// 	item.el.isOnVisibleSpace = false;
		// 	item.outVisibleSpace(item.el);
		// 	return;
		// }
		if (!item.el.isOnVisibleSpace && result) {
			item.el.isOnVisibleSpace = true;
			item.inVisibleSpace(item.el);
			return;
		}
	});
}

function onVisibleSpaceListener(elementId, cbIn, cbOut) {
	let el = document.querySelector(elementId);
	if (el == null) return
	listenedElements.push({
		el: el,
		inVisibleSpace: cbIn,
		// outVisibleSpace: cbOut
	});
}

onVisibleSpaceListener('.s-main-delivery__text', el => {
	animationTruck(true)
});

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
	if (desc.length == 0) return

	const show = elem => {
		let element = elem.querySelector('.warning__wrap');
		desc.forEach(el => el.querySelector('.warning__wrap').classList.remove('active'))
		element.classList.add('active', 'fixed');
		if (countHidden(element).right > 0) {
			element.style.right = 0 + 'px';
		}
		element.classList.remove('fixed');
	}

	const hide = elem => {
		elem.querySelector('.warning__wrap').classList.remove('active');
		elem.querySelector('.warning__wrap').setAttribute('style', '');
	}

	desc.forEach(el => {
		if (isMobile()) {
			el.addEventListener('click', () => show(el));
		} else {
			el.addEventListener('mouseenter', () => show(el));
			el.addEventListener('mouseleave', () => hide(el));
		}
	});

	btns.forEach(btn => btn.addEventListener('click', (e) => {
		e.stopPropagation();
		btn.closest('.warning__wrap').classList.remove('active');
		btn.closest('.warning__wrap').setAttribute('style', '');
	}))
}

descriptionStocksCard()

// Положение элемента в окне
// function isHidden(element) {
// 	const elementRect = element.getBoundingClientRect(),
// 		elementHides = elementRect.top < 0 || elementRect.left < 0 || elementRect.bottom > window.innerHeight || elementRect.right > window.innerWidth;
// 	return elementHides;
// }

function countHidden(element) {
	const elementRect = element.getBoundingClientRect(),
		elementHides = {
			// up: Math.max(0,0 - elementRect.top),
			// left: Math.max(0,0 - elementRect.left),
			// down: Math.max(0,elementRect.bottom - window.innerHeight),
			right: Math.max(0, elementRect.right - window.innerWidth)
		};
	return elementHides;
}

// Компания
function breadCrumbs() {
	if (isMobile()) return

	const elems = document.querySelectorAll('.breadcrumbs__item');
	if (elems == null) return

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
			if (block) show(elem, block)
		}, false);
		elem.addEventListener('mouseleave', () => {
			hide(elem)
		}, false);
	});
}

breadCrumbs();

// Пагинация
const Pagination = {
	code: '',
	onChange: null,

	Check: function () {
		let link = Number(window.location.href.split('page').pop().replace(/[//#/?]/gi, ''));
		const dataSize = document.querySelector('#pagination');
		if (!link) link = 1;
		dataSize.setAttribute('data-page', link)
	},

	_SetPage: function (page) {
		if (page < 1) {
			if (Pagination.page !== 1) {
				Pagination.page = 1;
				if (Pagination.onChange) {
					Pagination.onChange(Pagination.page);
				}
			}
		} else if (page > Pagination.size) {
			if (Pagination.page !== Pagination.size) {
				Pagination.page = Pagination.size;
				if (Pagination.onChange) {
					Pagination.onChange(Pagination.page);
				}
			}
			return;
		}
		Pagination.page = page;
		if (Pagination.onChange) {
			Pagination.onChange(page);
		}
	},

	Extend: function (data) {
		Pagination.size = Number(data.size);
		Pagination._SetPage(Number(data.page));
		Pagination.step = Number(data.step || 2);
	},

	Add: function (s, f) {
		for (let i = s; i < f; i++) {
			Pagination.code += '<li><a>' + i + '</a></li>';
		}
	},

	Last: function () {
		Pagination.code += '<li><i>...</i></li><li><a>' + Pagination.size + '</a></li>';
	},

	First: function () {
		Pagination.code += '<li><a>1</a></li><li><i>...</i></li>';
	},

	Click: function () {
		Pagination._SetPage(+this.innerHTML);
		Pagination.Start();
	},

	Prev: function () {
		Pagination._SetPage(Pagination.page - 1);
		Pagination.Start();
	},

	Next: function () {
		Pagination._SetPage(Pagination.page + 1);
		Pagination.Start();
	},

	Bind: function () {
		let a = Pagination.e.getElementsByTagName('a');
		for (let i = 0; i < a.length; i++) {
			if (+a[i].innerHTML === Pagination.page) a[i].className = 'current';
			a[i].addEventListener('click', Pagination.Click, false);
		}
	},

	Finish: function () {
		Pagination.e.innerHTML = Pagination.code;
		Pagination.code = '';
		Pagination.Bind();
		Pagination.ShowButtons();
	},

	Start: function () {
		if (Pagination.size < Pagination.step * 2 + 4) {
			Pagination.Add(1, Pagination.size + 1);
		} else if (Pagination.page < Pagination.step * 2 + 1) {
			Pagination.Add(1, Pagination.step * 2 + 2);
			Pagination.Last();
		} else if (Pagination.page > Pagination.size - Pagination.step * 2) {
			Pagination.First();
			Pagination.Add(Pagination.size - Pagination.step * 2, Pagination.size + 1);
		} else {
			Pagination.First();
			Pagination.Add(Pagination.page - Pagination.step + 1, Pagination.page + Pagination.step);
			Pagination.Last();
		}
		Pagination.Finish();
	},

	ShowButtons: function () {
		const next = document.querySelector('.pagination__next'),
			prev = document.querySelector('.pagination__prev');
		if (Pagination.page == 1) {
			prev.style.display = 'none';
			next.style.display = 'flex';
		} else if (Pagination.page == Pagination.size) {
			prev.style.display = 'flex';
			next.style.display = 'none';
		} else {
			prev.style.display = 'flex';
			next.style.display = 'flex';
		}
	},

	Buttons: function (e) {
		let nav = e.getElementsByTagName('a');
		nav[0].addEventListener('click', Pagination.Prev, false);
		nav[1].addEventListener('click', Pagination.Next, false);
	},

	Create: function (e) {
		let html = [
			`<a class='pagination__prev'><svg class="svg-sprite-icon icon-arrow-right-2"><use xlink:href="/static/images/svg/symbol/sprite.svg#arrow-right-2"></use></svg></a>`,
			`<ul class='pagination__list'></ul>`,
			`<a class='pagination__next'><svg class="svg-sprite-icon icon-arrow-right-2"><use xlink:href="/static/images/svg/symbol/sprite.svg#arrow-right-2"></use></svg></a>`
		],
			block = `<nav class='pagination__left'>${html.join('')}</nav>`,
			blockRight = `<div class='pagination__right'>
							<span class='pagination__text'>Не нашли, что искали?</span>
							<a class='pagination__link txt--clr1'>Расскажите нам, что вам нужно <svg class="svg-sprite-icon icon-arrow-right"><use xlink:href="/static/images/svg/symbol/sprite.svg#arrow-right"></use></svg></a>
						</div>`
		e.innerHTML = block;
		e.insertAdjacentHTML('beforeend', blockRight)
		Pagination.e = e.getElementsByTagName('ul')[0];
		Pagination.Buttons(e);
	},

	Init: function (e, data, onChange = null) {
		Pagination.Extend(data);
		Pagination.Create(e);
		Pagination.Start();
		Pagination.onChange = onChange;
	}
};

const CatalogController = {
	filters: {},
	catalogEl: null,
	paginationEl: null,
	baseUrl: null,

	Init: function (catalogEl, paginationEl) {
		this.catalogEl = catalogEl;
		this.baseUrl = catalogEl.getAttribute('data-base-url');
		this.paginationEl = paginationEl;
		Pagination.Check();
		Pagination.Init(paginationEl, {
			size: paginationEl.getAttribute('data-size'),
			page: paginationEl.getAttribute('data-page'),
			step: 2
		}, function () {
			CatalogController.Update();
		});
	},

	Update: function () {
		window.location = this._GenerateUrl();
	},

	_GenerateUrl: function () {
		let url = this.baseUrl;

		for (let name in this.filters) {
			url += `/${name}/${this.filters[name]}`;
		}

		if (Pagination.page) {
			url += `/page/${Pagination.page}`;
		}
		return url;
	}
}
const init = function () {
	const pagination = document.getElementById('pagination');
	const catalog = document.getElementById('page');
	if (pagination === null) return;
	CatalogController.Init(catalog, pagination);
};
document.addEventListener('DOMContentLoaded', init, false);

// Проверка на видимость
function isVisible(e) {
	return e.offsetWidth > 0 || e.offsetHeight > 0;
}

// Ширина в 1 строку
function lineWidth(classItem, classBtn) {
	const navs = document.querySelectorAll(classItem);

	if (navs == 0) return;

	const toggleShow = (el, style) => {
		let li = el.closest('ul').querySelectorAll('li');
		li.forEach(l => l.style.display = style)
	};

	const hideEl = el => {
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
		(!el.querySelector(classBtn)) ?
			createEl(li, (index2 - index)) :
			el.querySelector(classBtn).style.display = 'inline-block'
	};

	const createEl = (el, ind) => {
		if (ind <= 0) return
		let more = `<li class='${classBtn.split('.').join('')}'><span>Еще </span><span>${ind}</span></li>`;
		el[ind].closest('ul').insertAdjacentHTML('beforeend', more);
	}

	const calcF = () => navs.forEach(nav => hideEl(nav));
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

	let btns = document.querySelectorAll(classBtn);
	btns.forEach(btn => btn.addEventListener('click', () => toggleEl(btn)))
}

lineWidth('.s-all-gost__item', '.s-all-gost__more')
lineWidth('.product-content__mark', '.product-content__more')

// Scroll-sidebar
function sidebar() {
	if (document.documentElement.clientWidth > 1199) {
		const sidebare = document.querySelector('.scroll-sidebar'),
			header = document.querySelector('header');

		if (sidebare == null) return

		addEventListener('scroll', () => {
			(header.classList.contains('hide')) ? sidebare.classList.add('hide-header') : sidebare.classList.remove('hide-header')
		});
	}
}
sidebar();

// Фильтры
function filters() {
	if (!document.getElementById('modal-filters')) return
	const openBtnModal = document.querySelectorAll('.p-all-filters button:not(.filter-price)'),
		modalUlList = document.querySelectorAll('.modal-f__list'),
		pageBtnFilters = document.querySelectorAll('.p-all-filters button'),
		pageBtnFiltersPrice = document.querySelector('.filter-price[data-filter="price"]'),
		modalBtnFiltersPrice = document.querySelector('.modal-f__btn-toggle input'),
		modalBtnDel = document.querySelectorAll('.modal-f__delete'),
		pageBtnDel = document.querySelectorAll('.p-all-filters .filter__delete'),
		modalBtnRemoveAll = document.querySelector('.modal-f__clear');

	let arrAttr = [];

	// Открытие модального фильтра
	function openModalFilters() {
		openBtnModal.forEach(btn => {
			btn.addEventListener('click', () => {
				modalList.filters.show();
				openFiltersAccordion(btn.getAttribute('data-filter'))
			})
		})
	}
	openModalFilters();

	// Открытие аккордиона в модальном окне фильтров
	function openFiltersAccordion(value) {
		const acc = document.querySelectorAll('.modal-f__header.accordion');
		acc.forEach(el => accordion.hide(el));
		acc.forEach(el => {
			if (el.getAttribute('data-filter') == value) {
				el.classList.add('active');
				accordion.show(el);
			}
		})
	}

	// Скрывать элементы фильтров модалки
	function hideElModalFilter() {
		const createMore = (el, ind) => {
			if (ind <= 0) return
			let more = `<div class='modal-f__more'><span>Еще </span><span>${ind}</span></div>`;
			el.insertAdjacentHTML('afterend', more);
		}
		const hide = el => {
			let li = el.querySelectorAll('li'),
				ind = 0;
			for (let i = 4; i < li.length; i++) {
				li[i].style.display = 'none';
				ind = i;
			}
			(!el.closest('.modal-f__panel').querySelector('.modal-f__more')) ?
				createMore(el, ind - 3) :
				el.closest('.modal-f__panel').querySelector('.modal-f__more').style.display = 'block';
		}

		const show = el => {
			let lis = el.previousSibling.querySelectorAll('li');
			lis.forEach(li => li.style.display = 'block')
		};

		const toggleEl = el => {
			if (el.classList.contains('active')) {
				hide(el.previousSibling);
				el.querySelector('span').textContent = 'Еще ';
				el.previousElementSibling.previousElementSibling.classList.remove('search');
			} else {
				show(el);
				el.querySelector('span').textContent = 'Скрыть ';
				el.previousElementSibling.previousElementSibling.classList.add('search');
				accordion.show(el.closest('.modal-f__panel').previousElementSibling)
			}
			el.classList.toggle('active')
		}

		modalUlList.forEach(item => hide(item))

		const btns = document.querySelectorAll('.modal-f__more');

		btns.forEach(btn => {
			btn.addEventListener('click', () => {
				toggleEl(btn);
				// searchModalFilter(btn);
			});
		});
	}
	hideElModalFilter();
	// Общие классы
	// Удаление активного элемента в списке модального окна
	const removeActive = collection => {
		collection.forEach(item => {
			item.classList.remove('active')
			if (item.querySelector('svg')) item.querySelector('svg').remove()
		})
	}
	// Очистка массива атрибутов
	const removeAllArrAttr = attr => {
		arrAttr = arrAttr.filter(item => item !== attr);
		if (arrAttr.length <= 0) document.querySelector('[data-filter="all"]').classList.remove('value')
	}
	// Добавление выбранного фильтра
	function addFilterElem() {
		// Добавление элемента в кнопки на странице
		const addShowBattunValue = (text, attr) => {
			let index = 0;

			pageBtnFilters.forEach((btn, ind) => {
				if (btn.getAttribute('data-filter') == attr) index = ind;
			});

			pageBtnFilters[index].classList.add('value');

			if (index === 0) {
				if (arrAttr.indexOf(attr) === -1) return arrAttr.push(attr);
				return
			}

			if (pageBtnFilters[index].querySelector('span')) pageBtnFilters[index].querySelector('span').remove();
			pageBtnFilters[index].querySelector('.filter__delete').insertAdjacentHTML('beforebegin', text)
			filtersSlider.update();
			filtersSlider.scrollbar.updateSize();
		}
		// Генерация списк в sidebar
		const addShowSidebarValue = (titlePage, key, text, attr) => {
			const sidebar = document.querySelector('#scroll-sidebar-filters'),
				left = sidebar.querySelector('.scroll-sidebar__left'),
				title = left.querySelector('#scroll-sidebar-title-page'),
				ul = document.querySelector('#scroll-sidebar-filters-list'),
				li = `<li class="scroll-sidebar__item" data-filter="${attr}">${key}${text}</li>`;

			let index = -1,
				items = ul.querySelectorAll('li');

			if (!sidebar.classList.contains('value')) {
				sidebar.classList.add('value');
				title.append(titlePage);
			}

			if (items) {
				items.forEach((item, ind) => {
					if (item.getAttribute('data-filter') == attr) index = ind;
				});

				(index != -1) ? items[index].innerHTML = li : ul.insertAdjacentHTML('beforeend', li);
			} else {
				ul.insertAdjacentHTML('beforeend', li);
			}
			document.addEventListener('changeSidebarList', () => {
				let li = ul.querySelectorAll('li');
				if (li.length <= 0) {
					sidebar.classList.remove('value');
					title.innerHTML = '';
				}
			});
		}
		// Добавление элемента в модальное окно
		const addShowHeaderValue = (item, text) => {
			const headerModalText = item.querySelector('.modal-f__wrap-text')
			if (item.classList.contains('value')) {
				headerModalText.querySelector('.modal-f__text').nextElementSibling.innerHTML = text
			} else {
				headerModalText.insertAdjacentHTML('beforeend', text);
				item.classList.add('value');
			}
		}
		// Оборачиваем текст в span
		const createSpanValue = text => `<span>${text}</span>`;

		// Распределение полученного текста и атрибута при клике из списка элементов в модальном окне
		const addLogic = item => {
			const titleKeyText = createSpanValue(item.closest('.modal-f__item').querySelector('.modal-f__text span').textContent),
				valueText = createSpanValue(item.textContent),
				pageTitle = document.querySelector('.p-product-listing__title .txt--bld40').textContent,
				attr = item.closest('.modal-f__item').querySelector('.modal-f__header').getAttribute('data-filter'),
				headerModal = item.closest('.modal-f__item').querySelector('.modal-f__header');
			addShowHeaderValue(headerModal, valueText);
			addShowSidebarValue(pageTitle, titleKeyText, valueText, attr);
			addShowBattunValue(valueText, attr);
		}
		// Добавление активного элемента в списке модального окна
		const addActive = item => {
			const svg = `<svg class="svg-sprite-icon icon-arrow-right"><use xlink:href="/static/images/svg/symbol/sprite.svg#arrow-right"></use></svg>`
			item.classList.add('active');
			item.insertAdjacentHTML('afterbegin', svg)
		}
		// Начала добавление текста в 3х местах
		const addEvents = elem => {
			const li = elem.querySelectorAll('li a');
			li.forEach(item => item.addEventListener('click', () => {
				removeActive(li)
				addLogic(item)
				addActive(item);
			}))
		}
		modalUlList.forEach(item => addEvents(item))

		// Кнопки цены на странице и в модальном окне
		const toggleBtnPrice = btn => btn.classList.toggle('value');
		const toggleModalBtnPrice = btn => btn.checked = !btn.checked;

		const btnPrice = () => {
			pageBtnFiltersPrice.addEventListener('click', () => {
				toggleBtnPrice(pageBtnFiltersPrice);
				toggleModalBtnPrice(modalBtnFiltersPrice)
			})
		}
		btnPrice();

		const btnPriceModal = () => {
			modalBtnFiltersPrice.addEventListener('click', () => toggleBtnPrice(pageBtnFiltersPrice))
		}
		btnPriceModal();
		allRemoveValue();
	}
	addFilterElem();

	// Удаление выбранного фильтра
	// Удаление элемента в модальном окне
	const removeListitem = item => {
		const parent = item.closest('.modal-f__item'),
			list = parent.querySelectorAll('.modal-f__list a');

		if (item.classList.contains('value')) {
			item.classList.remove('value')
			item.querySelector('.modal-f__text').nextElementSibling.remove();
		}
		removeActive(list)
	}
	// Удаление элемента в кнопке на странице
	const removeFilterBtnPage = el => {
		if (el.closest('button').classList.contains('value')) {
			el.closest('button').classList.remove('value')
			el.previousElementSibling.remove();
		} else return
		filtersSlider.update();
		filtersSlider.scrollbar.updateSize();
	}
	// Распределение удаления элементов в нескольких местах
	const removeAllLocation = (attr, classNames) => {
		const elements = document.querySelectorAll(`*[data-filter='${attr}']`);
		elements.forEach(elem => {
			if (elem.classList.contains(classNames)) {
				if (elem.classList.contains('filter')) {
					removeFilterBtnPage(elem.querySelector('.filter__delete'))
				} else if (elem.classList.contains('modal-f__header')) {
					removeListitem(elem);
				}
			} else if (elem.classList.contains('scroll-sidebar__item')) {
				elem.remove();
				document.dispatchEvent(new Event('changeSidebarList'));
			}
		});
	}
	// Кнопка удаления в модальном окне
	const btnModalDelete = () => {
		modalBtnDel.forEach(btn => btn.addEventListener('click', (e) => {
			e.stopPropagation();
			e.preventDefault();
			const attr = btn.closest('.modal-f__header').getAttribute('data-filter');
			removeListitem(btn.closest('.modal-f__item').querySelector('.modal-f__header'));
			removeAllLocation(attr, 'filter');
			removeAllArrAttr(attr);
		}));
	}
	btnModalDelete();
	// Кнопка удаления на странице
	const btnFilterPage = () => {
		pageBtnDel.forEach(btn => btn.addEventListener('click', (e) => {
			e.stopPropagation();
			e.preventDefault();
			const attr = btn.closest('button').getAttribute('data-filter');
			removeFilterBtnPage(btn);
			removeAllLocation(attr, 'modal-f__header');
		}));
	}
	btnFilterPage();

	// Кнопка сброса
	function allRemoveValue() {
		modalBtnRemoveAll.addEventListener('click', () => {
			const allAttr = document.querySelectorAll('.modal-f__header[data-filter]:not([data-filter="price"])');
			arrAttr.forEach(attr => removeAllArrAttr(attr));
			if (pageBtnFiltersPrice.classList.contains('value')) {
				pageBtnFiltersPrice.classList.remove('value');
				modalBtnFiltersPrice.checked = !modalBtnFiltersPrice.checked;
			}
			allAttr.forEach(attr => {
				attr = attr.dataset.filter;
				removeAllLocation(attr, 'modal-f__header');
				removeAllLocation(attr, 'filter');
			})
		})
	}
}
filters()

// Поиск в фильтре
function searchModalFilter(elem) {
	const main = elem.closest('.modal-f__item'),
		list = main.querySelectorAll('.modal-f__list li'),
		inputSearch = main.querySelector('input[type="search"]');
	
	inputSearch.addEventListener('input', () => {
		let value = inputSearch.value.trim().toLowerCase();
		if (value != '') {
			list.forEach(li => {
				if (li.querySelector('a').innerText.trim().toLowerCase().search(value) == -1) {
					li.classList.add('hide');
				} else {
					li.classList.remove('hide');
				}
			})
		}
		else list.forEach(li => li.classList.remove('hide'))
	})
}

// Открытие модального окна need
function openModalNeed() {
	const btn = document.querySelector('.pagination__link'),
		header = document.querySelector('.header');
	if (!btn) return
	btn.addEventListener('click', () => {
		if (header.classList.contains('hide')) header.classList.remove('hide')
		allCloseModal();
		modalList.need.show();
	})
}
document.addEventListener('DOMContentLoaded', openModalNeed, false);

// Кнопка toggle в моадльном окне
function toggleBtnModalNeed() {
	if (!document.getElementById('modal-need')) return
	const el = document.querySelector('.modal-need__wrap-toggle'),
		btn = document.querySelector('#btn-toggle-2'),
		input = document.querySelector('#modal-field-10');
	btn.addEventListener('click', () => {
		if (el.classList.contains('active')) {
			el.classList.remove('active')
			accordion.hide(document.querySelector('.modal-need__toggle'));
			input.removeAttribute('required');
		} else {
			el.classList.add('active')
			accordion.show(document.querySelector('.modal-need__toggle'));
			input.setAttribute('required', 'required');
		}
		input.classList.toggle('form-control')
	})
}
toggleBtnModalNeed()

// Характеристика на странице товара
function openSpecifProduct() {
	const allSpecifications = document.querySelector('.product-content__list .product-content__more-description'),
		tabBtn = document.querySelector('.tabs__nav-specif'),
		tabCont = document.querySelector('.tabs__content-specif');

	if (!allSpecifications) return

	allSpecifications.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		document.querySelectorAll('.tabs__nav-item').forEach(item => item.classList.remove('active'))
		document.querySelectorAll('.tabs__content-item').forEach(item => item.classList.remove('active'))
		tabBtn.classList.add('active');
		tabCont.classList.add('active')
		animateCSS(tabCont, 'fade-in-scale');
	})
}
openSpecifProduct();

// Страницы Новстей, Статей
function generatingLink() {
	const sidebar = document.querySelector('#scroll-sidebar-article');
	if (!sidebar) return

	const parent = document.querySelector('#page-art-news'),
		links = parent.querySelectorAll('h2');

	const generatingAttr = (elem, ind) => elem.setAttribute('id', `link-${ind}`)
	const generatingTegLink = (elem, ind) => `<a href='#link-${ind}'>${elem.innerText}<a>`;

	if (links.length > 0) {
		sidebar.classList.add('value');
		links.forEach((link, index) => {
			generatingAttr(link, index)
			sidebar.querySelector('.scroll-sidebar__article-link').insertAdjacentHTML('beforeend', generatingTegLink(link, index))
		})
	}
}
generatingLink()

// Плавный скролл
function scrollAnchors() {
	const anchors = document.querySelectorAll('a[href*="#"]')

	anchors.forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault()

			const block = anchor.getAttribute('href');
			if (block == '#') return

			document.querySelector(block).scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			})
		})
	})	
}
scrollAnchors()

// Марки на карте
function markMap() {
	const marks = document.querySelectorAll('.b-all-map-filial__mark')
	if (marks.length == 0) return
	
	marks.forEach(mark => mark.addEventListener('click', () => generationBage(mark)))

	function generationBage(item) {
		let city = item.dataset.city,
			phone = item.dataset.phone,
			mail = item.dataset.mail,
			bages = document.querySelectorAll('.b-all-map-filial__mark-info'),
			parent = item.closest('.b-all-map-filial__map'),
			[top, left] = position(parent, item);
		
		if (bages.length == 0) {
			parent.insertAdjacentHTML('beforeend', createInfoBage(city, phone, mail));
			addStyle(parent, top, left);
		} else {
			bages.forEach(bage => bage.remove())
			parent.insertAdjacentHTML('beforeend', createInfoBage(city, phone, mail));
			addStyle(parent, top, left);
		}
		const close = document.querySelector('.b-all-map-filial__close')

		close.addEventListener('click', () => close.closest('.b-all-map-filial__mark-info').remove())
	}

	function position(parent, elem) {
		let parentPos = parent.getBoundingClientRect(),
			childrenPos = elem.getBoundingClientRect(),
			top = childrenPos.top - parentPos.top,
			left = childrenPos.left - parentPos.left;
		
		return [top, left]
	}

	function createInfoBage(c, p, m) {
		return `
			<div class="b-all-map-filial__mark-info">
				<button class="b-all-map-filial__close"><svg class="svg-sprite-icon icon-close "><use xlink:href="/static/images/svg/symbol/sprite.svg#close"></use></svg></button>
				<div class="b-all-map-filial__mark-title txt--smbld14">${c}</div>
				<div class="b-all-map-filial__mark-item">
					<div class="b-all-map-filial__mark-subtitle">Телефон</div>
					<a href="tel:${p.replace(/[\s()-]/g, '')}" class="b-all-map-filial__mark-phone txt--smbld12">${p}</a>
				</div>
				<div class="b-all-map-filial__mark-item">
					<div class="b-all-map-filial__mark-subtitle">Почта</div>
					<a href="mailto:${m}" class="b-all-map-filial__mark-phone txt--smbld12">${m}</a>
				</div>
			</div>
		`
	}

	function addStyle(main, top, left) {
		const element = document.querySelector('.b-all-map-filial__mark-info'),
			mainBlock = main.closest('.b-all-map-filial__item').offsetWidth;
		if (window.innerWidth >= 768) {
			if (main.closest('.b-all-map-filial__map--kz')) {
				if (left + 200 > mainBlock) left -= 185
			}
		} else {
			if ((left + 250) > main.innerWidth) left -= 185
		}
		element.setAttribute('style',  `top: ${Math.trunc(top - 150)+'px'}; left: ${Math.trunc(left + 8)+'px'};`)
	}
}
markMap();
// // Яндекс карта
// function init() {
// 	let center = [42.367110, 69.660379],
// 		myMap = new ymaps.Map('ymaps1607942522953841233', {
// 		center: center,
// 		zoom: 14,
// 		type: 'yandex#map',
// 		controls: ['fullscreenControl']
// 	});
// 	// Мобильная прокрутка
// 	if (isMobile()) myMap.behaviors.disable('drag');
// 	// ctrl при прокрутке
// 	myMap.behaviors.disable('scrollZoom');
// 	let ctrlKey = false,
// 		ctrlMessVisible = false,
// 		timer;
// 	myMap.events.add(['wheel', 'mousedown'], function (e) {
// 		if (e.get('type') == 'wheel') {
// 			if (!ctrlKey) {
// 				document.querySelector('#ymap-ctrl-display').classList.add('active')
// 				ctrlMessVisible = true;
// 				clearTimeout(timer);
// 				timer = setTimeout(function () {
// 					document.querySelector('#ymap-ctrl-display').classList.remove('active')
// 					ctrlMessVisible = false;
// 				}, 1500);
// 			}
// 			else {
// 				document.querySelector('#ymap-ctrl-display').classList.remove('active')
// 			}
// 		}
// 		if (e.get('type') == 'mousedown' && ctrlMessVisible) {
// 			document.querySelector('#ymap-ctrl-display').classList.remove('active')
// 		}
// 	});
// 	document.onkeydown(function (e) {
// 		if (e.which === 17 && !ctrlKey) {
// 			ctrlKey = true;
// 			myMap.behaviors.enable('scrollZoom');
// 		}
// 	});
// 	document.onkeyup(function (e) {
// 		if (e.which === 17) {
// 			ctrlKey = false;
// 			myMap.behaviors.disable('scrollZoom');
// 		}
// 	});
// 	// Метка
// 	let myPlacemark = new ymaps.Placemark([42.367109, 69.660380], null, {
// 		iconLayout: 'default#image',
// 		iconImageHref: "../../static/images/general/mark.svg",
// 		iconImageSize: [130, 44],
// 		iconImageOffset: [-68, -44]
// 	});
// 	myMap.geoObjects.add(myPlacemark);
// }
// init()