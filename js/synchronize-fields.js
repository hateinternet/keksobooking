'use strict';

window.synchronizeFields = function (firstElement, secondElement, firstArray, secondArray, callback) {
  firstElement.addEventListener('change', function () {
    if (typeof callback === 'function') {
      callback(secondElement, secondArray[firstArray.indexOf(firstElement['value'])]);
    }
  });
};
