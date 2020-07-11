'use strict';
(function () {
  var uploadFileInput = document.querySelector('#upload-file');
  var uploadModal = document.querySelector('.img-upload__overlay');
  var uploadModalClose = document.querySelector('#upload-cancel');
  var MIN_LENGTH = 2;
  var MAX_LENGTH = 20;
  var TAGS_AMOUNT = 5;
  var HASHTAGS_REGEX = /^#[a-zа-яA-ZА-Я0-9]*$/;

  var uploadFileHandler = function () {
    uploadModal.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPress);
  };

  uploadFileInput.addEventListener('change', uploadFileHandler);

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };

  var closePopup = function () {
    uploadModal.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    uploadFileInput.value = '';

    document.removeEventListener('keydown', onPopupEscPress);
  };

  uploadModalClose.addEventListener('click', function () {
    closePopup();
  });


  // Hashtags validation

  var textHashtags = document.querySelector('.text__hashtags');

  var checkUniqueness = function (arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
      if (!result.includes(arr[i])) {
        result.push(arr[i]);
      }
    }
    return result;
  };

  var validateHashtags = function () {
    var tagsArray = textHashtags.value.split(' ');
    var uniqueTags = checkUniqueness(tagsArray);
    var validateMessage = '';

    for (var t = 0; t < tagsArray.length; t++) {
      for (var i = 0; i < tagsArray.length; i++) {
        if (HASHTAGS_REGEX.test(tagsArray[i]) && tagsArray.length <= TAGS_AMOUNT && tagsArray[i].length >= MIN_LENGTH && tagsArray[i].length <= MAX_LENGTH && tagsArray.length === uniqueTags.length) {
          validateMessage = '';
        }
      }
      for (i = 0; i < tagsArray.length; i++) {
        if (tagsArray.length > TAGS_AMOUNT) {
          validateMessage = 'Вы можете добавить не более 5 хэштэгов.';
        }
      }

      for (i = 0; i < tagsArray.length; i++) {
        if (tagsArray[i].length < MIN_LENGTH) {
          validateMessage = 'Хэштэг должен содержать не менее 1 символа после с символа #.';
        }
      }

      for (i = 0; i < tagsArray.length; i++) {
        if (tagsArray[i].length > MAX_LENGTH) {
          validateMessage = 'Хэштэг должен содержать не более 20 символов.';
        }
      }
      for (i = 0; i < tagsArray.length; i++) {
        if (tagsArray.length !== uniqueTags.length) {
          validateMessage = 'Хэштэги не должны повторяться.';
        }
      }
      for (i = 0; i < tagsArray.length; i++) {
        if (!HASHTAGS_REGEX.test(tagsArray[i])) {
          validateMessage = 'Хэштэг должен содержать только буквы или цифры, начинаться с #.';
        }
      }
      textHashtags.setCustomValidity(validateMessage);
    }
  };

  textHashtags.addEventListener('change', validateHashtags);
})();
