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
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject('Ошибка при получении данных пользователя');
            }
        });
}

export function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject('Ошибка при загрузке карточек');
            }
        });
}

export function updateUserInfo(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ name: name, about: about })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject('Ошибка при обновлении профиля');
            }
        });
}

export function addNewCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ name: name, link: link })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject('Ошибка при добавлении новой карточки');
            }
        });
}

export function deleteCardFromServer(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject('Не удалось удалить карточку');
            }
        });
}

export function updateAvatar(avatarLink) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar: avatarLink })
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject('Ошибка при обновлении аватара');
            }
        });
}

export function likeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject('Ошибка при добавлении лайка');
            }
        });
}

export function dislikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject('Ошибка при удалении лайка');
            }
        });
}
