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

// Если при открытии окна уже выделен один из маркеров
// и открыто окно с информацией - назначить это окно
// переменной activePin для возможности его закрыть

var firstSelectedPin = document.querySelector('.pin--active');
var activePin;

for (var j = 0; j < pins.length; j++) {
  if (firstSelectedPin === pins[j]) {
    activePin = j;
  }
}

// Функция для использования в событии клика по маркерам
// с фотографиями. Делает активным нажатый маркер
// и отображает поле с информацией.

var clickPin = function (numPin) {
  pins[numPin].addEventListener('click', function () {
    pins[numPin].classList.add('pin--active');
    activePin = numPin;
    for (var i = 0; i < pins.length; i++) {
      if (i !== numPin) {
        pins[i].classList.remove('pin--active');
      }
    }
    dialog.style.display = 'block';
  });
};

for (var i = 0; i < pins.length; i++) {
  clickPin(i);
}

// Событие для закрытия окна с информацией о сдаваемой площади:
// скрывается само окно информации и удаляется класс активности
// с маркера на карте.

var clickClose = function () {
  pins[activePin].classList.remove('pin--active');
  dialog.style.display = 'none';
};

dialogClose.addEventListener('click', clickClose);

// Функция для использования в событиях полей
// "время выезда" - "время заезда". Связывает
// изменение одного поля с другим.

var changeTimesFields = function (fieldFirst, fieldSecond) {
  fieldSecond.value = fieldFirst.value;
};

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
  fieldCapacity.value = (fieldRoomNumber.value === '1') ? '0' : '3';
});

fieldCapacity.addEventListener('change', function () {
  fieldRoomNumber.value = (fieldCapacity.value === '0') ? '1' : '2';
});
