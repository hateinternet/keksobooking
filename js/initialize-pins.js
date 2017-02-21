 'use strict';

window.initializePins = function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var activePin = null;

  var deactivatePin = function () {
    if (activePin) {
      activePin.setAttribute('aria-pressed', 'false');
      activePin.classList.remove('pin--active');
      activePin = null;
    }
  };

  var returnFocus = function () {
    activePin.focus();
  };

  var pressPin = function (evt) {
    var element = evt.target.classList.contains('pin') ? evt.target : evt.target.parentElement;
    if (element !== activePin) {
      deactivatePin();
      element.classList.add('pin--active');
      activePin = element;
      element.setAttribute('aria-pressed', 'true');
    }
  };

  pinMap.addEventListener('click', function (evt) {
    pressPin(evt);
    window.showCard(deactivatePin);
  });

  pinMap.addEventListener('keydown', function (evt) {
    if (window.checkEvents.checkPressedEnter(evt)) {
      pressPin(evt);
      window.showCard(function () {
        returnFocus();
        deactivatePin();
      });
    }
  });
};
