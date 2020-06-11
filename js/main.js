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
var cards = [];
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
var similarListElement = document.querySelector('.pictures');

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

for (var i = 1; i < 25; i++) {
  createCollectionMap(MESSAGES_ARRAY, NAMES_ARRAY);
}

var renderPictures = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__comments').textContent = picture.commentsNumber;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;


  return pictureElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < cards.length; j++) {
  fragment.appendChild(renderPictures(cards[j]));
}
similarListElement.appendChild(fragment);
