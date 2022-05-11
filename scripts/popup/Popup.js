export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);

    this._setCloseButtonListener();
  }

  open() {
    this._setListeners();

    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened')
    this._popup.classList.remove('popup_blacked');

    this._removeListeners();
  }

  _setListeners() {
    this._popup.addEventListener('click', this._closePopupOnOverleyClick.bind(this));
    document.addEventListener('keyup', this._closePopupOnEscClick.bind(this));
  }

  _setCloseButtonListener() {
    this._popup.querySelector('.popup__close-button')
      .addEventListener('click', this.close.bind(this));
  }

  _removeListeners() {
    this._popup.removeEventListener('click', this._closePopupOnOverleyClick);
    document.removeEventListener('keyup', this._closePopupOnEscClick);
  }

  _closePopupOnOverleyClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  _closePopupOnEscClick(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
