'use strict';

var MESSAGES_ARRAY = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES_ARRAY = ['Иван', 'Степан', 'Юлия', 'Катя', 'Маша', 'Василиса', 'Эмилия', 'Женя'];

var MIN_LENGTH = 2;
var MAX_LENGTH = 20;
var TAGS_AMOUNT = 5;
var HASHTAGS_REGEX = /^#[a-zа-яA-ZА-Я0-9]*$/;
var SCALE_STEP = 25;
var COMMENT_MAX_LENGTH = 140;

var cards = [];
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
var similarListElement = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
var commentsListElement = document.querySelector('.social__comments');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createArrayOfNumbers(start, end) {
  var numbers = [];
  for (var l = start; l <= end; l++) {
    numbers.push(l);
  }

  return numbers;
}

var numbersArray = createArrayOfNumbers(1, 25);

var createCollectionMap = function (messages, names) {
  var element = {};

  var randomIndex = getRandomInt(0, numbersArray.length - 1);
  var randomNumber = numbersArray[randomIndex];
  numbersArray.splice(randomIndex, 1);

  element.url = 'photos/' + randomNumber + '.jpg';
  element.description = 'Тут очень красивая фотография!';
  element.likes = getRandomInt(15, 200);
  element.commentsNumber = getRandomInt(1, 2);
  element.comments = [];

  for (var k = 0; k < element.commentsNumber; k++) {
    var comment = {};

    comment.avatar = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
    comment.message = messages[getRandomInt(0, messages.length - 1)];
    comment.name = names[getRandomInt(0, names.length - 1)];

    element.comments.push(comment);
  }

  cards.push(element);
  return cards;
};

var getPictures = function () {
  var picture = {};
  for (var i = 0; i < 24; i++) {
    picture = createCollectionMap(MESSAGES_ARRAY, NAMES_ARRAY);
  }
  return picture;
};

var arrRenderPictures = getPictures();

var renderPictures = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__comments').textContent = picture.commentsNumber;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;

  return pictureElement;
};


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

var fragment = document.createDocumentFragment();
for (var j = 0; j < cards.length; j++) {
  fragment.appendChild(renderPictures(cards[j]));
}

similarListElement.appendChild(fragment);

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
  bigPicture.querySelector('.big-picture__img img').src = arrRenderPictures[numberOfPic].url;
  bigPicture.querySelector('.likes-count').textContent = arrRenderPictures[numberOfPic].likes;
  bigPicture.querySelector('.comments-count').textContent = arrRenderPictures[numberOfPic].comments.length;
  bigPicture.querySelector('.social__caption').textContent = arrRenderPictures[numberOfPic].description;
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  commentsListElement.innerHTML = '';
  createCommentFragment(arrRenderPictures[numberOfPic].comments);
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

var uploadFileInput = document.querySelector('#upload-file');
var uploadModal = document.querySelector('.img-upload__overlay');
var uploadModalClose = document.querySelector('#upload-cancel');

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


var imgUploadPreview = document.querySelector('.img-upload__preview img');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelDepth = document.querySelector('.effect-level__depth');
var effectsList = document.querySelector('.img-upload__effects');
var effectLevelValue = document.querySelector('.effect-level__value');
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');

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

// Add effects

var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
var getLevelPin = function () {
  var levelDepthWidth = effectLevelDepth.offsetWidth;
  var levelFullWidth = effectLevelLine.offsetWidth;
  var percentage = Math.round(100 * levelDepthWidth / levelFullWidth);

  effectLevelValue.value = percentage;
  effectLevelPin.style.left = percentage + '%';
  effectLevelDepth.style.width = percentage + '%';

  return percentage;
};


var getFilterValue = function (filterName, percentage) {
  switch (filterName) {
    case 'none':
      imgUploadPreview.style.filter = '';
      break;
    case 'chrome':
      imgUploadPreview.style.filter = 'grayscale(' + percentage / 100 + ')';
      break;
    case 'sepia':
      imgUploadPreview.style.filter = 'sepia(' + percentage / 100 + ')';
      break;
    case 'marvin':
      imgUploadPreview.style.filter = 'invert(' + percentage + '%)';
      break;
    case 'phobos':
      imgUploadPreview.style.filter = 'blur(' + (percentage * 3 / 100) + 'px)';
      break;
    case 'heat':
      imgUploadPreview.style.filter = 'brightness(' + percentage * 3 / 100 + ')';
      break;
  }
};

var changeFilterType = function (evt) {
  effectLevelValue.value = 100;
  effectLevelPin.style.left = 100 + '%';
  effectLevelDepth.style.width = 100 + '%';
  imgUploadPreview.classList = '';
  imgUploadPreview.style.filter = '';
  imgUploadPreview.classList.add('effects__preview--' + evt.target.value);
  if (evt.target.value !== 'none') {
    imgUploadEffectLevel.classList.remove('hidden');
  } else {
    imgUploadEffectLevel.classList.add('hidden');
  }
};
effectsList.addEventListener('change', changeFilterType);

var changeFilterValue = function () {
  var current = document.querySelector('.effects__radio:checked');
  getFilterValue(current.value, getLevelPin());
};
effectLevelPin.addEventListener('mouseup', changeFilterValue);

// Scale Image

var scaleImageSmaller = function () {
  var str = scaleControlValue.value;
  var scaleValue = parseInt(str.slice(0, -1), 10);

  scaleValue -= SCALE_STEP;
  if (scaleValue <= SCALE_STEP) {
    scaleValue = SCALE_STEP;
  }
  imgUploadPreview.style.transform = 'scale(' + scaleValue / 100 + ')';
  scaleValue = scaleValue + '%';
  scaleControlValue.value = scaleValue;
};

scaleControlValue.value = '100%';

var scaleImageBigger = function () {
  var str = scaleControlValue.value;
  var scaleValue = parseInt(str.slice(0, -1), 10);
  scaleValue += SCALE_STEP;
  if (scaleValue >= 100) {
    scaleValue = 100;


  }
  imgUploadPreview.style.transform = 'scale(' + scaleValue / 100 + ')';
  scaleValue = scaleValue + '%';
  scaleControlValue.value = scaleValue;
};

scaleControlSmaller.addEventListener('click', scaleImageSmaller);

scaleControlBigger.addEventListener('click', scaleImageBigger);

var socialFooterText = document.querySelector('.social__footer-text');

socialFooterText.addEventListener('input', function () {
  var valueLength = socialFooterText.value.length;
  if (valueLength === COMMENT_MAX_LENGTH) {
    socialFooterText.setCustomValidity('Максимальное количество символов 140. Вы ввели максимальное количество символов!');
  }
  if (valueLength > COMMENT_MAX_LENGTH) {
    socialFooterText.setCustomValidity('Максимальное количество символов 140. Удалите лишние символы!');
  } else {
    socialFooterText.setCustomValidity('');
  }
});
