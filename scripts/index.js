const profileEditOpen = document.querySelector('.profile__edit-button');
const profileAddOpen = document.querySelector('.profile__add-button');
const profileName = document.querySelector (".profile__title");
const profileProffesional = document.querySelector(".profile__subtitle");

const popupEdit = document.querySelector('.popup_edit');
const popupEditForm = document.forms["profileEdit"];
const nameInput = popupEdit.querySelector ('[name="profileName"]');
const proffesionalInput = popupEdit.querySelector ("#proffesional");

const popupAdd = document.querySelector('.popup_add');
const popupAddForm = document.forms["profileAdd"];
const titleAddInput = popupAdd.querySelector('[name="nameTitle"]');
const urlAddInput = popupAdd.querySelector('[name="urlImage"]');

const cardsContainer = document.querySelector('.elements__cards');
const cardTemplate = document.querySelector('.card_template').content;

const popupImage = document.querySelector('.popup_photos');
const popupPhotosImage = document.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__figcaption');

const popupEditClose = popupEdit.querySelector('.popup__close-btn');
const popupAddClose = popupAdd.querySelector('.popup__close-btn');
const popupImageClose = popupImage.querySelector('.popup__close-btn');


function openPopup(popupElement) {
  popupElement.classList.add('popup_open');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_open');
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
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardsElementImage = cardElement.querySelector('.element__photo');

  cardsElementImage.src = card.link;
  cardsElementImage.alt = card.name;
  cardElement.querySelector('.element__title').textContent = card.name;

  cardsElementImage.addEventListener('click', openPopupPhotos);
  cardElement.querySelector('.element__like').addEventListener('click', handleLikeButtonClick);
  cardElement.querySelector('.element__trash-button').addEventListener('click', handleRemoveButtonClick);

  return cardElement;
}

function handleProfileCardSubmit(evt) {
  evt.preventDefault();
  const cardElement = createCard({
    name: titleAddInput.value,
    link: urlAddInput.value
  });
  cardsContainer.prepend(cardElement);
  popupAddForm.reset();
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

profileEditOpen.addEventListener('click', openPopupEdit);
popupEditClose.addEventListener('click', () => closePopup(popupEdit));
popupEditForm.addEventListener('submit',  handleProfileFormSubmit);

profileAddOpen.addEventListener('click', () => openPopup(popupAdd));
popupAddClose .addEventListener('click', () => closePopup(popupAdd));
popupAddForm.addEventListener('submit',  handleProfileCardSubmit);

popupImageClose.addEventListener('click', () => closePopup(popupImage));


