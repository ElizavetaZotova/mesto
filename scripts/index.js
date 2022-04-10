const formElement = document.querySelector('#popupForm');
const nameInput = document.querySelector('#userNameInput');
const jobInput = document.querySelector('#userAboutInput');

const profileEditButton = document.querySelector('#profileEditButton');
const editProfilePopup = document.querySelector('#editProfilePopup');
const editProfilePopupCloseButton = document.querySelector('#editProfilePopupCloseButton');

const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__discription');

function openEditProfilePopup() {
  editProfilePopup.classList.add('popup_opened');

  const currentNameValue = profileNameElement.innerHTML;
  const currentJobValue = profileDescriptionElement.innerHTML;

  nameInput.value = currentNameValue;
  jobInput.value = currentJobValue;
}

function closeEditProfilePopup() {
  editProfilePopup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileNameElement.innerHTML = nameInput.value;
  profileDescriptionElement.innerHTML = jobInput.value;

  closeEditProfilePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
profileEditButton.addEventListener('click', openEditProfilePopup);
editProfilePopupCloseButton.addEventListener('click', closeEditProfilePopup);
