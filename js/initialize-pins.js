'use strict';

window.initializePins = function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var activePin = null;
  var newPin;
  var similarApartments = [];
  var filteredApartments = [];
  var URL_DATA = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';

  var mainPin = document.querySelector('.pin__main');
  var allFilters = document.querySelector('.tokyo__filters');
  var filterType = document.querySelector('#housing_type');
  var filterPrice = document.querySelector('#housing_price');
  var filterRooms = document.querySelector('#housing_room-number');
  var filterGuests = document.querySelector('#housing_guests-number');
  var features = document.querySelectorAll('#housing_features input');

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
    filteredApartments = [];
    filteredApartments = similarApartments.filter(function (element) {
      return filterType.value === 'any' || element.offer.type === filterType.value;
    });
    filteredApartments = filteredApartments.filter(function (element) {
      switch (filterPrice.value) {
        case 'middle':
          return element.offer.price >= 10000 && element.offer.price < 50000;
        case 'low':
          return element.offer.price < 10000;
        case 'high':
          return element.offer.price >= 50000;
      }
      return true;
    });
    filteredApartments = filteredApartments.filter(function (element) {
      return filterRooms.value === 'any' || String(element.offer.rooms) === filterRooms.value;
    });
    filteredApartments = filteredApartments.filter(function (element) {
      return filterGuests.value === 'any' || String(element.offer.guests) === filterGuests.value;
    });
    features.forEach(function (feature) {
      if (feature.checked) {
        filteredApartments = filteredApartments.filter(function (element) {
          return element.offer.features.indexOf(feature.value) >= 0;
        });
      }
    });

    pinMap.innerHTML = '';
    pinMap.appendChild(mainPin);
    var countOfAppartments = filteredApartments.length;
    for (var j = 0; j < countOfAppartments; j++) {
      newPin = window.renderPin(filteredApartments[j]);
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
