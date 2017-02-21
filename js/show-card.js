'use strict';

window.showCard = (function () {
  var card = document.querySelector('.dialog');
  var cardCloseBtn = card.querySelector('.dialog__close');
  var deactivatePin;
  var cardData;

  var cardAvatar = card.querySelector('.dialog__title > img');
  var cardDescription = card.querySelector('.dialog__panel');
  var lodgeTitle = cardDescription.querySelector('.lodge__title');
  var lodgeAddress = cardDescription.querySelector('.lodge__address');
  var lodgePrice = cardDescription.querySelector('.lodge__price');
  var lodgeType = cardDescription.querySelector('.lodge__type');
  var lodgeRoomsGuests = cardDescription.querySelector('.lodge__rooms-and-guests');
  var lodgeCheckinTime = cardDescription.querySelector('.lodge__checkin-time');
  var lodgeDescription = cardDescription.querySelector('.lodge__description');

  var hideCard = function (evt) {
    if (typeof deactivatePin === 'function') {
      deactivatePin();
    }
    card.style.display = 'none';
    card.setAttribute('aria-pressed', 'true');
    document.removeEventListener('keydown', pressEscBtn);
    cardCloseBtn.removeEventListener('click', hideCard);
    cardCloseBtn.removeEventListener('keydown', hideCardKeyboard);
  };

  var pressEscBtn = function (evt) {
    if (window.checkEvents.checkPressedEsc(evt)) {
      hideCard(evt);
    }
  };

  var hideCardKeyboard = function (evt) {
    if (window.checkEvents.checkPressedEnter(evt)) {
      hideCard(evt);
    }
  };

  var showCard = function () {
    card.style.display = 'block';
    cardCloseBtn.setAttribute('aria-pressed', 'false');
    document.addEventListener('keydown', pressEscBtn);
    cardCloseBtn.addEventListener('click', hideCard);
    cardCloseBtn.addEventListener('keydown', hideCardKeyboard);

    var appartmentType;
    switch (cardData.offer.type) {
      case 'flat':
        appartmentType = 'Квартира';
        break;
      case 'bungalo':
        appartmentType = 'Лачуга';
        break;
      case 'house':
        appartmentType = 'Дворец';
    }

    cardAvatar.src = cardData.author.avatar;
    lodgeTitle.innerHTML = cardData.offer.title;
    lodgeAddress.innerHTML = cardData.offer.address;
    lodgePrice.innerHTML = cardData.offer.price;
    lodgeType.innerHTML = appartmentType;
    lodgeRoomsGuests.innerHTML = cardData.offer.rooms + ' комнат для ' + cardData.offer.guests + ' гостей';
    lodgeCheckinTime.innerHTML = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
    lodgeDescription.innerHTML = cardData.offer.description;
  };

  return function (data, callbackDeactivate) {
    cardData = data;
    deactivatePin = callbackDeactivate;
    showCard();
  };
})();
