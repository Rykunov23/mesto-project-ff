import { clearValidation } from './validation.js';

export function openModal(popup, validationConfig) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
    popup.addEventListener('mousedown', handleOverlayClose);

    const form = popup.querySelector('.popup__form');
    if (form) {
        clearValidation(form, validationConfig);
    }
}

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
    popup.removeEventListener('mousedown', handleOverlayClose);
}

function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) closeModal(openedPopup);
    }
}

function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
}
