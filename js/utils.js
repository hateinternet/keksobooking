'use strict';

window.utils = (function () {
  return {
    getRandomElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    getRandomElementExcept: function (array, element) {
      var currentElement = element;
      while (currentElement === element) {
        currentElement = window.utils.getRandomElement(array);
      }
      return currentElement;
    },
    getSetOfRandomElements: function (array, quantity) {
      var newArray = [];
      var newElement;
      while (quantity > newArray.length) {
        newElement = window.utils.getRandomElement(array);
        if (newArray.indexOf(newElement) === -1) {
          newArray.push(newElement);
        }
      }
      return newArray;
    },
    changeIdToClass: function (array) {
      var value;
      for (var i = 0; i < array.length; i++) {
        value = array[i].getAttribute('id');
        array[i].classList.add(value);
        array[i].removeAttribute('id');
      }
    }
  };
})();
