'use strict';

window.checkEvents = (function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;
  return {
    checkPressedEnter: function (evt) {
      return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
    },
    checkPressedEsc: function (evt) {
      return evt.keyCode && evt.keyCode === ESCAPE_KEY_CODE;
    }
  };
})();
