export class Card {
  constructor(name, link, selector, openCardPreviewFunction) {
    this._name = name;
    this._link = link;
    this._selector = selector;
    this._openCardPreviewFunction = openCardPreviewFunction;

    this._createElement();
    this._setListeners();
  }

  getElement() {
    return this._element;
  }

  _getElementTemplate() {
    const elementTemplate = document.querySelector(this._selector).content;

    return elementTemplate.querySelector('.elements__item');
  }

  _createElement() {
    this._element = this._getElementTemplate().cloneNode(true);
    this._elementImage = this._element.querySelector('.elements__item-image');

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector('.elements__title').textContent = this._name
  }

  _setListeners() {
    this._element.querySelector('.elements__button-remove')
      .addEventListener('click', this._remove);

    this._element.querySelector('.elements__button-like')
      .addEventListener('click', this._like);

    this._elementImage.addEventListener('click', this._openPreviePopup.bind(this));
  }

  _remove(evt) {
    evt.target.closest('.elements__item').remove()
  }

  _like(evt) {
    evt.target.classList.toggle('elements__button-like_active');
  }

  _openPreviePopup() {
    this._openCardPreviewFunction(this._name, this._link);
  }
}
