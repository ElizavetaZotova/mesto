import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector)

    this._submitCallback = submitCallback;

    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');

    this._popupButton = this._popupForm.querySelector('.popup__save-button');
    this._popupButtonTextContent = this._popupButton.textContent;

    this._bindedSubmitHandler = this._submitFormHandler.bind(this);
  }

  open() {
    super.open();
    this._popupForm.addEventListener('submit', this._bindedSubmitHandler);
  }

  close() {
    super.close();
    this._popupForm.reset();
    this._popupForm.removeEventListener('submit', this._bindedSubmitHandler);
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._popupButton.textContent = 'Сохранение...';
    } else {
      this._popupButton.textContent = this._popupButtonTextContent;
    }
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
