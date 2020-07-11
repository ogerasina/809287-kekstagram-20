'use strict';
(function () {

  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelLine = document.querySelector('.effect-level__line');

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var effectLevelLineWidth = effectLevelLine.offsetWidth;
    var startCoordX = evt.clientX;

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = startCoordX - moveEvt.clientX;
      startCoordX = moveEvt.clientX;

      if (effectLevelPin.offsetLeft < 0) {
        effectLevelPin.style.left = 0 + 'px';
        effectLevelDepth.style.width = 0 + 'px';
      } else if (effectLevelPin.offsetLeft > effectLevelLineWidth) {
        effectLevelPin.style.left = effectLevelLineWidth + 'px';
        effectLevelDepth.style.width = effectLevelLineWidth + 'px';
      } else {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift) + 'px';
        effectLevelDepth.style.width = (effectLevelPin.offsetLeft - shift) + 'px';
      }
      window.pictureEffects.changeFilterValue();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          effectLevelPin.removeEventListener('click', onClickPreventDefault);
        };
        effectLevelPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
