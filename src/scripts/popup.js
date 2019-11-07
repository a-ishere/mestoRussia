export class Popup {
    constructor(popup) {
        this.popup = popup;
        this.popup.addEventListener(`click`, event => {
            if (event.target.classList.contains(`popup__close`)) this.close(event);
        });
    }

    open(currentLayer) {
        currentLayer.classList.remove(`popup__shutter`);
        this.popup.classList.add(`popup_is-opened`);
    }

    close(event) {
        const currentLayer = event.target.closest(`.popup__content`)
            || event.target.closest(`.popup__image-container`);
        currentLayer.classList.add(`popup__shutter`);
        this.popup.classList.remove(`popup_is-opened`);
    }
}