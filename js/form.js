'use strict';

(function () {
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

  var logicMin = function (firstElement, secondElement, firstArray, secondArray) {
    secondElement['min'] = secondArray[firstArray.indexOf(firstElement['value'])];
  };
  var logicValue = function (firstElement, secondElement, firstArray, secondArray) {
    secondElement['value'] = secondArray[firstArray.indexOf(firstElement['value'])];
  };

  window.synchronizeFields(fieldTime, fieldTimeOut, timeValues, timeOutValues, logicValue);
  window.synchronizeFields(fieldTimeOut, fieldTime, timeOutValues, timeValues, logicValue);
  window.synchronizeFields(fieldRealtyType, fieldPrice, realtyTypeValues, realtyPriceValues, logicMin);
  window.synchronizeFields(fieldRoomNumber, fieldCapacity, roomNumberValues, capacityValues, logicValue);
  window.synchronizeFields(fieldCapacity, fieldRoomNumber, capacityValues, roomNumberValues, logicValue);
})();
