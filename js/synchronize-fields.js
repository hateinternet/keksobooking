'use strict';

window.synchronizeFields = function (callback) {
  if (typeof callback === 'function') {
    callback();
  }
};
