  import {enableButton, renderLoading, renderError} from '../scripts/tools';
  import {Popup} from '../scripts/popup';
  import {UserConfig} from '../scripts/config';
  import {ServerApi} from '../scripts/api';

  const formUser = document.forms.user;
  const {name, about} = getUserInfo();
  const [nameField, aboutField, submit] = formUser.elements;
  const popup = new Popup(document.querySelector(`.popup`));
  const api = new ServerApi(UserConfig);

  function getUserInfo() {
    const name = document.querySelector(`.user-info__name`);
    const about = document.querySelector(`.user-info__job`);
    const avatar = document.querySelector(`.user-info__photo`);
    return {name, about, avatar};
  }

  function formUserRender() {
    nameField.value = name.textContent;
    aboutField.value = about.textContent;
    nameField.nextElementSibling.textContent = ``;
    aboutField.nextElementSibling.textContent = ``;
    enableButton(submit);
  }

  function editUser(event) {
    event.preventDefault();
    const formButton = formUser.querySelector(`.button`);
    renderLoading(formButton, `Сохранить`, true);
    api.setUserInfo(nameField.value, aboutField.value)
      .then(user => {
        name.textContent = user.name;
        about.textContent = user.about;
        popup.close(event); 
      })
      .catch(renderError)
      .finally(renderLoading(formButton, `Сохранить`, false));
  }

  export {editUser, getUserInfo, formUserRender};