export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-37',
    headers: {
        authorization: '939148e6-6323-4219-9de4-ea6f1b1aface',
        'Content-Type': 'application/json'
    }
};

export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(response => response.ok ? response.json() : Promise.reject('Ошибка при получении данных пользователя'))
        .catch(err => console.error('Произошла ошибка в getUserInfo:', err));
}

export function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(response => response.ok ? response.json() : Promise.reject('Ошибка при загрузке карточек'))
        .catch(err => console.error('Произошла ошибка в getInitialCards:', err));
}

export function updateUserInfo(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ name, about })
    })
        .then(response => response.ok ? response.json() : Promise.reject('Ошибка при обновлении профиля'))
        .catch(err => console.error('Произошла ошибка в updateUserInfo:', err));
}

export function addNewCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ name, link })
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

export function deleteCardFromServer(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(response => response.ok ? response.json() : Promise.reject('Не удалось удалить карточку'))
        .catch(error => {
            console.error('Ошибка при удалении карточки с сервера:', error);
            throw error;
        });
}

export function updateAvatar(avatarLink) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar: avatarLink })
    })
    .then(res => res.ok ? res.json() : Promise.reject('Ошибка при обновлении аватара'))
    .catch(err => {
        console.error('Произошла ошибка в updateAvatar:', err);
        throw err;
    });
}