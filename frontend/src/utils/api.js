class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  setToken(token) {
    this._headers['Authorization'] = `Bearer ${token}`;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then((res) => this._processResponse(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then((res) => this._processResponse(res));
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((res) => this._processResponse(res));
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((res) => this._processResponse(res));
  }

  createCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => this._processResponse(res));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => this._processResponse(res));
  }

  likeCard(id, isLike) {
    const method = isLike ? 'PUT' : 'DELETE';
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: method,
      headers: this._headers,
    })
      .then((res) => this._processResponse(res));
  }

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email, password
      })
    })
      .then((res) => this._processResponse(res));
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      mode: 'cors',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email, password
      })
    })
      .then((res) => {
        return this._processResponse(res)
      });
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    })
      .then((res) => this._processResponse(res));
  }

  _processResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.abanina.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
