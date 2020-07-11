'use strict';
(function () {
  var SCALE_STEP = 25;

  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectsList = document.querySelector('.img-upload__effects');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');

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
})();
