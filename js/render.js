'use strict';

window.renderPin = function (data) {
  var templateElement = document.querySelector('#pin-template');
  var pinToClone = templateElement.content.querySelector('.pin');
  var newPin = pinToClone.cloneNode(true);
  var newPinAvatar = newPin.querySelector('img');

  newPin.style.left = data.location.x + 'px';
  newPin.style.top = data.location.y + 'px';
  newPin.setAttribute('tabindex', '1');
  newPin.data = data;
  newPinAvatar.src = data.author.avatar;
  newPinAvatar.alt = 'User avatar';
  return newPin;
};
