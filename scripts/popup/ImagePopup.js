import { Popup } from './Popup.js'

export class ImagePopup extends Popup {
  constructor(selector) {
    super(selector)

    this._setElements();
  }

  open(caption, link) {
    super.open();

    this._setValues(caption, link)
  }

  _setElements() {
    this._imageElement = this._popup.querySelector('.popup__image');
    this._imageTitleElement = this._popup.querySelector('.popup__image-title');
  }

  _setValues(caption, link) {
    this._imageElement.src = link;
    this._imageElement.alt = caption;
    this._imageTitleElement.textContent = caption;
  }
}
