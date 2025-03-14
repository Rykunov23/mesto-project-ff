function createCard(newCard, deleteCard) { // создаю функцию, которая принимает два аргумента 1. создать  2. удалить 
    const cardTemplate = document.querySelector('#card-template').content; // создал переменную которая ищет темплейт в html
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // создал переменную которая клонирует содержание темплейта (это наша карточка)
    // далее нужно найти все элементы нашей карточки, что бы потом присвоить им значения
    const cardImage = cardElement.querySelector('.card__image'); // картинка
    const cardTitle = cardElement.querySelector('.card__title'); // заголовок
    const deleteButton = cardElement.querySelector('.card__delete-button'); //кнопка удалить
    // далее нужно присвоить значения переменным картинки и заголовка + описать логику работы кнопки и повесить слушатель

    cardImage.src = newCard.link;  // когда мы будем перебирать массив initialCards атрибуту картинки src будет присваиваться значения link из массива initialCards 
    cardTitle.textContent = newCard.name; // когда мы будем перебирать массив initialCards в заголовок h2 будет присваиваться текст name из массива initialCards

    deleteButton.addEventListener('click', function () { // добавляем функцию слушателя событий по клику, которая при возникновении события будет удалять карточку с помощью функции DeleteCard
        deleteCard(cardElement);
    });

    return cardElement; // возвращаем карточку
}

const placesList = document.querySelector('.places__list'); // ищем контейнер куда будет добавляться готовая карточка

function deleteCard(cardElement) { // создали функцию DeleteCard которая удалит карточку, по событию клика
    cardElement.remove();
}

initialCards.forEach(function (newCard) { // перебирая масив initialCards 
    const cardElement = createCard(newCard, deleteCard); // cardElement получает готовую карточку из функции createCard, тем самым создавая карточку
    placesList.appendChild(cardElement); // добавляет карточку в контейнер
});