'use strict';

window.synchronizeFields = function (firstElement, secondElement, firstArray, secondArray, callback) {
  firstElement.addEventListener('change', function () {
    if (typeof callback === 'function') {
      callback(firstElement, secondElement, firstArray, secondArray);
    }
  });
};
