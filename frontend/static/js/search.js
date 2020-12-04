// async function getData() {
// 	const request = await fetch('./static/js/russia.json'),
// 		data = await request.json();
// 	return data;
// }

// // Поиск городов
// async function renderCity() {
// 	const data = await getData();
	
// 	searchInput(data);
// 	btnTabs();
// }
// renderCity()

// function btnTabs() {
// 	const btns = document.querySelectorAll('.btn-city')

// 	btns.forEach(btn => {
// 		btn.addEventListener('click', () => {
// 			if (!btn.classList.contains('active')) console.log(tabFlag());
// 		})
// 	})
// }

// function tabFlag() {
// 	const flag = false;
// 	return !flag
// }

// function searchInput(data) {
// 	const inp = document.querySelector('.modal-w__search input')

// 	inp.addEventListener('input', () => {
// 		console.log(inp.value);
// 	})
// }