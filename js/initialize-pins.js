'use strict';

window.initializePins = function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var activePin = null;
  var newPin;
  var pins = [];
  var similarApartments = [];
  var filteredApartments = [];
  var URL_DATA = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
  var ALL_VALUES = 'any';
  var FIRST_PRICE_LIMIT = 10000;
  var SECOND_PRICE_LIMIT = 50000;

  var card = document.querySelector('.dialog');
  var mainPin = document.querySelector('.pin__main');
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
    pinMap.appendChild(mainPin);
    var countOfAppartments = filteredApartments.length;
    for (var j = 0; j < countOfAppartments; j++) {
      newPin = window.renderPin(filteredApartments[j]);
      pins.push(newPin);
      pinMap.appendChild(newPin);
      addHandlersPin(newPin, filteredApartments[j]);
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

  allFilters.addEventListener('change', applyFilter);

  window.load(URL_DATA, getApartments);
};
