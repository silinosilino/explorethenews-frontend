export default class Search {
  constructor(newsApi, cardList) {
    this.form = document.querySelector('.search__form');
    this.newsApi = newsApi;
    this.cardList = cardList;
    this.nothingFound = document.querySelector('.nothing-found');
    this.nothingFoundTitle = this.nothingFound.querySelector('.nothing-found__title');
    this.nothingFoundText = this.nothingFound.querySelector('.nothing-found__text');
  }

  findNews(event) {
    event.preventDefault();
    this.validate();
    if (!this.isValid) {
      return;
    }
    this.cardList.clear();
    this.renderNothingFound(false);
    const searchResults = document.querySelector('.search-results');
    searchResults.classList.add('search-results_disabled');
    Search.renderLoader(true);
    const keyword = this.form.elements.search.value;
    const newsFinderPromise = this.newsApi.getNews(keyword);
    newsFinderPromise.then((res) => {
      const newsList = Array.from(res.articles).filter((cardData) => !cardData.description.match(/(^http)|(----------)/));
      if (newsList.length < 1) {
        this.renderNothingFound(true);
        Search.renderLoader(false);
      } else {
        this.cardList.render(newsList, keyword);
        Search.renderLoader(false);
        searchResults.classList.remove('search-results_disabled');
      }
    })
      .catch((err) => {
        Search.renderLoader(false);
        this.nothingFound.classList.remove('nothing-found_disabled');
        this.nothingFoundTitle.textContent = 'Во время запроса произошла ошибка';
        this.nothingFoundText.textContent = 'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
        throw new Error(`Ошибка выдачи: ${err}`);
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

  static renderLoader(isLoading) {
    const preloader = document.querySelector('.preloader');
    if (isLoading) {
      preloader.classList.remove('preloader_disabled');
    } else {
      preloader.classList.add('preloader_disabled');
    }
  }

  renderNothingFound(isNothingFound) {
    if (isNothingFound) {
      this.nothingFound.classList.remove('nothing-found_disabled');
      this.nothingFoundTitle.textContent = 'Ничего не найдено';
      this.nothingFoundText.textContent = 'К сожалению, по вашему запросу ничего не найдено.';
    } else {
      this.nothingFound.classList.add('nothing-found_disabled');
    }
  }
}
