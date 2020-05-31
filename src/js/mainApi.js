export default class MainApi {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }


  signup(name, email, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this.headers,
      // mode: 'no-cors',
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 409) {
            return Promise.reject(new Error('Ошибка: такой пользователь уже существует'));
          }
          return Promise.reject(new Error(`Ошибка: ${res.status}, ${res.statusText}`));
        }
        return res.json();
      });
  }

  signin(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            return Promise.reject(new Error('Ошибка: неправильный логин или пароль'));
          }
          return Promise.reject(new Error(`Ошибка: ${res.status}, ${res.statusText}`));
        }
        return res.json();
      });
  }

  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('explorethenews')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(new Error(`Ошибка: ${res.status}, ${res.statusText}`));
        }
        return res.json();
      });
  }

  createArticle(keyword, title, text, date, source, link, image) {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('explorethenews')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
        return res.json();
      });
  }

  deleteArticle(articleId) {
    return fetch(`${this.baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('explorethenews')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
        return res.json();
      });
  }

  getArticles() {
    return fetch(`${this.baseUrl}/articles`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('explorethenews')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
        return res.json();
      });
  }
}
