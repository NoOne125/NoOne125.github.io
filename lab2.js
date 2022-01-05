//alert("!");

// #1 Поміняйте місцями контент блоків «4» та «5».
const block4 = document.getElementById('block4');
const block5 = document.getElementById('block5');

function swapBlockInfo(block1, block2) {
	let tmp = block2.innerHTML;
	block2.innerHTML = block1.innerHTML;
	block1.innerHTML = tmp;
}

block4.onclick = function(){
	swapBlockInfo(block4, block5);  
} 

block5.onclick = function(){
	swapBlockInfo(block5, block4);
}

//#2 Знайти площу овала
const a = 5;
const b = 6;
const pi = 3.14;
const text = document.getElementById('three_text');
text.textContent = a + " * " + b + " * " + pi;

text.onclick = function() {
	let area = a * b * pi;
	let tmp = ' = ' + area.toString()
	if (!text.textContent.endsWith(tmp)) text.textContent += tmp
}

//#3 Знайти кількість слів
if (document.cookie) hasCookies();

document.getElementById('calculate').onclick = function(){
	var total = document.getElementById('words').value;
	var wordCount = total != '' ? total.match(/([а-яА-Я]+)/g).length : 0;
	alert(wordCount)
	document.cookie = "Amount = " + wordCount.toString();
} 

function hasCookies() {
	if (confirm(document.cookie + "\n" + "Delete cookies?")) {
		let cookies = document.cookie.split(";");
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i];
			let eqPos = cookie.indexOf("=");
			let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
			document.cookie = name + "=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
		}
	} else {
		alert("Cookies were saved");
		let form = document.forms.calculator;	// <form name="calculator"> element
		form.elements.words.style.visibility = 'hidden';
		form.elements.calculate.style.visibility = 'hidden';
	}
}
function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value) {
	let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
	document.cookie = updatedCookie;
}

//#4 Зміщення по лівому краю
const btnApply = document.getElementById('apply');
document.getElementById('checker3').checked = getCookie('block3')*1;
document.getElementById('checker4').checked = getCookie('block4')*1;
document.getElementById('checker5').checked = getCookie('block5')*1;
btnApply.addEventListener('dblclick', blockTextAlign);

function blockTextAlign() {
	let block3Style = document.getElementById('checker3').checked;
	let block4Style = document.getElementById('checker4').checked;
	let block5Style = document.getElementById('checker5').checked;

	setCookie('block3', block3Style ? 1 : 0);
	setCookie('block4', block4Style ? 1 : 0);
	setCookie('block5', block5Style ? 1 : 0);

	document.getElementById('block3').style.textAlign = block3Style ? 'left' : 'center';
	document.getElementById('block4').style.textAlign = block4Style ? 'left' : 'center';
	document.getElementById('block5').style.textAlign = block5Style ? 'left' : 'center';
}
blockTextAlign();

//#5 Вивід тексту в блоках
document.getElementsByName("radio").forEach(function (item, index) {
	item.onchange = function() {
		let index = this.value;
		let forms = document.getElementsByClassName("iterator");
		for (let i = 0; i < forms.length; i++) {
			if (forms[i].name == 'form_' + index) {
				forms[i].content.value = document.getElementById('blockContent_' + index).innerHTML;
				forms[i].style.display = "block";
			}  else {
				forms[i].style.display = "none";
			}
		}
	}
});

const index = 1;

function applyContent(index) {
	let form =  document.getElementById("form_" + index);
	let blockContent = document.getElementById('blockContent_' + index);

	//получили текст из textarea
	let html = form.content.value;
	//добавили кнопку
	html += '<button onclick="return cancelContent(' + index + ')" type="button"> Закрыть </button>';	
	//сохранили в локальное хранилище
	localStorage.setItem('newContent_' + index, html);
	//заменили текст в блоке
	blockContent.innerHTML = html;	
	blockContent.style.fontStyle = 'italic';
}

function cancelContent(index) {
	let form =  document.getElementById("form_" + index);
	let blockContent = document.getElementById('blockContent_' + index);

	//удалили из локального хранилища
	localStorage.removeItem('newContent_' + index);

	// в блок вернули первоначальный текст 
	blockContent.innerHTML = localStorage.getItem('blockContentЬMain_' + index);

	blockContent.style.fontStyle = 'normal';
}

let forms = document.getElementsByClassName("iterator");
for (let i = 0; i < forms.length; i++) {
	let index = forms[i].name.match(/(\d+)$/g);
	//сохранили первоначальный текст каждого блока в локальное хранилище
	localStorage.setItem('blockContentЬMain_' + index, document.getElementById('blockContent_' + index).innerHTML);
	forms[i].apply.addEventListener('click', function(){applyContent(index)});
}
