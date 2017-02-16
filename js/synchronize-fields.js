'use strict';

window.synchronizeFields = function (firstElement, secondElement, firstArray, secondArray, property, callback) {
  firstElement.addEventListener('change', function () {
    if (typeof callback === 'function') {
      callback(secondElement, property, secondArray[firstArray.indexOf(firstElement['value'])]);
    }
  });
};
