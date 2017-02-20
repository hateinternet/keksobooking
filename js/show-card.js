'use strict';

window.showCard = function (card, deactivatePin, focusElement) {
  var cardCloseBtn = card.querySelector('.dialog__close');
  card.style.display = 'block';

  var hideCard = function (evt) {
    if (typeof focusElement === 'function') {
      focusElement();
    }
    deactivatePin();
    card.style.display = 'none';
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

  document.addEventListener('keydown', pressEscBtn);
  cardCloseBtn.addEventListener('click', hideCard);
  cardCloseBtn.addEventListener('keydown', hideCardKeyboard);
};
