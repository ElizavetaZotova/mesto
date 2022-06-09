import { Popup } from './Popup'

export class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupForm = this._popup.querySelector('.popup__form');

    this._popupButton = this._popupForm.querySelector('.popup__save-button');
    this._popupButtonTextContent = this._popupButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault();

      this._handleSubmitCallback();
    })
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  renderLoadingWhileDeleting(isLoading) {
    if (isLoading) {
      this._popupButton.textContent = 'Удаление...';
    } else {
      this._popupButton.textContent = this._popupButtonTextContent;
    }
  }
}
