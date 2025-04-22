import { initialCards } from './components/cards.js';
import { createCard, handleDelete, handleLike } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

const placesList = document.querySelector('.places__list');
const profileEditBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');
const modals = document.querySelectorAll('.popup');

const profilePopup = document.querySelector('.popup_type_edit');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileForm = profilePopup.querySelector('.popup__form');

const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newCardPopup.querySelector('.popup__form');
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardForm.querySelector('.popup__input_type_url');

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');


function handleImageClick(data) {
    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupCaption.textContent = data.name;
    openModal(imagePopup);
}


profileEditBtn.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profilePopup);
});

addCardBtn.addEventListener('click', () => {
    newCardForm.reset();
    openModal(newCardPopup);
});


modals.forEach(modal => {
    const closeButton = modal.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closeModal(modal));
});


profileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(profilePopup);
});


newCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const newCard = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };
    const cardElement = createCard(newCard, handleDelete, handleLike, handleImageClick);
    placesList.prepend(cardElement);
    closeModal(newCardPopup);
    newCardForm.reset();
});


initialCards.forEach(card => {
    const cardElement = createCard(card, handleDelete, handleLike, handleImageClick);
    placesList.append(cardElement);
});
