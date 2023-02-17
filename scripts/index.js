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
const cardTemplate = document.querySelector('.card_template').content;

const popupImage = document.querySelector('.popup_photos');
const popupPhotosImage = document.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__figcaption');

const popups = Array.from(document.querySelectorAll('.popup'));

const inputList = Array.from(popupAddForm.querySelectorAll(`.${validationConfig.inputSelector}`));
const buttonElement = popupAddForm.querySelector(`.${validationConfig.submitButtonSelector}`);

const cardElement = cardTemplate.querySelector('.element');

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

function createCard(card) {
  const clonCardElement = cardElement.cloneNode(true);
  const cardsElementImage = clonCardElement.querySelector('.element__photo');

  cardsElementImage.src = card.link;
  cardsElementImage.alt = card.name;
  clonCardElement.querySelector('.element__title').textContent = card.name;

  cardsElementImage.addEventListener('click', openPopupPhotos);
  clonCardElement.querySelector('.element__like').addEventListener('click', handleLikeButtonClick);
  clonCardElement.querySelector('.element__trash-button').addEventListener('click', handleRemoveButtonClick);

  return clonCardElement;
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardElement = createCard({
    name: titleAddInput.value,
    link: urlAddInput.value
  });
  cardsContainer.prepend(cardElement);
  popupAddForm.reset();
  toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
  closePopup(popupAdd);
}

function openPopupPhotos(evt) {
  popupPhotosImage.src = evt.target.src;
  popupPhotosImage.alt = evt.target.alt;
  popupImageCaption.textContent = evt.target.alt;
  openPopup(popupImage);
}

initialCards.forEach (card => {
  cardsContainer.append( createCard(card) );
});


function handleLikeButtonClick(evt) {
  evt.target.classList.toggle('element__like-active-button');
}

function handleRemoveButtonClick(evt) {
  evt.target.closest('.element').remove();
}


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



