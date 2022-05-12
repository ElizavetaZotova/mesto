export class FormValidator {
  constructor(validationParams, formElement) {
    this._validationParams = validationParams;
    this._formElement = formElement;
  }

  enableValidation() {
    this._setEventListeners();
  }

  clearFormValidationErrors() {
    if (!this._inputList) {
      return;
    }

    this._inputList.forEach((inputElement) => this._hideInputError(inputElement));
  }

  disableButton(buttonElement) {
    buttonElement.classList.add(this._validationParams.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }

  enableButton(buttonElement) {
    buttonElement.classList.remove(this._validationParams.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._validationParams.inputErrorClass);
    errorElement.classList.remove(this._validationParams.errorClass);

    errorElement.textContent = '';
  };

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationParams.inputSelector));
    this._submitButtonElement = this._formElement.querySelector(this._validationParams.submitButtonSelector);

    // чтобы проверить состояние кнопки в самом начале
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        // чтобы проверять его при изменении любого из полей
        this._toggleButtonState();
      });
    });
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton(this._submitButtonElement);

      return;
    }

    this.enableButton(this._submitButtonElement);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._validationParams.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationParams.errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationParams.inputErrorClass);
    errorElement.classList.remove(this._validationParams.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);

      return;
    }

    this._showInputError(inputElement, inputElement.validationMessage);
  };
}
