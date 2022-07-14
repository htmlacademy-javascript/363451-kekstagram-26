const EFFECTS = {
  chrome: {
    options: {
      range: { min: 0, max: 1, },
      start: 1,
      step: 0.1,
    },
    style: 'grayscale',
    unit: '',
  },

  sepia: {
    options: {
      range: { min: 0, max: 1, },
      start: 1,
      step: 0.1,
    },
    style: 'sepia',
    unit: '',
  },

  marvin: {
    options: {
      range: { min: 0, max: 100, },
      start: 100,
      step: 1,
    },
    style: 'invert',
    unit: '%',
  },

  phobos: {
    options: {
      range: { min: 0, max: 3, },
      start: 3,
      step: 0.1,
    },
    style: 'blur',
    unit: 'px',
  },

  heat: {
    options: {
      range: { min: 1, max: 3, },
      start: 3,
      step: 0.1,
    },
    style: 'brightness',
    unit: '',
  },
};

const NO_EFFECT = 'none';

const effectSliderContainer = document.querySelector('.img-upload__effect-level');
const effectInputValue = document.querySelector('.effect-level__value');
const imageUploadForm = document.querySelector('#upload-select-image');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');


const updateSlider = (effectName) => {
  slider.noUiSlider.updateOptions(effectName.options);
};

const changeEffects = (evt) => {
  const effect = evt.target.value;

  imgUploadPreview.className = '';
  imgUploadPreview.classList.add(`effects__preview--${effect}`);
  if (effect === NO_EFFECT) {
    imgUploadPreview.style.filter = NO_EFFECT;
    imgUploadPreview.className = '';
    effectInputValue.value = '';
    effectSliderContainer.classList.add('hidden');
  } else {
    effectSliderContainer.classList.remove('hidden');
    updateSlider(EFFECTS[effect]);
  }
};

const getEffectStyle = (handlersValue) => {
  const value = handlersValue[0];
  const effectName = imageUploadForm.effect.value;
  if (effectName === NO_EFFECT) {
    return;
  }
  const filterName = EFFECTS[effectName].style;
  const filterUnits = EFFECTS[effectName].unit;
  imgUploadPreview.style.filter = `${filterName}(${value}${filterUnits})`;
  effectInputValue.value = value;
};

export { changeEffects, getEffectStyle };
