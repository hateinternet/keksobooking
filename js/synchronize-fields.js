'use strict';

window.synchronizeFields = (function () {
  var addChangeHandler = function (firstElement, secondElement, firstArray, secondArray, callback) {
    firstElement.addEventListener('change', function () {
      if (typeof callback === 'function') {
        callback(secondElement, secondArray[firstArray.indexOf(firstElement['value'])]);
      }
    });
  };
  return function (firstElement, secondElement, firstArray, secondArray, callback) {
    addChangeHandler(firstElement, secondElement, firstArray, secondArray, callback);
  };
})();
