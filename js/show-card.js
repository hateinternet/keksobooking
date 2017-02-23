'use strict';

window.showCard = (function () {
  var card = document.querySelector('.dialog');
  var cardCloseBtn = card.querySelector('.dialog__close');
  var deactivatePin;
  var cardData;
  var photoLink;
  var newPhoto;
  var newFeature;

  var cardAvatar = card.querySelector('.dialog__title > img');
  var cardDescription = card.querySelector('.dialog__panel');
  var lodgeTitle = cardDescription.querySelector('.lodge__title');
  var lodgeAddress = cardDescription.querySelector('.lodge__address');
  var lodgePrice = cardDescription.querySelector('.lodge__price');
  var lodgeType = cardDescription.querySelector('.lodge__type');
  var lodgeRoomsGuests = cardDescription.querySelector('.lodge__rooms-and-guests');
  var lodgeCheckinTime = cardDescription.querySelector('.lodge__checkin-time');
  var lodgeDescription = cardDescription.querySelector('.lodge__description');
  var lodgePhotos = cardDescription.querySelector('.lodge__photos');
  var lodgeFeatures = cardDescription.querySelector('.lodge__features');

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

    lodgePhotos.innerHTML = '';
    var countOfPhotos = cardData.offer.photos.length;
    for (var i = 0; i < countOfPhotos; i++) {
      var link = cardData.offer.photos[i];
      photoLink = document.createElement('a');
      newPhoto = document.createElement('img');
      photoLink.href = link;
      newPhoto.src = link;
      newPhoto.alt = 'Lodge photos';
      newPhoto.width = '52';
      newPhoto.height = '42';
      photoLink.appendChild(newPhoto);
      lodgePhotos.appendChild(photoLink);
    }

    lodgeFeatures.innerHTML = '';
    var countOfFeatures = cardData.offer.features.length;
    for (var j = 0; j < countOfFeatures; j++) {
      newFeature = document.createElement('span');
      newFeature.classList.add('feature__image');
      newFeature.classList.add('feature__image--' + cardData.offer.features[j]);
      lodgeFeatures.appendChild(newFeature);
    }
  };

  return function (data, callbackDeactivate) {
    cardData = data;
    deactivatePin = callbackDeactivate;
    showCard();
  };
})();
