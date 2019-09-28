  import "./pages/index.css";
  import {UserConfig} from './scripts/config';
  import {ServerApi} from './scripts/api';
  import {renderError} from './scripts/tools';
  import {getUserInfo} from './scripts/user';
  import {CardList} from './scripts/cards';
  import {popupManager} from './scripts/popup_manager';
  import {formAddCard, formAvatar, formUser} from './scripts/forms';

  const api = new ServerApi(UserConfig);
  const {name, about, avatar} = getUserInfo();

  api.getUserInfo()
    .then(user => {
      name.textContent = user.name;
      about.textContent = user.about;
      avatar.setAttribute(`style`, `background-image: url(${user.avatar})`);
    })
    .catch(renderError);
  api.getInitialCards()
    .then(initialCards => {
      const cardList = new CardList(document.querySelector(`.places-list`), initialCards);
      cardList.render();
    })
    .catch(renderError);