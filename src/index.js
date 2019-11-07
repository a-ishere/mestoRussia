import './pages/index.css';
import ServerApi from './scripts/api';
import { renderError } from './scripts/tools';
import { getUserInfo } from './scripts/user';
import { CardList } from './scripts/cards';
import { Card } from './scripts/card';
import { popupManager } from './scripts/popup_manager';
import { formAddCard, formAvatar, formUser } from './scripts/forms';

const api = new ServerApi();
const { name, about, avatar } = getUserInfo();

api.getUserInfo()
    .then(user => {
        name.textContent = user.name;
        about.textContent = user.about;
        avatar.setAttribute(`style`, `background-image: url(${user.avatar})`);
    })
    .catch(renderError);
api.getInitialCards()
    .then(initialCards => {
        const cardList = new CardList(document.querySelector(`.places-list`));
        initialCards.forEach(item =>
            cardList.addCard(new Card(item.name, item.link), item._id, item.owner._id, item.likes));
    })
    .catch(renderError);