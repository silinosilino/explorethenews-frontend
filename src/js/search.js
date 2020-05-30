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
    this.cardList.clear();
    const searchResults = document.querySelector('.search-results');
    searchResults.classList.add('search-results_disabled');
    Search.renderLoader(true);
    const keyword = this.form.elements.search.value;
    // const keyword = inputVal.charAt(0).toUpperCase() + inputVal.slice(1);
    const newsFinderPromise = this.newsApi.getNews(keyword);
    console.log(keyword);
    newsFinderPromise.then((res) => {
      // this.checkValidity(this.newsList);
      const newsList = Array.from(res.articles).filter((cardData) => !cardData.description.match(/(^http)|(----------)/));
      if (newsList.length < 1) {
        Search.renderNothingFound(true);
        Search.renderLoader(false);
      } else {
        this.cardList.render(newsList, keyword);
        Search.renderLoader(false);
        searchResults.classList.remove('search-results_disabled');
        console.log(this.newsList);
      }
    })
      .catch((err) => {
        throw new Error(`Ошибка выдачи: ${err}`);
      });
  }

  setEventListener() {
    console.log('this.form', this.form);
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

  static renderNothingFound(isNothingFound) {
    const nothingFound = document.querySelector('.nothing-found');
    if (isNothingFound) {
      nothingFound.classList.remove('nothing-found_disabled');
    } else {
      nothingFound.classList.add('nothing-found_disabled');
    }
  }
}


//   checkValidity() {
//     return this.newsList.filter((cardData) => !cardData.description.match(/^http/));
//   }
// }
