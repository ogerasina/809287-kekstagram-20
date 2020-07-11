'use strict';
(function () {
  var similarListElement = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var commentTemplate = document.querySelector('#comment')
    .content
    .querySelector('.social__comment');
  var commentsListElement = document.querySelector('.social__comments');

  var renderComments = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };

  var createCommentFragment = function (comments) {
    var commentFragment = document.createDocumentFragment();
    for (var l = 0; l < comments.length; l++) {
      commentFragment.appendChild(renderComments(comments[l]));
      commentsListElement.appendChild(commentFragment);
    }
  };

  var pictureCancel = document.querySelector('#picture-cancel');
  var thumbPictures = similarListElement.querySelectorAll('.picture img');

  var renderBigImage = function (picture) {
    bigPicture.querySelector('.big-picture__img').children[0].src = picture.url;
    bigPicture.querySelector('.comments-count').textContent = picture.commentsNumber;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.social__caption').textContent = picture.message;

    var getIndexOfPic = function () {
      for (var n = 0; n < thumbPictures.length; n++) {
        if (picture === thumbPictures[n]) {
          var numberOfPic = n;
        }
      }
      return numberOfPic;
    };
    var numberOfPic = getIndexOfPic();
    bigPicture.querySelector('.big-picture__img img').src = window.gallery.arrRenderPictures[numberOfPic].url;
    bigPicture.querySelector('.likes-count').textContent = window.gallery.arrRenderPictures[numberOfPic].likes;
    bigPicture.querySelector('.comments-count').textContent = window.gallery.arrRenderPictures[numberOfPic].comments.length;
    bigPicture.querySelector('.social__caption').textContent = window.gallery.arrRenderPictures[numberOfPic].description;
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    commentsListElement.innerHTML = '';
    createCommentFragment(window.gallery.arrRenderPictures[numberOfPic].comments);
  };
  var onPicturePopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePicture();
    }
  };
  var openPicture = function (current) {
    renderBigImage(current);
    bigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onPicturePopupEscPress);
  };
  var closePicture = function () {
    if (socialFooterText !== document.activeElement) {
      bigPicture.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      document.removeEventListener('keydown', onPicturePopupEscPress);
    }
  };
  similarListElement.addEventListener('click', function (current) {
    if (current.target && current.target.matches('.picture img')) {
      openPicture(current.target);
    }
  });

  similarListElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      if (evt.target && evt.target.matches('.picture')) {
        var target = evt.target.querySelector('img');
        openPicture(target);
      }
    }
  });
  pictureCancel.addEventListener('click', function () {
    closePicture();
  });
  pictureCancel.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      closePicture();
    }
  });
  var socialFooterText = document.querySelector('.social__footer-text');

  socialFooterText.addEventListener('input', function () {
    var valueLength = socialFooterText.value.length;
    var MAX_LENGTH = 140;

    if (valueLength === MAX_LENGTH) {
      socialFooterText.setCustomValidity('Максимальное количество символов 140. Вы ввели максимальное количество символов!');
    }
    if (valueLength > MAX_LENGTH) {
      socialFooterText.setCustomValidity('Максимальное количество символов 140. Удалите лишние символы!');
    } else {
      socialFooterText.setCustomValidity('');
    }
  });
})();
