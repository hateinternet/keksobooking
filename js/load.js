'use strict';

window.load = function (url, onLoad) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.addEventListener('load', function (evt) {
    if (evt.target.readyState === 4) {
      onLoad(JSON.parse(evt.target.responseText));
    }
  });
  xhr.send();
};
