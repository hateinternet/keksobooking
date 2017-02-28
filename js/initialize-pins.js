'use strict';

window.initializePins = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var activePin = null;
  var pins = [];
  var addedPin;
  var similarApartments = [];
  var filteredApartments = [];
  var URL_DATA = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
  var ALL_VALUES = 'any';
  var FIRST_PRICE_LIMIT = 10000;
  var SECOND_PRICE_LIMIT = 50000;
  var HALF_WIDTH_PIN = 28;
  var HEIGHT_PIN = 75;

  var card = document.querySelector('.dialog');
  var allFilters = document.querySelector('.tokyo__filters');
  var filterType = document.querySelector('#housing_type');
  var filterPrice = document.querySelector('#housing_price');
  var filterRooms = document.querySelector('#housing_room-number');
  var filterGuests = document.querySelector('#housing_guests-number');
  var features = document.querySelectorAll('#housing_features input');

  var clearMap = function () {
    pins.forEach(function (element) {
      pinMap.removeChild(element);
    });
    pins = [];
  };

  var addHandlersPin = function (pin, pinData) {
    pin.addEventListener('click', function (evt) {
      onPinPressed(evt);
      window.showCard(pinData, deactivatePin);
    });
    pin.addEventListener('keydown', function (evt) {
      if (window.checkEvents.checkPressedEnter(evt)) {
        onPinPressed(evt);
        window.showCard(pinData, function () {
          setFocus();
          deactivatePin();
        });
      }
    });
  };

  var renderPin = function (data) {
    var templateElement = document.querySelector('#pin-template');
    var pinToClone = templateElement.content.querySelector('.pin');
    var newPin = pinToClone.cloneNode(true);
    var newPinAvatar = newPin.querySelector('img');

    newPin.style.left = data.location.x - HALF_WIDTH_PIN + 'px';
    newPin.style.top = data.location.y - HEIGHT_PIN + 'px';
    newPin.setAttribute('tabindex', '1');
    newPinAvatar.src = data.author.avatar;
    newPinAvatar.alt = 'User avatar';
    addHandlersPin(newPin, data);
    return newPin;
  };

  var getApartments = function (data) {
    similarApartments = data;
    applyFilter();
  };

  var applyFilter = function () {
    card.style.display = 'none';
    filteredApartments = [];
    filteredApartments = similarApartments.filter(function (element) {
      return filterType.value === ALL_VALUES || element.offer.type === filterType.value;
    });
    filteredApartments = filteredApartments.filter(function (element) {
      switch (filterPrice.value) {
        case 'middle':
          return element.offer.price >= FIRST_PRICE_LIMIT && element.offer.price < SECOND_PRICE_LIMIT;
        case 'low':
          return element.offer.price < FIRST_PRICE_LIMIT;
        case 'high':
          return element.offer.price >= SECOND_PRICE_LIMIT;
      }
      return true;
    });
    filteredApartments = filteredApartments.filter(function (element) {
      return filterRooms.value === ALL_VALUES || element.offer.rooms.toString() === filterRooms.value;
    });
    filteredApartments = filteredApartments.filter(function (element) {
      return filterGuests.value === ALL_VALUES || element.offer.guests.toString() === filterGuests.value;
    });
    features.forEach(function (feature) {
      if (feature.checked) {
        filteredApartments = filteredApartments.filter(function (element) {
          return element.offer.features.indexOf(feature.value) >= 0;
        });
      }
    });

    clearMap();
    var countOfAppartments = filteredApartments.length;
    for (var j = 0; j < countOfAppartments; j++) {
      addedPin = renderPin(filteredApartments[j]);
      pins.push(addedPin);
      pinMap.appendChild(addedPin);
    }
  };

  var deactivatePin = function () {
    if (activePin !== null) {
      activePin.setAttribute('aria-pressed', 'false');
      activePin.classList.remove('pin--active');
      activePin = null;
    }
  };

  var setFocus = function () {
    activePin.focus();
  };

  var onPinPressed = function (evt) {
    var element = evt.target.classList.contains('pin') ? evt.target : evt.target.parentElement;
    if (element !== activePin) {
      deactivatePin();
      element.classList.add('pin--active');
      activePin = element;
      element.setAttribute('aria-pressed', 'true');
    }
  };

  allFilters.addEventListener('change', applyFilter);

  return function () {
    window.load(URL_DATA, getApartments);
  };
})();
