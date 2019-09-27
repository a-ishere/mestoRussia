(function () {

  const api = new ServerApi(UserConfig);
  const {renderError} = Tools;
  const {getUserInfo} = User;
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

})();