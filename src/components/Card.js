export class Card {
  constructor(data, selector, userId, { handleCardClick, handleCardDelete, handleLike, handleDislike }) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userId

    this._selector = selector;

    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLike = handleLike;
    this._handleDislike = handleDislike;

    this._createElement();
    this._setListeners();
  }

  getElement() {
    return this._element;
  }

  handleRemoveCard() {
    this._element.remove();

    this._element = null;
  }

  updateLikes(likes) {
    this._likes = likes;

    this._recalculateLikesCount();
  }

  _recalculateLikesCount() {
    this._elementLikeCounter.textContent = this._likes.length;

    if (this._likes.some(like => like._id === this._userId)) {
      this._elementLikeButton.classList.add('elements__button-like_active');
    } else {
      this._elementLikeButton.classList.remove('elements__button-like_active');
    }
  }

  _getElementTemplate() {
    const elementTemplate = document.querySelector(this._selector).content;

    return elementTemplate.querySelector('.elements__item');
  }

  _createElement() {
    this._element = this._getElementTemplate().cloneNode(true);
    this._elementImage = this._element.querySelector('.elements__item-image');
    this._elementLikeCounter = this._element.querySelector('.elements__like-counter');
    this._elementLikeButton = this._element.querySelector('.elements__button-like')

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    this._element.querySelector('.elements__title').textContent = this._name;

    if (this._ownerId !== this._userId) {
      this._element.querySelector('.elements__button-remove').style.display = 'none';
    }

    this._recalculateLikesCount();
  }

  _setListeners() {
    this._element.querySelector('.elements__button-remove')
      .addEventListener('click', this._handleCardDelete);

    this._elementLikeButton
      .addEventListener('click', this._like.bind(this));

    this._elementImage.addEventListener('click', this._openPreviePopup.bind(this));
  }

  _like() {
    if (this._elementLikeButton.classList.contains('elements__button-like_active')) {
      return this._handleDislike();
    }

    this._handleLike();
  }

  _openPreviePopup() {
    this._handleCardClick(this._name, this._link);
  }
}
