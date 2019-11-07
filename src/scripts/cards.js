import ServerApi from './api';
import { renderError } from '../scripts/tools';

const userInfo = new ServerApi().getUserInfo();

export class CardList {
    constructor(container) {
        this._container = container;
    }
    addCard({ card }, id, authorId, likes) {
        userInfo.then(data => {
            const likeMe = likes.some(like => like._id === data._id);
            const deleteIcon = card.querySelector(`.place-card__delete-icon`);
            const likeIcon = card.querySelector(`.place-card__like-icon`);
            const likeCol = card.querySelector(`.place-card__like-col`);
            const likedBy = card.querySelector(`.place-card__like-list`);
            if (likeMe) likeIcon.classList.add(`place-card__like-icon_liked`);
            if (authorId === data._id) deleteIcon.classList.add(`place-card__delete-icon_show`);
            likeCol.textContent = likes.length;
            if (likes.length > 0)
                likedBy.textContent = likes.reduce((prev, item, index) =>
                    index == 0 ? `${item.name}` : `${prev}, ${item.name}`, '');
            card.setAttribute(`id`, id);
        })
            .catch(renderError);
        this._container.appendChild(card);
    }
} 