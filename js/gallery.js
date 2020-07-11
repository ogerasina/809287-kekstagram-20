'use strict';
(function () {
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

  var numbersArray = window.utils.createArrayOfNumbers(1, 25);

  var createCollectionMap = function (messages, names) {
    var element = {};

    var randomIndex = window.utils.getRandomInt(0, numbersArray.length - 1);
    var randomNumber = numbersArray[randomIndex];
    numbersArray.splice(randomIndex, 1);

    element.url = 'photos/' + randomNumber + '.jpg';
    element.description = 'Тут очень красивая фотография!';
    element.likes = window.utils.getRandomInt(15, 200);
    element.commentsNumber = window.utils.getRandomInt(1, 2);
    element.comments = [];

    for (var k = 0; k < element.commentsNumber; k++) {
      var comment = {};

      comment.avatar = 'img/avatar-' + window.utils.getRandomInt(1, 6) + '.svg';
      comment.message = messages[window.utils.getRandomInt(0, messages.length - 1)];
      comment.name = names[window.utils.getRandomInt(0, names.length - 1)];

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

  window.gallery = {
    arrRenderPictures: arrRenderPictures,
    cards: cards
  };
})();
