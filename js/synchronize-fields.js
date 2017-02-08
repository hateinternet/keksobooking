'use strict';

window.synchronizeFields = function (firstElement, secondElement, firstArray, secondArray, property) {
  var changeFields = function (fElement, sElement, fArray, sArray) {
    var currentValue = fElement[property];
    for (var i = 0; i < fArray.length; i++) {
      if (currentValue === fArray[i]) {
        sElement[property] = sArray[i];
      }
    }
  };
  switch (property) {
    case 'value': {
      firstElement.addEventListener('change', function () {
        changeFields(firstElement, secondElement, firstArray, secondArray);
      });
      secondElement.addEventListener('change', function () {
        changeFields(secondElement, firstElement, secondArray, firstArray);
      });
      break;
    }
    case 'min': {
      firstElement.addEventListener('change', function () {
        var currentValue = firstElement['value'];
        for (var i = 0; i < firstArray.length; i++) {
          if (currentValue === firstArray[i]) {
            secondElement[property] = secondArray[i];
          }
        }
      });
      break;
    }
  }
};
