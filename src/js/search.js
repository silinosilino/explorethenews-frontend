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
    this.renderLoader(true);
    const newsFinderPromise = this.newsApi.getNews(this.form.elements.search.value);
    newsFinderPromise.then((res) => {
      console.log(res);
      // this.checkValidity(this.newsList);
      const newsList = Array.from(res.articles).filter((cardData) => !cardData.description.match(/(^http)|(----------)/));
      this.cardList.render(newsList);
      this.renderLoader(false);
      console.log(this.newsList);
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

  renderLoader(isLoading) {
    const preloader = document.querySelector('.preloader');
    if (isLoading) {
      preloader.classList.remove('preloader_disabled');
    } else {
      preloader.classList.add('preloader_disabled');
    }
  }
}


//   checkValidity() {
//     return this.newsList.filter((cardData) => !cardData.description.match(/^http/));
//   }
// }
