'use strict';

window.initializePins = function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var activePin = null;
  var newPin;
  var similarApartments = [];
  var randomAppartments = [];
  var URL_DATA = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';

  var addHandlersPin = function (pin, pinData) {
    pin.addEventListener('click', function (evt) {
      pressPin(evt);
      window.showCard(pinData, deactivatePin);
    });
    pin.addEventListener('keydown', function (evt) {
      if (window.checkEvents.checkPressedEnter(evt)) {
        pressPin(evt);
        window.showCard(pinData, function () {
          returnFocus();
          deactivatePin();
        });
      }
    });
  };

  var getApartments = function (data) {
    similarApartments = data;
    randomAppartments = window.utils.getSetOfRandomElements(similarApartments, 3);
    var countOfAppartments = randomAppartments.length;
    for (var i = 0; i < countOfAppartments; i++) {
      newPin = window.renderPin(randomAppartments[i]);
      pinMap.appendChild(newPin);
      addHandlersPin(newPin, randomAppartments[i]);
    }
  };

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

  window.load(URL_DATA, getApartments);
};
