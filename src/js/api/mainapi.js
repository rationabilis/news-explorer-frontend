/* MainApi Отвечает за взаимодействие с написанным вами Node.js API.
Конструктор этого класса принимает опции, необходимые для инициализации работы с API.
Вот список обязательных методов:
signup регистрирует нового пользователя;
signin аутентифицирует пользователя на основе почты и пароля;
getUserData возвращает информацию о пользователе;
getArticles забирает все статьи;
createArticle создаёт статью;
removeArticle удаляет статью.
*/

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
      .then((res) => res.json())
      .then((res) => {
        console.log(res.json());
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
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  getUserData() {
    return fetch(`${this.mainUrl}/users/me`,
      { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error(`Не удалось получить данные пользователя ${res.status}`);
        return res.json();
      })
      .then((userInfo) => userInfo.user)
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  getArticles() {
    return fetch(`${this.mainUrl}/articles`,
      {
        method: 'GET',
        headers: {
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
}
