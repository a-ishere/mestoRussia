import ServerApi from './api';

const api = new ServerApi();

export class Card {
    constructor(name, link) {
        this.card = this._create(name, link);
        this.card.querySelector(`.place-card__like-icon`).addEventListener(`mouseover`, this._showLikedBy);
        this.card.querySelector(`.place-card__like-icon`).addEventListener(`mouseout`, this._hideLikedBy);
        this.card.querySelector(`.place-card__like-icon`).addEventListener(`click`, this._like);
        this.card.querySelector(`.place-card__delete-icon`).addEventListener(`click`, this._delete);
    }

    _create(name, link) {
        const cardTemp = document.querySelector(`#cardTemp`).content;
        const card = cardTemp.querySelector(`.place-card`);
        const linkImage = card.querySelector(`.place-card__image`);
        const nameCard = card.querySelector(`.place-card__name`);
        nameCard.textContent = name;
        linkImage.setAttribute(`style`, `background-image: url(${link})`);
        return card.cloneNode(true);
    }

    _like(event) {
        const card = event.target.closest(`.place-card`);
        const likecol = card.querySelector(`.place-card__like-col`);
        api.likeCard(card.getAttribute(`id`), {
            liked: event.target.classList.contains(`place-card__like-icon_liked`),
            do: (data) => likecol.textContent = data.likes.length
        });
        event.target.classList.toggle(`place-card__like-icon_liked`);
    }

    _delete(event) {
        if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
            const card = event.target.closest(`.place-card`);
            api.deleteCard(card.getAttribute(`id`), { do: () => card.parentElement.removeChild(card) });
        }
    }

    _showLikedBy(event) {
        const likedBy = event.target.nextElementSibling;
        if (likedBy.textContent) likedBy.classList.remove(`place-card__like-list_block`);
        likedBy.style.top = `-${likedBy.offsetHeight + 12}px`;
    }

    _hideLikedBy(event) {
        const likedBy = event.target.nextElementSibling;
        likedBy.classList.add(`place-card__like-list_block`);
    }
}