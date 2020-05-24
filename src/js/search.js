export default class Search {
  constructor(newsApi) {
    this.form = document.querySelector('.search__form');
    this.newsApi = newsApi;
  }


  findNews(event) {
    event.preventDefault();
    const newsFinderPromise = this.newsApi.getNews(this.form.elements.search.value);
    newsFinderPromise.then((res) => {
      console.log(res);
      const newsList = Array.from(res.articles);
      console.log(newsList);
    })
      .catch((err) => {
        throw new Error(`Ошибка: ${err}`);
      });
  }

  setEventListener() {
    this.form.addEventListener('submit', this.findNews.bind(this));
  }
}
