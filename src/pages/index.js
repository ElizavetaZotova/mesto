import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithForm, PopupWithImage, PopupWithConfirm } from '../components/popups';
import {
  validationConfig,
  cardTemplateSelector,
  elementsContainerSelector,
  baseUrl,
  authorizationToken,
  profileEditButtonSelector,
  cardAddButtonSelector,
  profileAvatarSelector
} from '../utils/constants.js';

const profileEditButtonElement = document.querySelector(profileEditButtonSelector);
const cardAddButtonElement = document.querySelector(cardAddButtonSelector)
const profileAvatarElement = document.querySelector(profileAvatarSelector);

const formsValidators = {};

const api = new Api({
  baseUrl,
  headers: {
    authorization: authorizationToken,
    'Content-Type': 'application/json'
  }
});

let cardList;

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

editProfileModal.setEventListeners();
updateUserAvatarModal.setEventListeners();
previewCardModal.setEventListeners();
addCardModal.setEventListeners();
deleteCardModal.setEventListeners();

api.getUserInfo()
  .then((info) => {
    userInfo.setUserInfo(info);

    api.getInitialCards()
      .then((items) => {
        cardList = new Section({
          items,
          renderer: item => {
            const card = createCard(item);

            cardList.addItem(card);
          }
        }, elementsContainerSelector);

        cardList.render();
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
      userInfo.setUserInfo(info);
      editProfileModal.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfileModal.renderLoading(false);
    });
}

function onUpdateAvatarFormSubmit(values) {
  updateUserAvatarModal.renderLoading(true);

  api.updateUserAvatar(values.avatarImageLink)
    .then((info) => {
      userInfo.setUserInfo(info);
      updateUserAvatarModal.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      updateUserAvatarModal.renderLoading(false);
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
      addCardModal.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardModal.renderLoading(false);
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
