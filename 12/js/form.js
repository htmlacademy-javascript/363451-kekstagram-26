import { isEscapeKey } from './util.js';
import { pristine } from './form-validation.js';
import { setupZoom, destroyZoom } from './zoom.js';
import { setupEffects, destroyEffects } from './effect.js';
import { onSubmitForm } from './messages.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const bodyContainer = document.querySelector('body');
const uploadClose = document.querySelector('.img-upload__cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

uploadFile.addEventListener('change', () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
  }
});

const onStopPropagationEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  bodyContainer.classList.remove('modal-open');
  imgUploadForm.reset();
  imgUploadPreview.style = 'transform: scale(1)';
  imgUploadPreview.style.filter = 'none';
  imgUploadPreview.className = 'none';
  pristine.reset();
  removeEvent();
  destroyZoom();
  destroyEffects();
};

const onEscKeydown = (evt) => {
  const modalError = bodyContainer.querySelector('.error');
  if(isEscapeKey(evt) && !modalError) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const onClosedForm = (evt) => {
  evt.preventDefault();
  closeUploadForm();
};

function removeEvent () {
  uploadClose.removeEventListener('click', onClosedForm);
  document.removeEventListener('keydown', onEscKeydown);
  textHashtags.removeEventListener('keydown', onStopPropagationEsc);
  textDescription.removeEventListener('keydown', onStopPropagationEsc);
  imgUploadForm.removeEventListener('submit', onSubmitForm);
}

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  bodyContainer.classList.add('modal-open');
  uploadClose.addEventListener('click', onClosedForm);
  document.addEventListener('keydown', onEscKeydown);
  textHashtags.addEventListener('keydown', onStopPropagationEsc);
  textDescription.addEventListener('keydown', onStopPropagationEsc);
  imgUploadForm.addEventListener('submit', onSubmitForm);
  setupZoom();
  setupEffects();
};

uploadFile.addEventListener('change', openUploadForm);

export {openUploadForm, closeUploadForm};
