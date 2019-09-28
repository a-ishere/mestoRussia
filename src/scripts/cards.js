  import {UserConfig} from '../scripts/config';
  import {ServerApi} from '../scripts/api';
  import {renderError} from '../scripts/tools';

  const api = new ServerApi(UserConfig);
  const userInfo = api.getUserInfo();

  class Card {
    constructor(name, link) {
      this.card = this.create(name, link);
      this.card.querySelector(`.place-card__like-icon`).addEventListener(`mouseover`, this.showLikedBy);
      this.card.querySelector(`.place-card__like-icon`).addEventListener(`mouseout`, this.hideLikedBy);
      this.card.querySelector(`.place-card__like-icon`).addEventListener(`click`, this.like);
      this.card.querySelector(`.place-card__delete-icon`).addEventListener(`click`, this.delete);
    }
    create(name, link) {
      const cardTemp = document.querySelector(`#cardTemp`).content;
      const card = cardTemp.querySelector(`.place-card`);
      const linkImage = card.querySelector(`.place-card__image`);
      const nameCard = card.querySelector(`.place-card__name`);
      nameCard.textContent = name;
      linkImage.setAttribute(`style`, `background-image: url(${link})`);
      return card.cloneNode(true);
    }
    like(event) {
      const card = event.target.closest(`.place-card`);
      const likecol = card.querySelector(`.place-card__like-col`);
      if (event.target.classList.contains(`place-card__like-icon_liked`)) {
        api.deleteLikeCard(card.getAttribute(`id`))
          .then(data => {
            event.target.classList.remove(`place-card__like-icon_liked`);
            likecol.textContent = data.likes.length;
          })
          .catch(renderError);
      } else {
        api.likeCard(card.getAttribute(`id`))
          .then(data => {
            event.target.classList.add(`place-card__like-icon_liked`);
            likecol.textContent = data.likes.length;
          })
          .catch(renderError);
      }
    }
    delete(event) {
      if (window.confirm("Вы действительно хотите удалить эту карточку?")) { 
        const card = event.target.closest(`.place-card`);
        api.deleteCard(card.getAttribute(`id`))
          .then(() => card.parentElement.removeChild(card))
          .catch(renderError);
      }
    }
    showLikedBy(event) {
      const likedBy = event.target.nextElementSibling;
      if (likedBy.textContent) likedBy.classList.remove(`place-card__like-list_block`);
      likedBy.style.top = `-${likedBy.offsetHeight + 12}px`;
    }
    hideLikedBy(event) {
      const likedBy = event.target.nextElementSibling;
      likedBy.classList.add(`place-card__like-list_block`);
    }
  }

  export class CardList {
    constructor(container, startList) {
      this.container = container;
      this.startList = startList;
    }
    addCard(name, link, id, authorId, likes) {
      const { card } = new Card(name, link);
      userInfo.then(data => {
        const likeMe = likes.some(like => like._id === data._id);
        const deleteIcon = card.querySelector(`.place-card__delete-icon`);
        const likeIcon = card.querySelector(`.place-card__like-icon`);
        const likeCol = card.querySelector(`.place-card__like-col`);
        const likedBy = card.querySelector(`.place-card__like-list`);
        if (likeMe) {
          likeIcon.classList.add(`place-card__like-icon_liked`);
        }
        if (authorId === data._id) {
          deleteIcon.classList.add(`place-card__delete-icon_show`);
        }
        likeCol.textContent = likes.length;
        if (likes.length > 0) {
          likedBy.textContent = likes.reduce((prev, item, index) => {
            return index == 0 ? `${item.name}` : `${prev}, ${item.name}`;
          }, '');
        }
        card.setAttribute(`id`, id);
      })
      .catch(renderError);
      this.container.appendChild(card);
    }
    render() {
      this.startList.forEach(item => 
        this.addCard(item.name, item.link, item._id, item.owner._id, item.likes));
    }
  } 