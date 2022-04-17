const formElement = document.querySelector('#popupForm');
const nameInput = document.querySelector('#userNameInput');
const jobInput = document.querySelector('#userAboutInput');

const profileEditButton = document.querySelector('#profileEditButton');
const editProfilePopup = document.querySelector('#editProfilePopup');
const editProfilePopupCloseButton = document.querySelector('#editProfilePopupCloseButton');

const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__discription');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsList = [];

// инициализируем массив начальным набором карточек
cardsList.push(...initialCards);

function renderElements() {
  const elementTemplate = document.querySelector('#elementTemplate').content;
  const elementsContainer = document.querySelector('.elements__container');

  removeAllChildNodes(elementsContainer);

    for(const card of cardsList) {
    // клонируем содержимое тега template
    const elementItem = elementTemplate.querySelector('.elements__item').cloneNode(true);

    // наполняем содержимым
    elementItem.querySelector('.elements__item-image').src = card.link;
    elementItem.querySelector('.elements__title').textContent = card.name;

    // отображаем на странице
    elementsContainer.append(elementItem);
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function openEditProfilePopup() {
  editProfilePopup.classList.add('popup_opened');

  const currentNameValue = profileNameElement.textContent;
  const currentJobValue = profileDescriptionElement.textContent;

  nameInput.value = currentNameValue;
  jobInput.value = currentJobValue;
}

function closeEditProfilePopup() {
  editProfilePopup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileNameElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = jobInput.value;

  closeEditProfilePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
profileEditButton.addEventListener('click', openEditProfilePopup);
editProfilePopupCloseButton.addEventListener('click', closeEditProfilePopup);

renderElements();
