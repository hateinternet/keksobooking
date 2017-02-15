'use strict';

window.showCard = function (callback) {
  if (typeof callback === 'function') {
    callback();
  }
};
