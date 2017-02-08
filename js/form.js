'use strict';

window.initializePins();

var fieldTitle = document.querySelector('#title');
var fieldPrice = document.querySelector('#price');
var fieldAddress = document.querySelector('#address');

fieldTitle.required = true;
fieldTitle.minLength = 30;
fieldTitle.maxLength = 100;
fieldPrice.required = true;
fieldPrice.min = 1000;
fieldPrice.max = 1000000;
fieldAddress.required = true;

// Функция для использования в событиях полей
// "время выезда" - "время заезда". Связывает
// изменение одного поля с другим.

var fieldTime = document.querySelector('#time');
var fieldTimeOut = document.querySelector('#timeout');
var fieldRealtyType = document.querySelector('#type');
var fieldRoomNumber = document.querySelector('#room_number');
var fieldCapacity = document.querySelector('#capacity');

var timeValues = ['12', '13', '14'];
var timeOutValues = ['12', '13', '14'];
var realtyTypeValues = ['appartment', 'shack', 'palace'];
var realtyPriceValues = ['1000', '0', '10000'];
var roomNumberValues = ['100', '2', '1'];
var capacityValues = ['3', '3', '0'];

fieldCapacity.value = '0';

window.synchronizeFields(fieldTime, fieldTimeOut, timeValues, timeOutValues, 'value');
window.synchronizeFields(fieldRealtyType, fieldPrice, realtyTypeValues, realtyPriceValues, 'min');
window.synchronizeFields(fieldRoomNumber, fieldCapacity, roomNumberValues, capacityValues, 'value');
//
// var changeTimesFields = function (fieldFirst, fieldSecond) {
//   fieldSecond.value = fieldFirst.value;
// };
//
// fieldTime.addEventListener('change', function () {
//   changeTimesFields(fieldTime, fieldTimeOut);
// });
//
// fieldTimeOut.addEventListener('change', function () {
//   changeTimesFields(fieldTimeOut, fieldTime);
// });
//
// fieldRealtyType.addEventListener('change', function () {
//   switch (fieldRealtyType.value) {
//     case 'apartment':
//       fieldPrice.min = 1000;
//       break;
//     case 'shack':
//       fieldPrice.min = 0;
//       break;
//     case 'palace':
//       fieldPrice.min = 10000;
//   }
// });
//
// fieldRoomNumber.addEventListener('change', function functionName() {
//   fieldCapacity.value = (fieldRoomNumber.value === '1') ? '0' : '3';
// });
//
// fieldCapacity.addEventListener('change', function () {
//   fieldRoomNumber.value = (fieldCapacity.value === '0') ? '1' : '2';
// });
