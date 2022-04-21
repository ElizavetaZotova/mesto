const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__discription');
const profileEditButtonElement = document.querySelector('#profileEditButton');
const placeAddButtonElement = document.querySelector('.profile__add-button')

const popupElement = document.querySelector('.popup');

const elementTemplate = document.querySelector('#elementTemplate').content;
const elementsContainer = document.querySelector('.elements__container');

const editProfilePopupElement = document.querySelector('#editProfilePopup');
const editProfilePopupCloseButtonElement = editProfilePopupElement.querySelector('.popup__close-button');
const editProfilePopupNameInputElement = editProfilePopupElement.querySelector('#userNameInput');
const editProfilePopupNameAboutElement = editProfilePopupElement.querySelector('#userAboutInput')

const addPlacePopupElement = document.querySelector('#addPlacePopup');
const addPlacePopupCloseButtonElement = addPlacePopupElement.querySelector('.popup__close-button');

const previewPlacePopupElement = document.querySelector('#previewPlacePopup');
const previewPlacePopupCloseButtonElement = previewPlacePopupElement.querySelector('.popup__close-button');
const previewPlacePopupImageElement = previewPlacePopupElement.querySelector('.popup__image');
const previewPlacePopupImageTitleElement = previewPlacePopupElement.querySelector('.popup__image-title');


function initCards() {
  initialCards.forEach(card => {
    elementsContainer.prepend(renderElement(card.name, card.link));
  })
}

function renderElement(name, link) {
  const elementItem = elementTemplate.querySelector('.elements__item').cloneNode(true);

  elementItem.querySelector('.elements__item-image').src = link;
  elementItem.querySelector('.elements__item-image').alt = name;
  elementItem.querySelector('.elements__title').textContent = name;

  elementItem.querySelector('.elements__button-remove')
    .addEventListener('click', removePlace);

  elementItem.querySelector('.elements__button-like')
    .addEventListener('click', likePlace);

  elementItem.querySelector('.elements__item-image')
    .addEventListener('click', openElementPreviePopup);

  return elementItem;
}

function removePlace(evt) {
  evt.target.closest('.elements__item').remove()
}

function likePlace(evt) {
  evt.target.classList.toggle('elements__button-like_active');
}

function openEditProfilePopup() {
  editProfilePopupNameInputElement.value = profileNameElement.textContent;
  editProfilePopupNameAboutElement.value = profileDescriptionElement.textContent;

  const triggerValidationEvent = new Event('input');
  editProfilePopupNameInputElement.dispatchEvent(triggerValidationEvent);

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
  openPopup(addPlacePopupElement);
}

function onAddElementFormSubmit(evt) {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  const formProps = Object.fromEntries(formData);

  elementsContainer.prepend(renderElement(formProps.placeName, formProps.placeImageLink));

  evt.target.reset();

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

function openElementPreviePopup(evt) {
  previewPlacePopupImageElement.src = evt.target.src;
  previewPlacePopupImageElement.alt = evt.target.alt;
  previewPlacePopupImageTitleElement.textContent = evt.target.alt;

  openPopup(previewPlacePopupElement);
}

profileEditButtonElement.addEventListener('click', openEditProfilePopup);
placeAddButtonElement.addEventListener('click', openAddNewElementPopup);

editProfilePopupElement.querySelector('.popup__form').addEventListener('submit', onEditProfileFormSubmit);
addPlacePopupElement.querySelector('.popup__form').addEventListener('submit', onAddElementFormSubmit);

editProfilePopupCloseButtonElement.addEventListener('click', () => closePopup(editProfilePopupElement));
addPlacePopupCloseButtonElement.addEventListener('click', () => closePopup(addPlacePopupElement));
previewPlacePopupCloseButtonElement.addEventListener('click', () => closePopup(previewPlacePopupElement));

initCards();

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_visible'
});
