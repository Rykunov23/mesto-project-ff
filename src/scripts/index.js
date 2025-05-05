import { enableValidation } from './components/validation.js';
import { openModal, closeModal } from './components/modal.js';
import { createCard, handleDelete, handleLike } from './components/card.js';
import { getUserInfo, getInitialCards, updateUserInfo, addNewCard, updateAvatar } from './components/api.js';


const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};


const placesList = document.querySelector('.places__list');

const modals = document.querySelectorAll('.popup');


const profileEditBtn = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileForm = profilePopup.querySelector('.popup__form');
const profileSubmitButton = profileForm.querySelector('.popup__button');


const addCardBtn = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newCardPopup.querySelector('.popup__form');
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardForm.querySelector('.popup__input_type_url');
const newCardSubmitButton = newCardForm.querySelector('.popup__button');


const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');


const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarForm.querySelector('.popup__input_type_avatar');  // Измените на .popup__input_type_avatar
const avatarSubmitButton = avatarForm.querySelector('.popup__button');
const avatarEditBtn = document.querySelector('.profile__avatar-edit-button');
const avatarImage = document.querySelector('.profile__image');

let currentUserId = null;


function handleImageClick({ link, name }) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(imagePopup, validationConfig);
}

modals.forEach(modal => {
    modal.querySelector('.popup__close').addEventListener('click', () => closeModal(modal));
});

function handleFormSubmit({ button, request, onSuccess }) {
    const originalText = button.textContent;
    button.textContent = 'Сохранение...';
    button.disabled = true;

    request()
        .then((result) => {
            onSuccess(result);
        })
        .catch((err) => console.error('Ошибка:', err))
        .finally(() => {
            button.textContent = originalText;
            button.disabled = false;
        });
}

profileEditBtn.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profilePopup, validationConfig);
});

profileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    handleFormSubmit({
        button: profileSubmitButton,
        request: () => updateUserInfo(nameInput.value, jobInput.value),
        onSuccess: (data) => {
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
            closeModal(profilePopup);
        }
    });
});

addCardBtn.addEventListener('click', () => {
    newCardForm.reset();
    openModal(newCardPopup, validationConfig);
});

newCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    handleFormSubmit({
        button: newCardSubmitButton,
        request: () => addNewCard(cardNameInput.value, cardLinkInput.value),
        onSuccess: (cardData) => {
            const cardElement = createCard(cardData, currentUserId, handleDelete, handleLike, handleImageClick);
            placesList.prepend(cardElement);
            newCardForm.reset();
            closeModal(newCardPopup);
        }
    });
});

avatarEditBtn.addEventListener('click', () => {
    avatarForm.reset();
    openModal(avatarPopup, validationConfig);
});

avatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    handleFormSubmit({
        button: avatarSubmitButton,
        request: () => updateAvatar(avatarInput.value),
        onSuccess: (data) => {
            avatarImage.style.backgroundImage = `url(${data.avatar})`;
            closeModal(avatarPopup);
        }
    });
});

Promise.all([getUserInfo(), getInitialCards()])
  .then(function ([userData, cards]) {
    console.log('userData:', userData);
    console.log('cards:', cards);

    if (userData && cards) {
      currentUserId = userData._id;
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      avatarImage.style.backgroundImage = `url(${userData.avatar})`;

      cards.forEach(function (card) {
        const cardElement = createCard(card, currentUserId, handleDelete, handleLike, handleImageClick);
        placesList.append(cardElement);
      });
    } else {
      console.error('Не удалось загрузить данные о карточках или пользователе');
    }
  })
  .catch(function (err) {
    console.error('Ошибка при загрузке данных:', err);
  });

enableValidation(validationConfig);
