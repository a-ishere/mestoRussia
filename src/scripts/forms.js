import ServerApi from './api';
import { editUser, getUserInfo } from '../scripts/user';
import { enableButton, disableButton, renderLoading } from '../scripts/tools';
import { BasicValidation } from '../scripts/validation';
import { Popup } from '../scripts/popup';
import { CardList } from '../scripts/cards';
import { Card } from '../scripts/card';

const formAddCard = document.forms.new;
const formUser = document.forms.user;
const formAvatar = document.forms.avatar;
const popup = new Popup(document.querySelector(`.popup`));
const { isEmpty, isWrongLength, isNotLink, isValidText, isValidLink } = new BasicValidation();
const api = new ServerApi();

function showErrorMessage(event) {
    if (event.target.classList.contains(`popup__input`)) {
        const isLinksField = event.target.classList.contains(`popup__input_type_link-url`);
        const error = event.target.nextElementSibling;
        if (isEmpty(event.target)) {
            error.textContent = `Это обязательное поле`;
        } else if (isWrongLength(event.target) && !isLinksField) {
            error.textContent = `Должно быть от 2 до 30 символов`;
        } else if (isNotLink(event.target) && isLinksField) {
            error.textContent = `Здесь должна быть ссылка`;
        } else {
            error.textContent = ``;
        }
    }
}

function createNewCard(event) {
    event.preventDefault();
    const [name, link, submit] = formAddCard.elements;
    renderLoading(submit, `+`, true);
    api.setCard(name.value, link.value, {
        do: (card) => {
            const cardList = new CardList(document.querySelector(`.places-list`));
            cardList.addCard(new Card(card.name, card.link), card._id, card.owner._id, card.likes);
        },
        after: () => {
            renderLoading(submit, `+`, false);
            disableButton(submit);
            formAddCard.reset();
            popup.close(event);
        }
    });
}

function changeUserAvatar(event) {
    event.preventDefault();
    const [link, submit] = formAvatar.elements;
    const { avatar } = getUserInfo();
    renderLoading(submit, `Сохранить`, true);
    api.setUserAvatar(link.value, {
        do: (user) => {
            avatar.setAttribute(`style`, `background-image: url(${user.avatar})`);
            formAvatar.reset();
            popup.close(event);
        },
        after: () => {
            renderLoading(submit, `Сохранить`, false);
            disableButton(submit);
        }
    });
}

formAddCard.addEventListener(`submit`, createNewCard);
formAddCard.addEventListener(`input`, function (event) {
    const [name, link, submit] = event.currentTarget.elements;
    showErrorMessage(event);
    isValidText(name) && isValidLink(link) ? enableButton(submit) : disableButton(submit);
});

formUser.addEventListener(`submit`, editUser);
formUser.addEventListener(`input`, function (event) {
    const [name, about, submit] = event.currentTarget.elements;
    showErrorMessage(event);
    isValidText(name) && isValidText(about) ? enableButton(submit) : disableButton(submit);
});

formAvatar.addEventListener(`submit`, changeUserAvatar);
formAvatar.addEventListener(`input`, function (event) {
    const [link, submit] = event.currentTarget.elements;
    showErrorMessage(event);
    isValidLink(link) ? enableButton(submit) : disableButton(submit);
});

export { formAddCard, formAvatar, formUser };