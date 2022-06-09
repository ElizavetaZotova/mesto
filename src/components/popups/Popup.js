export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._closeButton = this._popup.querySelector('.popup__close-button');

    this._bindedHandleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._bindedHandleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._bindedHandleEscClose);
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click', this._closePopupOnOverleyClick.bind(this));
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
