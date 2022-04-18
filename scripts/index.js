const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__discription');
const profileEditButtonElement = document.querySelector('#profileEditButton');
const placeAddButtonElement = document.querySelector('.profile__add-button')

const popupElement = document.querySelector('.popup');

const elementTemplate = document.querySelector('#elementTemplate').content;
const elementsContainer = document.querySelector('.elements__container');

const popUpFormContainerTemplate = document.querySelector('#popUpFormContainerTemplate').content;
const editProfileFormTemplate = document.querySelector('#editProfileFormTemplate').content;
const addNewElementFormTemplate = document.querySelector('#addNewElementFormTemplate').content;
const popUpPreviewImageContainerTemplate = document.querySelector('#popUpPreviewImageContainerTemplate').content;

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

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function openEditProfilePopup() {
  const popupFormContainerElement = popUpFormContainerTemplate.querySelector('.popup__container').cloneNode(true);

  popupFormContainerElement.querySelector('.popup__close-button')
    .addEventListener('click', closePopup);

  const editProfileFormElement = editProfileFormTemplate.querySelector('.popup__form').cloneNode(true);

  editProfileFormElement.querySelector('#userNameInput').value = profileNameElement.textContent;
  editProfileFormElement.querySelector('#userAboutInput').value = profileDescriptionElement.textContent;

  editProfileFormElement.addEventListener('submit', onEditProfileFormSubmit);

  popupFormContainerElement.prepend(editProfileFormElement);
  popupElement.append(popupFormContainerElement);

  openPopup();
}

function onEditProfileFormSubmit(evt) {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  const formProps = Object.fromEntries(formData);

  profileNameElement.textContent = formProps.userName;
  profileDescriptionElement.textContent = formProps.userAbout;

  closePopup();
}

function openAddNewElementPopup() {
  const popupFormContainerElement = popUpFormContainerTemplate.querySelector('.popup__container').cloneNode(true);

  popupFormContainerElement.querySelector('.popup__close-button')
    .addEventListener('click', closePopup);

  const addNewElementFormElement = addNewElementFormTemplate.querySelector('.popup__form').cloneNode(true);

  addNewElementFormElement.addEventListener('submit', onAddElementFormSubmit);

  popupFormContainerElement.prepend(addNewElementFormElement);
  popupElement.append(popupFormContainerElement);

  openPopup();
}

function onAddElementFormSubmit(evt) {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  const formProps = Object.fromEntries(formData);

  elementsContainer.prepend(renderElement(formProps.placeName, formProps.placeImageLink));

  closePopup();
}

function clearPopup() {
  removeAllChildNodes(popupElement);
}

function openPopup() {
  popupElement.classList.add('popup_opened');
}

function closePopup() {
  popupElement.classList.remove('popup_opened');
  popupElement.classList.remove('popup_blacked');

  setTimeout(() => clearPopup(), 500);
}

function openElementPreviePopup(evt) {
  const popUpPreviewImageContainerElement = popUpPreviewImageContainerTemplate.querySelector('.popup__image-container').cloneNode(true);

  popUpPreviewImageContainerElement.querySelector('.popup__image').src = evt.target.src;
  popUpPreviewImageContainerElement.querySelector('.popup__image-title').textContent = evt.target.alt;

  popUpPreviewImageContainerElement.querySelector('.popup__close-button')
    .addEventListener('click', closePopup);

  popupElement.append(popUpPreviewImageContainerElement);

  popupElement.classList.add('popup_blacked');

  openPopup();
}

profileEditButtonElement.addEventListener('click', openEditProfilePopup);
placeAddButtonElement.addEventListener('click', openAddNewElementPopup);

initCards();
