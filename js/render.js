'use strict';

window.renderPin = function (data) {
  var templateElement = document.querySelector('#pin-template');
  var pinToClone = templateElement.content.querySelector('.pin');
  var newPin = pinToClone.cloneNode(true);
  var newPinAvatar = newPin.querySelector('img');
  var coordinates = 'left:' + data.location.x + 'px;top:' + data.location.y + 'px;';

  newPin.setAttribute('style', coordinates);
  newPin.setAttribute('tabindex', '1');
  newPin.data = data;
  newPinAvatar.setAttribute('src', data.author.avatar);
  newPinAvatar.setAttribute('alt', 'User avatar');
  // console.log(newPin.data);
  return newPin;
};
