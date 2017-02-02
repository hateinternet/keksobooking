'use strict';
var pinMap = document.querySelector('.tokyo__pin-map');
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

var ENTER_KEY_CODE = 13;

var isActivateEvent = function (evt) {
  return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
};

// Если нет активного маркера - скрыть поле с информацией

var activePin = document.querySelector('.pin--active');
if (!isNaN(activePin)) {
  dialog.style.display = 'none';
}

var deactivatePin = function () {
  activePin = document.querySelector('.pin--active');
  if (activePin) {
    activePin.setAttribute('aria-pressed', 'false');
    activePin.classList.remove('pin--active');
  }
};

var pressPin = function (evt) {
  var target = evt.target;
  var element = target.classList.contains('pin') ? target : target.parentElement;
  deactivatePin();
  element.classList.add('pin--active');
  element.setAttribute('aria-pressed', 'true');
  dialogClose.setAttribute('aria-pressed', 'false');
  dialog.style.display = 'block';
};

pinMap.addEventListener('click', pressPin);
pinMap.addEventListener('keydown', function (evt) {
  if (isActivateEvent(evt)) {
    pressPin(evt);
  }
});

var hideDialog = function (evt) {
  deactivatePin();
  dialogClose.setAttribute('aria-pressed', 'true');
  dialog.style.display = 'none';
};

dialogClose.addEventListener('click', hideDialog);
dialogClose.addEventListener('keydown', function (evt) {
  if (isActivateEvent(evt)) {
    hideDialog(evt);
  }
});

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
