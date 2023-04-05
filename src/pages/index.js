import './index.css';

import {
  initialCards,
  classData,
  profileNameSelector,
  profileAboutSelector,
  profileEditButton,
  addCardButton,
  popupProfileSelector,
  popupNewPlaceSelector,
  popupPhotosSelector,
  cardsContainerSelector,
  cardSelector,
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

const userInfo = new UserInfo({ profileNameSelector, profileAboutSelector });


function createNewCard(item, cardSelector) {
  const card = new Card(item, cardSelector, () => {
    popupPhotos.open(item.link, item.name);
  });
  return card.generateCard();
}


const popupPhotos = new PopupWithImage(popupPhotosSelector);
popupPhotos.setEventListener();


const cardsContainer = new Section({
  items: initialCards, renderer: (item) => {
    const cardElement = createNewCard(item, cardSelector);
    cardsContainer.addItem(cardElement);
  },
}, cardsContainerSelector);
cardsContainer.renderItems();


const popupProfile = new PopupWithForm(popupProfileSelector, (param) => {
  userInfo.setUserInfo({ userName: param.title, userDescription: param.subtitle });
  popupProfile.close();
});
popupProfile.setEventListener();
const popupProfileValidator = new FormValidator(classData, popupProfile.getFormElement());
popupProfileValidator.enableValidation();


const popupNewPlace = new PopupWithForm(popupNewPlaceSelector, (param) => {
  const item = { name: param.name, link: param.url };
  const cardElement = createNewCard(item, cardSelector);
  cardsContainer.addNewItem(cardElement);
  popupNewPlace.close();
});
popupNewPlace.setEventListener();
const popupNewPlaceValidator = new FormValidator(classData, popupNewPlace.getFormElement());
popupNewPlaceValidator.enableValidation();


profileEditButton.addEventListener('click', () => {
  const userInfoData = userInfo.getUserInfo();
  const profileForm = popupProfile.getFormElement();
  profileForm.elements.name.value = userInfoData.userName;
  profileForm.elements.description.value = userInfoData.userDescription;
  popupProfileValidator.resetValidation();
  popupProfile.open();
});


addCardButton.addEventListener('click', () => {
  popupNewPlaceValidator.resetValidation();
  popupNewPlace.open();
});



