import { Section } from './Section.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { UserInfo } from './UserInfo.js';
import { PopupWithForm, PopupWithImage } from './popups';

import { initialCards } from './cards.js';

const cardTemplateSelector = '#elementTemplate';
const elementsContainerSelector = '.elements__container';

const profileEditButtonElement = document.querySelector('#profileEditButton');
const cardAddButtonElement = document.querySelector('.profile__add-button')

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_visible'
}

const formsValidators = {};

const cardList = new Section({
  items: initialCards,
  renderer: item => {
    const card = new Card(item.name, item.link, cardTemplateSelector, openCardPreviePopup).getElement();

    cardList.addItem(card);
  }
}, elementsContainerSelector);

const userInfo = new UserInfo({
  name: '.profile__name',
  description: '.profile__discription',
});

const editProfileModal = new PopupWithForm('#editProfilePopup', onEditProfileFormSubmit);
const previewCardModal = new PopupWithImage('#previewCardPopup', onEditProfileFormSubmit);
const addCardModal = new PopupWithForm('#addCardPopup', onAddElementFormSubmit);

function openEditProfilePopup() {
  const { name, description } = userInfo.getUserInfo();

  document.forms.editProfileForm.elements['userNameInput'].value = name;
  document.forms.editProfileForm.elements['userAboutInput'].value = description;

  formsValidators[document.forms.editProfileForm.name].clearFormValidationErrors();
  formsValidators[document.forms.editProfileForm.name].enableButton();

  editProfileModal.open();
}

function onEditProfileFormSubmit(values) {
  userInfo.setUserInfo({
    name: values.userName,
    description: values.userAbout,
  });

  editProfileModal.close();
}

function openAddNewElementPopup() {
  formsValidators[document.forms.addCardForm.name].clearFormValidationErrors();
  formsValidators[document.forms.addCardForm.name].disableButton();

  addCardModal.open();
}

function onAddElementFormSubmit(values) {
  const card = new Card(values.placeName, values.placeImageLink, cardTemplateSelector, openCardPreviePopup).getElement();

  cardList.addItem(card);
  addCardModal.close();
}

function openCardPreviePopup(name, link) {
  previewCardModal.open(name, link)
}

function setFormsValidation() {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {
    formsValidators[formElement.name] = new FormValidator(validationConfig, formElement);

    formsValidators[formElement.name].enableValidation();
  });
}

profileEditButtonElement.addEventListener('click', openEditProfilePopup);
cardAddButtonElement.addEventListener('click', openAddNewElementPopup);

setFormsValidation();

cardList.render();
