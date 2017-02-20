'use strict';

window.initializePins = function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var activePin = null;
  var focusElement = null;

  var deactivatePin = function () {
    if (activePin) {
      activePin.setAttribute('aria-pressed', 'false');
      if (typeof focusElement === 'function') {
        focusElement();
      }
      activePin.classList.remove('pin--active');
      activePin = null;
    }
  };

  var returnFocus = function () {
    activePin.focus();
  };

  var pressPin = function (evt, focus) {
    focusElement = focus;
    var element = evt.target.classList.contains('pin') ? evt.target : evt.target.parentElement;
    if (element !== activePin) {
      deactivatePin(focus);
      element.classList.add('pin--active');
      activePin = element;
      element.setAttribute('aria-pressed', 'true');
      window.showCard(deactivatePin);
    }
  };

  pinMap.addEventListener('click', pressPin);
  pinMap.addEventListener('keydown', function (evt) {
    if (window.checkEvents.checkPressedEnter(evt)) {
      pressPin(evt, returnFocus);
    }
  });
};
