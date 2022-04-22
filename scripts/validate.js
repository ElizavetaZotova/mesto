function enableValidation(validationParams) {
  const formList = Array.from(document.querySelectorAll(validationParams.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, validationParams);
  });
}

function disableButton(buttonElement, { inactiveButtonClass }) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

function enableButton(buttonElement, { inactiveButtonClass }) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

function clearFormValidationErrors(formElement, validationParams) {
  const inputList = Array.from(formElement.querySelectorAll(validationParams.inputSelector));

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationParams);
  });
}

function hideInputError(formElement, inputElement, validationParams) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationParams.inputErrorClass);
  errorElement.classList.remove(validationParams.errorClass);

  errorElement.textContent = '';
};

function setEventListeners(formElement, validationParams) {
  const inputList = Array.from(formElement.querySelectorAll(validationParams.inputSelector));
  const buttonElement = formElement.querySelector(validationParams.submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, validationParams);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationParams);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, validationParams);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, validationParams) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, validationParams);
  } else {
    enableButton(buttonElement, validationParams);
  }
}

function showInputError(formElement, inputElement, errorMessage, validationParams) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationParams.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationParams.errorClass);
};

function hideInputError(formElement, inputElement, validationParams) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationParams.inputErrorClass);
  errorElement.classList.remove(validationParams.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement, validationParams) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationParams);
  } else {
    hideInputError(formElement, inputElement, validationParams);
  }
};
