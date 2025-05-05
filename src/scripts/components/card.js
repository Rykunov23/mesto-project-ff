import { deleteCardFromServer, config } from './api.js';

export function createCard(data, userId, handleDelete, handleLike, handleImageClick) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = getOrCreateLikeCount(cardElement, likeButton);


    cardElement.dataset.cardId = data._id;

    setCardContent(cardImage, cardTitle, data);

    likeCount.textContent = data.likes.length;

    setupLikeButton(likeButton, likeCount, data._id);

    setupDeleteButton(deleteButton, userId, cardElement, handleDelete, data._id, data.owner._id);

    setupImageClickHandler(cardImage, data, handleImageClick);

    return cardElement;
}

function getOrCreateLikeCount(cardElement, likeButton) {
    let likeCount = cardElement.querySelector('.card__like-count');
    if (!likeCount) {
        likeCount = document.createElement('span');
        likeCount.classList.add('card__like-count');
        likeButton.after(likeCount);
    }
    return likeCount;
}

function setCardContent(cardImage, cardTitle, data) {
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;
}

function setupLikeButton(likeButton, likeCount, cardId) {
    likeButton.addEventListener('click', () => {
        handleLike(likeButton, likeCount, cardId);
    });
}

function setupDeleteButton(deleteButton, userId, cardElement, handleDelete, cardId, cardOwnerId) {
    if (deleteButton && userId !== cardOwnerId) {
        deleteButton.remove();
    } else {
        deleteButton.addEventListener('click', () => handleDelete(cardElement, cardId));
    }
}

function setupImageClickHandler(cardImage, data, handleImageClick) {
    cardImage.addEventListener('click', () => {
        handleImageClick(data);
    });
}

export function handleLike(likeButton, likeCount, cardId) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const method = isLiked ? 'DELETE' : 'PUT';

    fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: method,
        headers: config.headers
    })
        .then(response => response.json())
        .then(data => {
            likeButton.classList.toggle('card__like-button_is-active');
            likeCount.textContent = data.likes.length;
        })
        .catch(err => {
            console.error('Ошибка при изменении лайка:', err);
        });
}

export function handleDelete(cardElement, cardId) {
    deleteCardFromServer(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch((err) => {
            console.error('Ошибка при удалении карточки с сервера:', err);
        });
}
