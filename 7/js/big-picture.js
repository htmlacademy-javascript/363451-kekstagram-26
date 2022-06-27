import { makeElement } from './util.js';
import { isEscapeKey } from './util.js';
const bigPicture = document.querySelector('.big-picture');
const bodyContainer = document.querySelector('body');
const urlPicture = bigPicture.querySelector('.big-picture__img img');
const likeCount = bigPicture.querySelector('.likes-count');
const commentList = bigPicture.querySelector('.social__comments');
const commentCount = bigPicture.querySelector('.comments-count');
const commentCountElement = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.comments-loader');
const description = document.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const fragment = document.createDocumentFragment();

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  bodyContainer.classList.remove('modal-open');
  removeEvent();
};

const onPictureEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onClosedPicture = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

function removeEvent () {
  closeButton.removeEventListener('click', onClosedPicture);
  document.removeEventListener('keydown', onPictureEscKeydown);
}

const openBigPicture = (photo) => {
  urlPicture.src = photo.url;
  urlPicture.alt = photo.description;
  likeCount.textContent = photo.likes;
  description.textContent = photo.description;
  commentCount.textContent = photo.comments.length;

  photo.comments.forEach((comment) => {
    const socialComment = makeElement('li', 'social__comment');
    const image = makeElement('img', 'social__picture');
    const p = makeElement('p', 'social__text');
    image.src = comment.avatar;
    image.alt = comment.name;
    image.width = '35';
    image.heigth = '35';
    socialComment.append(image);
    p.textContent = comment.message;
    socialComment.append(p);

    fragment.append(socialComment);
  });

  commentList.innerHTML = '';
  commentList.append(fragment);
  description.textContent = photo.description;
  bigPicture.classList.remove('hidden');
  bodyContainer.classList.add('modal-open');
  closeButton.addEventListener('click', onClosedPicture);
  document.addEventListener('keydown', onPictureEscKeydown);
  commentCountElement.classList.add('hidden');
  commentLoader.classList.add('hidden');
};

export {openBigPicture};
