import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './cards.js';

const cardTemplateSelector = '#elementTemplate';

const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__discription');
const profileEditButtonElement = document.querySelector('#profileEditButton');
const placeAddButtonElement = document.querySelector('.profile__add-button')

const elementsContainer = document.querySelector('.elements__container');

const profileEditPopupElement = document.querySelector('#editProfilePopup');
const profileEditPopupSaveButtonElement = profileEditPopupElement.querySelector('.popup__save-button');
const profileEditPopupCloseButtonElement = profileEditPopupElement.querySelector('.popup__close-button');
const profileEditPopupNameInputElement = profileEditPopupElement.querySelector('#userNameInput');
const profileEditPopupNameAboutElement = profileEditPopupElement.querySelector('#userAboutInput')

const addPlacePopupElement = document.querySelector('#addPlacePopup');
const addPlacePopupSaveButtonElement = addPlacePopupElement.querySelector('.popup__save-button');
const addPlacePopupCloseButtonElement = addPlacePopupElement.querySelector('.popup__close-button');

const placePreviewPopupElement = document.querySelector('#previewPlacePopup');
const placePreviewPopupCloseButtonElement = placePreviewPopupElement.querySelector('.popup__close-button');
const placePreviewPopupImageElement = placePreviewPopupElement.querySelector('.popup__image');
const placePreviewPopupImageTitleElement = placePreviewPopupElement.querySelector('.popup__image-title');

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
  initialCards.forEach(card => renderCard(createCard(card.name, card.link)));
}

function openEditProfilePopup() {
  profileEditPopupNameInputElement.value = profileNameElement.textContent;
  profileEditPopupNameAboutElement.value = profileDescriptionElement.textContent;

  formsValidators[document.forms.editProfileForm.name].clearFormValidationErrors();
  formsValidators[document.forms.editProfileForm.name].enableButton(profileEditPopupSaveButtonElement);

  openPopup(profileEditPopupElement);
}

function onEditProfileFormSubmit(evt) {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  const formProps = Object.fromEntries(formData);

  profileNameElement.textContent = formProps.userName;
  profileDescriptionElement.textContent = formProps.userAbout;

  closePopup(profileEditPopupElement);
}

function openAddNewElementPopup() {
  document.forms.addPlaceForm.reset();

  formsValidators[document.forms.addPlaceForm.name].clearFormValidationErrors();
  formsValidators[document.forms.addPlaceForm.name].disableButton(addPlacePopupSaveButtonElement);

  openPopup(addPlacePopupElement);
}

function openCardPreviePopup(name, link) {
  placePreviewPopupImageElement.src = link;
  placePreviewPopupImageElement.alt = name;
  placePreviewPopupImageTitleElement.textContent = name;

  openPopup(placePreviewPopupElement);
}

function onAddElementFormSubmit(evt) {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  const formProps = Object.fromEntries(formData);
  const card = createCard(formProps.placeName, formProps.placeImageLink);

  renderCard(card);
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

  removeClosePoupListeners(popup);
}

function setFormsValidation() {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {
    formsValidators[formElement.name] = new FormValidator(validationConfig, formElement);

    formsValidators[formElement.name].enableValidation();
  });
}

function createCard(name, link) {
  return new Card(name, link, cardTemplateSelector, openCardPreviePopup).getElement();
}

function renderCard(card) {
  elementsContainer.prepend(card);
}

profileEditButtonElement.addEventListener('click', openEditProfilePopup);
placeAddButtonElement.addEventListener('click', openAddNewElementPopup);

document.forms.editProfileForm.addEventListener('submit', onEditProfileFormSubmit);
document.forms.addPlaceForm.addEventListener('submit', onAddElementFormSubmit);

profileEditPopupCloseButtonElement.addEventListener('click', () => closePopup(profileEditPopupElement));
addPlacePopupCloseButtonElement.addEventListener('click', () => closePopup(addPlacePopupElement));
placePreviewPopupCloseButtonElement.addEventListener('click', () => closePopup(placePreviewPopupElement));

initCards();
setFormsValidation();
