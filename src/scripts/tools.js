  function enableButton(button) {
    button.classList.add(`popup__button_valid`);
    button.classList.remove(`popup__button_invalid`);
    button.removeAttribute(`disabled`);
  }

  function disableButton(button) {
    button.classList.add(`popup__button_invalid`);
    button.classList.remove(`popup__button_valid`);
    button.setAttribute(`disabled`, true);
  }

  function renderLoading(button, basicValue, isLoading) {
    if (isLoading) {
      button.textContent = `Загрузка...`;
      button.classList.add(`popup__button_basic`);
    } else {
      button.textContent = basicValue;
      button.classList.remove(`popup__button_basic`);
    }
  }

  function renderError(err) {
    const errorBlock = document.querySelector(`.error-block`);
    errorBlock.textContent = err;
    errorBlock.classList.remove(`error-block_hide`);
    setTimeout(() => errorBlock.classList.add(`error-block_hide`), 3000);
  }

  export {enableButton, disableButton, renderLoading, renderError};