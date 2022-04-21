let validationElementSelectors = {
  formSelector: '',
  inputSelector: '',
  submitButtonSelector: '',
  inactiveButtonClass: '',
  inputErrorClass: '',
  errorClass: ''
}

function enableValidation(params) {
  validationElementSelectors = params;

  const formList = Array.from(document.querySelectorAll(validationElementSelectors.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationElementSelectors.inputSelector));
  const buttonElement = formElement.querySelector(validationElementSelectors.submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationElementSelectors.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(validationElementSelectors.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationElementSelectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationElementSelectors.errorClass);
};

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationElementSelectors.inputErrorClass);
  errorElement.classList.remove(validationElementSelectors.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
