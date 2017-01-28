'use strict';
var pins = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogClose = dialog.querySelector('.dialog__close');
var fieldTitle = document.querySelector('#title');
var fieldPrice = document.querySelector('#price');
var fieldAddress = document.querySelector('#address');
var fieldTime = document.querySelector('#time');
var fieldTimeOut = document.querySelector('#timeout');
var fieldPropertyType = document.querySelector('#type');
var fieldRoomNumber = document.querySelector('#room_number');
var fieldCapacity = document.querySelector('#capacity');

// Функция для использования в событии клика по маркерам
// с фотографиями. Делает активным нажатый маркер
// и отображает поле с информацией.

var clickPin = function (numPin) {
  pins[numPin].classList.add('pin--active');
  for (var i = 0; i < pins.length; i++) {
    if (i !== numPin) {
      pins[i].classList.remove('pin--active');
    }
  }
  dialog.style.display = 'block';
};

// Функция для использования в событиях полей
// "время выезда" - "время заезда". Связывает
// изменение одного поля с другим.

var changeTimesFields = function (fieldFirst, fieldSecond) {
  switch (fieldFirst.value) {
    case '12':
      fieldSecond.value = '12';
      break;
    case '13':
      fieldSecond.value = '13';
      break;
    case '14':
      fieldSecond.value = '14';
  }
};

pins[0].addEventListener('click', function () {
  clickPin(0);
});

pins[1].addEventListener('click', function () {
  clickPin(1);
});

pins[2].addEventListener('click', function () {
  clickPin(2);
});

pins[3].addEventListener('click', function () {
  clickPin(3);
});

// По кнопке закрытия окна с информацией о сдаваемой площади
// скрывается само окно информации и удаляется класс активности
// с маркера на карте.

dialogClose.addEventListener('click', function () {
  dialog.style.display = 'none';
  for (var i = 0; i < pins.length; i++) {
    pins[i].classList.remove('pin--active');
  }
});

fieldTitle.required = true;
fieldTitle.minLength = 30;
fieldTitle.maxLength = 100;
fieldPrice.required = true;
fieldPrice.min = 1000;
fieldPrice.max = 1000000;
fieldAddress.required = true;

fieldTime.addEventListener('change', function () {
  changeTimesFields(fieldTime, fieldTimeOut);
});

fieldTimeOut.addEventListener('change', function () {
  changeTimesFields(fieldTimeOut, fieldTime);
});

fieldPropertyType.addEventListener('change', function () {
  switch (fieldPropertyType.value) {
    case 'apartment':
      fieldPrice.min = 1000;
      break;
    case 'shack':
      fieldPrice.min = 0;
      break;
    case 'palace':
      fieldPrice.min = 10000;
  }
});

fieldCapacity.value = '0';

fieldRoomNumber.addEventListener('change', function functionName() {
  switch (fieldRoomNumber.value) {
    case '1':
      fieldCapacity.value = '0';
      break;
    default:
      fieldCapacity.value = '3';
  }
});

fieldCapacity.addEventListener('change', function () {
  switch (fieldCapacity.value) {
    case '0':
      fieldRoomNumber.value = '1';
      break;
    default:
      fieldRoomNumber.value = '2';
  }
});
