'use strict';

window.synchronizeFields = function (firstElement, secondElement, firstArray, secondArray, property) {
  firstElement.addEventListener('change', function () {
    secondElement[property] = secondArray[firstArray.indexOf(firstElement['value'])];
  });
};
