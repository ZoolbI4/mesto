export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


export const classData = {
  inputSelector: 'popup__input',
  submitButtonSelector: 'popup__save',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  activeErrorClass: 'popup__error_visible',
};

export const profileElement = document.querySelector('.profile');
export const profileNameSelector = '.profile__title';
export const profileAboutSelector = '.profile__subtitle';
export const profileEditButton = profileElement.querySelector('.profile__edit-button');
export const addCardButton = profileElement.querySelector('.profile__add-button');

export const popupProfileSelector = '.popup_edit';
export const popupNewPlaceSelector = '.popup_add';
export const popupPhotosSelector = '.popup_photos';

export const cardsContainerSelector = '.elements__cards';
export const cardSelector = '#card-template';
