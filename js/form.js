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

  var synchLogic = function (firstElement, secondElement, firstArray, secondArray, property) {
    firstElement.addEventListener('change', function () {
      secondElement[property] = secondArray[firstArray.indexOf(firstElement['value'])];
    });
  };

  window.synchronizeFields(synchLogic(fieldTime, fieldTimeOut, timeValues, timeOutValues, 'value'));
  window.synchronizeFields(synchLogic(fieldTimeOut, fieldTime, timeOutValues, timeValues, 'value'));
  window.synchronizeFields(synchLogic(fieldRealtyType, fieldPrice, realtyTypeValues, realtyPriceValues, 'min'));
  window.synchronizeFields(synchLogic(fieldRoomNumber, fieldCapacity, roomNumberValues, capacityValues, 'value'));
  window.synchronizeFields(synchLogic(fieldCapacity, fieldRoomNumber, capacityValues, roomNumberValues, 'value'));
})();
