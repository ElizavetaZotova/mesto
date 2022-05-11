import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const cardTemplateSelector = '#elementTemplate';

const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__discription');
const profileEditButtonElement = document.querySelector('#profileEditButton');
const placeAddButtonElement = document.querySelector('.profile__add-button')

const elementsContainer = document.querySelector('.elements__container');

const editProfilePopupElement = document.querySelector('#editProfilePopup');
const editProfilePopupSaveButtonElement = editProfilePopupElement.querySelector('.popup__save-button');
const editProfilePopupCloseButtonElement = editProfilePopupElement.querySelector('.popup__close-button');
const editProfilePopupNameInputElement = editProfilePopupElement.querySelector('#userNameInput');
const editProfilePopupNameAboutElement = editProfilePopupElement.querySelector('#userAboutInput')

const addPlacePopupElement = document.querySelector('#addPlacePopup');
const addPlacePopupSaveButtonElement = addPlacePopupElement.querySelector('.popup__save-button');
const addPlacePopupCloseButtonElement = addPlacePopupElement.querySelector('.popup__close-button');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_visible'
}

const formsValidators = {};

function initCards() {
  initialCards.forEach(card => {
    elementsContainer.prepend(new Card(card.name, card.link, cardTemplateSelector).getElement());
  })
}

function openEditProfilePopup() {
  editProfilePopupNameInputElement.value = profileNameElement.textContent;
  editProfilePopupNameAboutElement.value = profileDescriptionElement.textContent;

  formsValidators[document.forms.editProfileForm.name].clearFormValidationErrors();
  formsValidators[document.forms.editProfileForm.name].enableButton(editProfilePopupSaveButtonElement);

  openPopup(editProfilePopupElement);
}

function onEditProfileFormSubmit(evt) {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  const formProps = Object.fromEntries(formData);

  profileNameElement.textContent = formProps.userName;
  profileDescriptionElement.textContent = formProps.userAbout;

  closePopup(editProfilePopupElement);
}

function openAddNewElementPopup() {
  document.forms.addPlaceForm.reset();

  formsValidators[document.forms.addPlaceForm.name].clearFormValidationErrors();
  formsValidators[document.forms.addPlaceForm.name].disableButton(addPlacePopupSaveButtonElement);

  openPopup(addPlacePopupElement);
}

function onAddElementFormSubmit(evt) {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  const formProps = Object.fromEntries(formData);

  elementsContainer.prepend(
    new Card(formProps.placeName, formProps.placeImageLink, cardTemplateSelector).getElement()
  );

  closePopup(addPlacePopupElement);
}

function closePopupOnOverleyClick(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

function closePopupOnEscClick(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');

    closePopup(openedPopup);
  }
}

function addPopupCloseListeners(popup) {
  popup.addEventListener('click', closePopupOnOverleyClick);
  document.addEventListener('keyup', closePopupOnEscClick);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');

  addPopupCloseListeners(popup);
}

function removeClosePoupListeners(popup) {
  popup.removeEventListener('click', closePopupOnOverleyClick);
  document.removeEventListener('keyup', closePopupOnEscClick);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.classList.remove('popup_blacked');

  removeClosePoupListeners(popup);
}

function setFormsValidation() {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {
    formsValidators[formElement.name] = new FormValidator(validationConfig, formElement);

    formsValidators[formElement.name].enableValidation();
  });
}

profileEditButtonElement.addEventListener('click', openEditProfilePopup);
placeAddButtonElement.addEventListener('click', openAddNewElementPopup);

editProfilePopupElement.querySelector('.popup__form').addEventListener('submit', onEditProfileFormSubmit);
addPlacePopupElement.querySelector('.popup__form').addEventListener('submit', onAddElementFormSubmit);

editProfilePopupCloseButtonElement.addEventListener('click', () => closePopup(editProfilePopupElement));
addPlacePopupCloseButtonElement.addEventListener('click', () => closePopup(addPlacePopupElement));

initCards();
setFormsValidation();
