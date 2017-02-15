'use strict';

window.synchronizeFields = function (callback) {
  // firstElement.addEventListener('change', function () {
  //   secondElement[property] = secondArray[firstArray.indexOf(firstElement['value'])];
  // });
  if (typeof callback === 'function') {
    callback();
  }
};
