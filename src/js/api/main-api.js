/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

export default class MainApi {
  constructor(mainUrl) {
    this.mainUrl = mainUrl;
  }

  signup(userData) {
    return fetch(`${this.mainUrl}/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(userData),
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  signin(userData) {
    return fetch(`${this.mainUrl}/signin`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(userData),
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка входа ${res.status}`);
        return res.json();
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  getUserData() {
    return fetch(`${this.mainUrl}/users/me`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        mode: 'cors',
        credentials: 'include',
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Не удалось получить данные пользователя ${res.status}`);
        return res.json();
      })
      .then((userInfo) => userInfo)
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  getArticles() {
    return fetch(`${this.mainUrl}/articles`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Не удалось получить данные статей ${res.status}`);
        return res.json();
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  createArticle(articleData) {
    return fetch(`${this.mainUrl}/articles`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(articleData),
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Не удалось сохранить статью ${res.status}`);
        return res.json();
      })
      .then((res) => res._id)
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  removeArticle(id) {
    return fetch(`${this.mainUrl}/articles/${id}`,
      {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Не удалось удалить статью ${res.status}`);
        return res.json();
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }


  logout() {
    return fetch(`${this.mainUrl}/logout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка выхода: ${res.status}`);
        return res.json();
      })
      .then(() => {
        localStorage && localStorage.clear();
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
