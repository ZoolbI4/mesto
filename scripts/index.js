import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, validationConfig } from './constants.js';


const profileEditOpen = document.querySelector('.profile__edit-button');
const profileAddOpen = document.querySelector('.profile__add-button');
const profileName = document.querySelector (".profile__title");
const profileProffesional = document.querySelector(".profile__subtitle");

const popupEdit = document.querySelector('.popup_edit');
const popupEditForm = document.forms["profileEdit"];
const nameInput = popupEdit.querySelector ('[name="profileName"]');
const proffesionalInput = popupEdit.querySelector ('[name="profileProf"]');

const popupAdd = document.querySelector('.popup_add');
const popupAddForm = document.forms["profileAdd"];
const titleAddInput = popupAdd.querySelector('[name="nameTitle"]');
const urlAddInput = popupAdd.querySelector('[name="urlImage"]');

const cardsContainer = document.querySelector('.elements__cards');
const cardTemplate = '#card-template';

const popupImage = document.querySelector('.popup_photos');
const popupPhotosImage = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__figcaption');

const popups = Array.from(document.querySelectorAll('.popup'));

const popupEditFormValidator = new FormValidator(validationConfig, popupEditForm);
popupEditFormValidator.enableValidation();

const popupAddFormValidator = new FormValidator(validationConfig, popupAddForm);
popupAddFormValidator.enableValidation();

/* const cardElement = cardTemplate.querySelector('.element'); */

function openPopup(popupElement) {
  popupElement.classList.add('popup_open');
  document.addEventListener('keydown', closePopupEscapeClick);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_open');
  document.removeEventListener('keydown', closePopupEscapeClick);
}

function openPopupEdit() {
  nameInput.value = profileName.textContent;
  proffesionalInput.value = profileProffesional.textContent;
  openPopup(popupEdit);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProffesional.textContent = proffesionalInput.value;
  closePopup(popupEdit);
}

function createCard(item) {
  const card = new Card(item, cardTemplate);
  return card.generateCard();
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardElement = {
    name: titleAddInput.value,
    link: urlAddInput.value
  };
  popupAddForm.reset();
  cardsContainer.prepend(createCard(cardElement));
  closePopup(popupAdd);
  popupAddFormValidator.toggleButtonState();
}

export function openPopupPhotos(imageLink, imageName) {
  popupPhotosImage.src = imageLink;
  popupPhotosImage.alt = imageName;
  popupImageCaption.textContent = imageName;
  openPopup(popupImage);
}

initialCards.forEach (card => {
  cardsContainer.append( createCard(card) );
});

function closePopupEscapeClick(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_open');
    closePopup(popupOpened);
  }
}


popups.forEach((element) => {
  element.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup_open')) {
      closePopup(element);
    }
    if (evt.target.classList.contains('popup__close-btn')) {
      closePopup(element);
    }
  });
})

profileEditOpen.addEventListener('click', openPopupEdit);

popupEditForm.addEventListener('submit',  handleProfileFormSubmit);

profileAddOpen.addEventListener('click', () => openPopup(popupAdd));

popupAddForm.addEventListener('submit',  handleCardFormSubmit);



