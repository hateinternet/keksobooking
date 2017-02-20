'use strict';

window.showCard = (function () {
  var card = document.querySelector('.dialog');
  var cardCloseBtn = card.querySelector('.dialog__close');
  var deactivatePin;

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
  };

  return function (callbackDeactivate) {
    showCard();
    deactivatePin = callbackDeactivate;
  };
})();
