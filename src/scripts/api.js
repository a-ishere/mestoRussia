export class ServerApi {
    constructor(options) {
      this.baseUrl = options.baseUrl;
      this.headers = options.headers;
    }
    getResponseJson(res) {
      if (res.ok) return res.json();
      return Promise.reject(`${res.statusText}: ${res.status}`);
    }
    getUserInfo() {
      return fetch(`${this.baseUrl}/users/me`, {headers: this.headers})
        .then(this.getResponseJson);
    }
    getInitialCards() {
      return fetch(`${this.baseUrl}/cards`, {headers: this.headers})
        .then(this.getResponseJson);
    }
    setCard(name, link) {
      return fetch(`${this.baseUrl}/cards`, {
        headers: this.headers,
        method: `POST`,
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
        .then(this.getResponseJson);
    }
    setUserInfo(name, about) {
      return fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers,
        method: `PATCH`,
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
        .then(this.getResponseJson);
    }
    setUserAvatar(link) {
      return fetch(`${this.baseUrl}/users/me/avatar`, {
        headers: this.headers,
        method: `PATCH`,
        body: JSON.stringify({
          avatar: link
        })
      })
        .then(this.getResponseJson);
    }
    likeCard(id) {
      return fetch(`${this.baseUrl}/cards/like/${id}`, {
        headers: this.headers,
        method: `PUT`
      })
        .then(this.getResponseJson);
    }
    deleteLikeCard(id) {
      return fetch(`${this.baseUrl}/cards/like/${id}`, {
        headers: this.headers,
        method: `DELETE`
      })
        .then(this.getResponseJson);
    }
    deleteCard(id) {
      return fetch(`${this.baseUrl}/cards/${id}`, {
        headers: this.headers,
        method: `DELETE`
      })
        .then(this.getResponseJson);
    }
  }