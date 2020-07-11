'use strict';
(function () {
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var similarListElement = document.querySelector('.pictures');
  var renderPictures = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__comments').textContent = picture.commentsNumber;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;

    return pictureElement;
  };
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < window.gallery.cards.length; j++) {
    fragment.appendChild(renderPictures(window.gallery.cards[j]));
  }

  similarListElement.appendChild(fragment);
})();
