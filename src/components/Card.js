export default class Card {
  constructor({ data, userId, cardSelector, handleCardClick, handleLikeButtonClick, handleRemoveButtonClick }) {
    this._currentUserId = userId;
    this._isUserCard = userId === data.owner._id;
    this._imageLink = data.link;
    this._imageName = data.name;
    this._name = data.name;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._handleRemoveButtonClick = handleRemoveButtonClick;
  }

  _getTemplateElement() {
    return document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
  }

  _setEventListeners() {
    if (this._isUserCard) {
      this._cardElement.querySelector('.element__trash-btn').addEventListener('click', (evt) => {
        this._handleRemoveButtonClick(evt);
      });
    }
    this._likeButton.addEventListener('click', (evt) => this._handleLikeButtonClick(evt));
    this._cardsElementImage.addEventListener('click', () => this._handleCardClick());
  }

 generateCard() {
  this._cardElement = this._getTemplateElement();
  this._likeButton = this._cardElement.querySelector('.element__like-btn');
  this._countLikeElement = this._cardElement.querySelector('.element__like-count');
  this._cardsElementImage = this._cardElement.querySelector('.element__photo');
  if (!this._isUserCard) {
    this._cardElement.querySelector('.element__trash-btn').remove();
    }

    this._cardsElementImage.src = this._imageLink;
    this._cardsElementImage.alt = this._imageName;
    this._cardElement.querySelector('.element__title').textContent = this._name;
    this._countLikeElement.textContent = this._likes.length;

    this._toggleLikeState();
    this._setEventListeners();

    return this._cardElement;
  }

  _toggleLikeState() {
    if (this._checkUserLike()) {
      this.setLike();
    } else {
      this.unsetLike();
    }
  }

  setLike() {
    this._likeButton.classList.add('element__like-active-btn');
    this.isLiked = true;
  }

  unsetLike() {
    this._likeButton.classList.remove('element__like-active-btn');
    this.isLiked = false;
  }

  likesCounterUpdate(data) {
    this._countLikeElement.textContent = data.length;
  }

  _checkUserLike() {
    return this._likes.some((item) => item._id === this._currentUserId);
  }

  getCardId() {
    return this._cardId;
  }
}


