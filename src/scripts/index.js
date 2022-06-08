import { Section } from './Section.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { UserInfo } from './UserInfo.js';
import { Api } from './Api.js';
import { PopupWithForm, PopupWithImage, PopupWithConfirm } from './popups';

const cardTemplateSelector = '#elementTemplate';
const elementsContainerSelector = '.elements__container';

const profileEditButtonElement = document.querySelector('#profileEditButton');
const cardAddButtonElement = document.querySelector('.profile__add-button')
const profileAvatarElement = document.querySelector('.profile__avatar-container');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_visible'
}

const formsValidators = {};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '5a241458-7ba3-4de4-b2d2-8b278af081f0',
    'Content-Type': 'application/json'
  }
});

const cardList = new Section({
  items: [],
  renderer: item => {
    const card = createCard(item.name, item.link);

    cardList.addItem(card);
  }
}, elementsContainerSelector);

const userInfo = new UserInfo({
  name: '.profile__name',
  avatar: '.profile__avatar',
  about: '.profile__discription',
});

const editProfileModal = new PopupWithForm('#editProfilePopup', onEditProfileFormSubmit);
const updateUserAvatarModal = new PopupWithForm('#updateUserAvatarPopup', onUpdateAvatarFormSubmit);
const previewCardModal = new PopupWithImage('#previewCardPopup', onEditProfileFormSubmit);
const addCardModal = new PopupWithForm('#addCardPopup', onAddElementFormSubmit);
const deleteCardModal = new PopupWithConfirm('#deleteCardPopup');

api.getUserInfo()
  .then((info) => {
    userInfo.setUserInfo({
      _id: info._id,
      name: info.name,
      avatar: info.avatar,
      about: info.about,
    });

    api.getInitialCards()
      .then((items) => {
        items.forEach(item => {
          const card = createCard(item);

          cardList.addItem(card);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

function openEditProfilePopup() {
  const { name, about } = userInfo.getUserInfo();

  document.forms.editProfileForm.elements['userNameInput'].value = name;
  document.forms.editProfileForm.elements['userAboutInput'].value = about;

  formsValidators[document.forms.editProfileForm.name].clearFormValidationErrors();
  formsValidators[document.forms.editProfileForm.name].enableButton();

  editProfileModal.open();
}

function onEditProfileFormSubmit(values) {
  editProfileModal.renderLoading(true);

  api.updateUserInfo({
    name: values.userName,
    about: values.userAbout,
  })
    .then((info) => {
      userInfo.setUserInfo({
        name: info.name,
        avatar: info.avatar,
        about: info.about,
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfileModal.renderLoading(false);
      editProfileModal.close();
    });
}

function onUpdateAvatarFormSubmit(values) {
  updateUserAvatarModal.renderLoading(true);

  api.updateUserAvatar(values.avatarImageLink)
    .then((info) => {
      userInfo.setUserInfo(info);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      updateUserAvatarModal.renderLoading(false);
      updateUserAvatarModal.close();
    });
}

function openAddNewElementPopup() {
  formsValidators[document.forms.addCardForm.name].clearFormValidationErrors();
  formsValidators[document.forms.addCardForm.name].disableButton();

  addCardModal.open();
}

function openUpdateAvatarPopup() {
  formsValidators[document.forms.updateAvatarForm.name].clearFormValidationErrors();
  formsValidators[document.forms.updateAvatarForm.name].disableButton();

  updateUserAvatarModal.open();
}

function onAddElementFormSubmit(values) {
  addCardModal.renderLoading(true);

  api.addCard({
    name: values.placeName,
    link: values.placeImageLink,
  })
    .then((createdCard) => {
      const card = createCard(createdCard);

      cardList.addItem(card)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardModal.renderLoading(false);
      addCardModal.close();
    });
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

function createCard(data) {
  const card = new Card(
    data,
    cardTemplateSelector,
    userInfo.getUserInfo()._id,
    {
      handleCardClick: openCardPreviePopup,
      handleLike: () => {
        api.likeCard(data._id)
          .then(({ likes }) => {
            card.updateLikes(likes);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      handleDislike: () => {
        api.unlikeCard(data._id)
          .then(({ likes }) => {
            card.updateLikes(likes);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      handleCardDelete: () => {
        deleteCardModal.setSubmitAction(_ => {
          deleteCardModal.renderLoadingWhileDeleting(true)
          api.deleteCard(data._id)
            .then(() => {
              card.handleRemoveCard();
              deleteCardModal.close();
            })
            .catch((err) => console.log(err))
            .finally(() => deleteCardModal.renderLoadingWhileDeleting(false))
        })
        deleteCardModal.open()
      }
    }
  );

  return card.getElement();
}

profileEditButtonElement.addEventListener('click', openEditProfilePopup);
cardAddButtonElement.addEventListener('click', openAddNewElementPopup);
profileAvatarElement.addEventListener('click', openUpdateAvatarPopup);

setFormsValidation();

cardList.render();
