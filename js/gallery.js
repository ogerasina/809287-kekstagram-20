'use strict';
(function () {
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var similarListElement = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var commentsListElement = document.querySelector('.social__comments');

  var renderPictures = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__comments').textContent = picture.commentsNumber;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;

    return pictureElement;
  };
  var renderGallery = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < 25; j++) {
      fragment.appendChild(renderPictures(pictures[j]));
    }

    similarListElement.appendChild(fragment);
  };

  window.backend.load(function (response) {
    renderGallery(response);
    window.renderBigPicture = function (currentIndex) {
      bigPicture.querySelector('.big-picture__img img').src = response[currentIndex].url;
      bigPicture.querySelector('.likes-count').textContent = response[currentIndex].likes;
      bigPicture.querySelector('.comments-count').textContent = response[currentIndex].comments.length;
      bigPicture.querySelector('.social__caption').textContent = response[currentIndex].description;
      bigPicture.querySelector('.social__comment-count').classList.add('hidden');
      bigPicture.querySelector('.comments-loader').classList.add('hidden');
      commentsListElement.innerHTML = '';
      window.preview.createCommentFragment(response[currentIndex].comments);
    };
  });
})();
