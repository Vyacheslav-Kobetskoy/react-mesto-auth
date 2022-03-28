class ApiAuth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
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
      body: JSON.stringify({ password, email }),
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

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const apiAuth = new ApiAuth({
  baseUrl: "https://auth.nomoreparties.co",
});

export default apiAuth;
