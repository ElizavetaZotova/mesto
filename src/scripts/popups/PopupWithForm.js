import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector)

    this._submitCallback = submitCallback;

    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');

    this._bindedSubmitHandler = this._submitFormHandler.bind(this);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._bindedSubmitHandler);
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  _removeListeners() {
    super._removeListeners();

    this._popupForm.removeEventListener('submit', this._bindedSubmitHandler);
  }

  _submitFormHandler(event) {
    event.preventDefault();

    this._submitCallback(this._getInputValues());
  }

  _getInputValues() {
    const values = {};

    this._inputList.forEach(inputElement => {
      values[inputElement.name] = inputElement.value
    });

    return values;
  }
}
