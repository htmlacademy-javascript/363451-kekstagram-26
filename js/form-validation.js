import { checkStringLength } from './util.js';

const MAX_LENGTH_HASHTAG = 20;
const MAX_HASHTAG_NUMBERS = 5;
const MAX_LENGTH_DESCRIPTION = 140;
const REGULAR_EXPRESSION = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadForm = document.querySelector('.img-upload__form');


const getHashtags = (string) => string.toLowerCase().split(' ').filter((item) => item !== '');

const checkQuantity = (string) => getHashtags(string).length <= MAX_HASHTAG_NUMBERS;

const checkHashtagsSymbols = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.every((element) => REGULAR_EXPRESSION.test(element));
};

const validateHashtagsLength = (value) => {
  const hashtagsArr = value.trim().split(' ');
  for (let i = 0; i < hashtagsArr.length; i++) {
    if (hashtagsArr[i].length > MAX_LENGTH_HASHTAG) {
      return false;
    }
  }
  return true;
};

const getUniqueHashtags = (value) => {
  const hashtags = getHashtags(value);
  const uniqueSet = new Set(hashtags);
  return hashtags.length === uniqueSet.size;
};

const getHashtagsToLowerCase = (string) => {
  const hashtags = getHashtags(string);
  return hashtags.map((element) => element.toLowerCase());
};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

pristine.addValidator(checkStringLength(textDescription, MAX_LENGTH_DESCRIPTION), `Не более ${MAX_LENGTH_DESCRIPTION} символов`);
pristine.addValidator(textHashtags, validateHashtagsLength, `Не более ${MAX_LENGTH_HASHTAG} символов`);
pristine.addValidator(textHashtags, checkHashtagsSymbols, 'хэш-тег начинается с символа # (решётка), строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');
pristine.addValidator(textHashtags, getUniqueHashtags, 'один и тот же хэш-тег не может быть использован дважды');
pristine.addValidator(textHashtags, checkQuantity, 'нельзя указать больше пяти хэш-тегов');
pristine.addValidator(textHashtags, getHashtagsToLowerCase, '');

export {pristine};

