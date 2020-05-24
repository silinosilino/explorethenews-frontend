export default class NewsApi {
  constructor() {
    this.headers = { 'Content-Type': 'application/json' };
  }


  // const req = new Request(url);
  getNews(keyword) {
    const today = new Date();
    const date = `${today.getFullYear()}-0${today.getMonth() + 1}-${today.getDate() - 7}`;
    // const url = 'http://newsapi.org/v2/everything?'
    const url = 'https://praktikum.tk/news/v2/everything?'
          + `q=${keyword}&`
          + `from=${date}&`
          + 'sortBy=popularity&'
          + 'apiKey=bb6d7c46c4b7438fadf2c65adef2fbb2';
    return fetch(url, {
      headers: this.headers,
      // mode: 'no-cors',
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
        return res.json();
      });
  }
}
