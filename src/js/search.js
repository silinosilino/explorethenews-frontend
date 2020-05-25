// import NewsCardList from "./newsCardList";

export default class Search {
  constructor(newsApi, cardList) {
    this.form = document.querySelector('.search__form');
    this.newsApi = newsApi;
    this.cardList = cardList;
  }


  findNews(event) {
    event.preventDefault();
    this.validate();
    if (!this.isValid) {
      return;
    }
    const newsFinderPromise = this.newsApi.getNews(this.form.elements.search.value);
    newsFinderPromise.then((res) => {
      console.log(res);
      const newsList = Array.from(res.articles);
      this.cardList.render(newsList);
      console.log(newsList);
    })
      .catch((err) => {
        throw new Error(`Ошибка: ${err}`);
      });
  }

  setEventListener() {
    this.form.addEventListener('submit', this.findNews.bind(this));
  }

  validate() {
    const errorElement = this.form.querySelector('#error-search');
    if (this.form.elements.search.value.length < 1) {
      errorElement.textContent = 'Нужно ввести ключевое слово';
      this.isValid = false;
    } else {
      errorElement.textContent = '';
      this.isValid = true;
    }
  }
}
