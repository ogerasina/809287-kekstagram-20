'use strict';
(function () {

  window.utils = {
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    createArrayOfNumbers: function (start, end) {
      var numbers = [];
      for (var l = start; l <= end; l++) {
        numbers.push(l);
      }

      return numbers;
    }
  };
})();
