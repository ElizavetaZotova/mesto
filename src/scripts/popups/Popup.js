export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
  }

  open() {
    this.setEventListeners();
    this._setListeners();

    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened')
    this._popup.classList.remove('popup_blacked');

    this._removeListeners();
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', this.close.bind(this));
  }

  _setListeners() {
    this._popup.addEventListener('click', this._closePopupOnOverleyClick.bind(this));
    document.addEventListener('keyup', this._handleEscClose.bind(this));
  }

  _removeListeners() {
    this._popup.removeEventListener('click', this._closePopupOnOverleyClick);
    this._closeButton.removeEventListener('click', this.close);
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _closePopupOnOverleyClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
