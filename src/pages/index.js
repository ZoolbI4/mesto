import './index.css';

import {
  classData,
  profileAvatarEditButton,
  profileAvatarSelector,
  profileNameSelector,
  profileAboutSelector,
  profileEditButton,
  addCardButton,
  popupProfileSelector,
  popupNewPlaceSelector,
  popupViewerSelector,
  popupConfirmSelector,
  popupUpdateAvatarSelector,
  cardsContainerSelector,
  cardSelector,
} from '../utils/constants.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '2f0a31e8-415e-4395-a0aa-d9649bf0a39e',
    'Content-Type': 'application/json',
  },
});

 const userInfo = new UserInfo({ profileNameSelector, profileAboutSelector, profileAvatarSelector });


api.getPageNeedData().then((responses) => {
  const [cardData, userData] = responses;
  userInfo.setUserInfo({ userName: userData.name, userDescription: userData.about });
  userInfo.setUserAvatar({ userAvatarLink: userData.avatar });
  userInfo.saveUserId(userData._id);
  cardsContainer.renderItems(cardData);
}).catch((err) => {
  console.error(err);
});

const cardsContainer = new Section({
  renderer: (item) => {
    const cardElement = createNewCard(item, cardSelector);
    cardsContainer.addItem(cardElement);
  },
}, cardsContainerSelector);

const popupUpdateAvatar = new PopupWithForm(popupUpdateAvatarSelector, (param) => {
  popupUpdateAvatar.isLoadingMessage(true);
  api.updateProfileAvatar({ avatar: param.url }).then((data) => {
    userInfo.setUserAvatar({ userAvatarLink: data.avatar });
    popupUpdateAvatar.close();
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    popupUpdateAvatar.isLoadingMessage(false);
  });
});
popupUpdateAvatar.setEventListener();
const popupUpdateAvatarValidator = new FormValidator(classData, popupUpdateAvatar.getFormElement());
popupUpdateAvatarValidator.enableValidation();
document.querySelector(profileAvatarEditButton).addEventListener('click', () => {
  popupUpdateAvatarValidator.resetValidation();
  popupUpdateAvatar.open();
});


const popupProfile = new PopupWithForm(popupProfileSelector, (param) => {
  popupProfile.isLoadingMessage(true);
  api.updateUserInfo({ name: param.title, about: param.subtitle }).then((data) => {
    userInfo.setUserInfo({ userName: data.name, userDescription: data.about });
    popupProfile.close();
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    popupProfile.isLoadingMessage(false);
  });
});
popupProfile.setEventListener();
const popupProfileValidator = new FormValidator(classData, popupProfile.getFormElement());
popupProfileValidator.enableValidation();


const popupNewPlace = new PopupWithForm(popupNewPlaceSelector, (param) => {
  popupNewPlace.isLoadingMessage(true);
  const item = { name: param.name, link: param.url };
  api.addNewCard(item).then((newCardItem) => {
    const cardElement = createNewCard(newCardItem, cardSelector);
    cardsContainer.addNewItem(cardElement);
    popupNewPlace.close();
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    popupNewPlace.isLoadingMessage(false);
  });
});
popupNewPlace.setEventListener();
const popupNewPlaceValidator = new FormValidator(classData, popupNewPlace.getFormElement());
popupNewPlaceValidator.enableValidation();


const popupConfirm = new PopupWithConfirm(popupConfirmSelector);
popupConfirm.setEventListener();


const popupViewer = new PopupWithImage(popupViewerSelector);
popupViewer.setEventListener();


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


function createNewCard(item, cardSelector) {
  const card = new Card({
    data: item, cardSelector, userId: userInfo.getUserId(),
    handleCardClick: () => {
      popupViewer.open(item.link, item.name);
    },
    handleLikeButtonClick: () => {
      if (card.isLiked) {
        api.deleteCardLike(card.getCardId()).then((data) => {
          card.unsetLike();
          card.likesCounterUpdate(data.likes);
        }).catch((err) => {
          console.error(err);
        });
      } else {
        api.addCardLike(card.getCardId()).then((data) => {
          card.setLike();
          card.likesCounterUpdate(data.likes);
        }).catch((err) => {
          console.error(err);
        });
      }
    },
    handleRemoveButtonClick: (evt) => {
      const cardElement = evt.target.closest('.element');
      const cardId = card.getCardId();
      popupConfirm.changeHandlerSubmitForm((evt) => {
        evt.preventDefault();
        api.removeCard(cardId).then(() => {
          cardElement.remove();
          popupConfirm.close();
        }).catch((err) => {
          console.error(err);
        });
      });
      popupConfirm.open();
    },
  });
  return card.generateCard();
}





