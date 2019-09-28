  import {formUserRender} from '../scripts/user';
  import {Popup} from '../scripts/popup';

  export const popupManager = document.querySelector(`.root`);
  const popup = new Popup(popupManager.querySelector(`.popup`));

  popupManager.addEventListener(`click`, function (event) {
    const [addCardLayer, editUserLayer, imageLayer, changeAvatarLayer] = popupManager.querySelector(`.popup`).children;
    if (event.target.classList.contains(`user-info__button`)) {
      popup.open(addCardLayer);
    } else if (event.target.classList.contains(`user-info__button-edit`)) {
      formUserRender();
      popup.open(editUserLayer);
    } else if (event.target.classList.contains(`place-card__image`)) {
      const image = event.currentTarget.querySelector(`.popup__image`);
      const correctImageLink = event.target.style.backgroundImage.replace(/(url\(")(.+)("\))/, `\$2`);
      image.setAttribute(`src`, correctImageLink);
      popup.open(imageLayer);
    } else if (event.target.classList.contains(`user-info__photo`)) {
      popup.open(changeAvatarLayer);
    } 
  });