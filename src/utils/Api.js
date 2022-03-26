class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResult(res));
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResult(res));
  }

  patchEditProfile(newProfileName, newProfileAbout) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: newProfileName,
        about: newProfileAbout,
      }),
    }).then((res) => this._checkResult(res));
  }

  patchAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then((res) => this._checkResult(res));
  }

  postAddCard(cardName, cardLink) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then((res) => this._checkResult(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResult(res));
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes `, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResult(res));
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes `, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkResult(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.deleteLike(cardId) : this.putLike(cardId);
  }

  registerUser(password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email }),
    }).then((res) => this._checkResult(res));
  }
  loginUser(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email}),
    }).then((res) => this._checkResult(res));
  }
  checkJWT(JWT) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT}`,
      },
    }).then((res) => this._checkResult(res));
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-34",
  headers: {
    authorization: "0b8e8a44-387a-4c30-987b-fa48af305c4f",
    "Content-Type": "application/json",
  },
});

const apiAuth = new Api({
  baseUrl: "https://auth.nomoreparties.co",
  headers: "",
});

export { api, apiAuth };
