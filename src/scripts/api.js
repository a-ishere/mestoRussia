import { renderError } from '../scripts/tools';
import { UserConfig } from './config';

export default class ServerApi {
    constructor() {
        this.baseUrl = UserConfig.baseUrl;
        this.headers = UserConfig.headers;
        this.renderError = renderError;
    }

    _getResponseJson(res) {
        return res.ok ? res.json() : Promise.reject(`${res.statusText}: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, { headers: this.headers })
            .then(this._getResponseJson);
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, { headers: this.headers })
            .then(this._getResponseJson);
    }

    setCard(name, link, instruction) {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
            method: `POST`,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._getResponseJson)
            .then(data => instruction.do(data))
            .catch(this.renderError)
            .finally(() => instruction.after());
    }

    setUserInfo(name, about, instruction) {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
            method: `PATCH`,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this._getResponseJson)
            .then(data => instruction.do(data))
            .catch(this.renderError)
            .finally(() => instruction.after());
    }

    setUserAvatar(link, instruction) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            headers: this.headers,
            method: `PATCH`,
            body: JSON.stringify({
                avatar: link
            })
        })
            .then(this._getResponseJson)
            .then(data => instruction.do(data))
            .catch(this.renderError)
            .finally(() => instruction.after());
    }

    likeCard(id, instruction) {
        const method = instruction.liked == true ? `DELETE` : `PUT`;
        return fetch(`${this.baseUrl}/cards/like/${id}`, {
            headers: this.headers,
            method: method
        })
            .then(this._getResponseJson)
            .then(data => instruction.do(data))
            .catch(this.renderError);
    }

    deleteCard(id, instruction) {
        return fetch(`${this.baseUrl}/cards/${id}`, {
            headers: this.headers,
            method: `DELETE`
        })
            .then(this._getResponseJson)
            .then((data) => instruction.do(data))
            .catch(this.renderError);
    }
}