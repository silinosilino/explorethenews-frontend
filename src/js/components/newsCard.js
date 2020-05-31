export default class NewsCard {
  constructor(cardData, userStatus, mainApi, intro) {
    this.keyword = cardData.keyword.charAt(0).toUpperCase() + cardData.keyword.slice(1);
    this.title = cardData.title;
    this.text = cardData.description;
    this.date = NewsCard.convertDate(cardData.publishedAt, cardData);
    this.source = cardData.source.name;
    this.link = cardData.url;
    this.image = cardData.urlToImage;
    this.owner = cardData.owner;
    this.userStatus = userStatus;
    this.mainApi = mainApi;
    this.cardId = cardData._id;
    this.intro = intro;
  }

  create() {
    this.card = document.createElement('div');
    this.card.insertAdjacentHTML('afterbegin', `
      <div class="search-result__image-container">
        <img class="search-results__news-photo" alt="Новостная фотография">
        <button class="search-results__mark-button">
          <svg class="search-results__icon search-results__icon_type_flag">
            <path class="search-results__flag-pic"></path>
          </svg>
          <span class="tooltip tooltip_type_help tooltip_disabled">Войдите, чтобы сохранять статьи</span>
        </button>
      </div>
      <div class="search-results__text-container">
        <span id="error-response" class="error-message"></span>
        <p class="search-results__date"></p>
        <h4 class="search-results__title"></h4>
        <p class="search-results__text"></p>
      </div>
      <p class="search-results__source"></p>`);

    this.card.classList.add('search-results__news-card');
    const cardDate = this.card.querySelector('.search-results__date');
    cardDate.textContent = this.date;
    const cardTitle = this.card.querySelector('.search-results__title');
    cardTitle.textContent = this.title;
    const cardText = this.card.querySelector('.search-results__text');
    cardText.textContent = this.text;
    const cardSource = this.card.querySelector('.search-results__source');
    cardSource.textContent = this.source;
    const cardImage = this.card.querySelector('.search-results__news-photo');
    cardImage.src = this.image;
    cardImage.onerror = () => {
      cardImage.src = require('../../images/avatar/1.jpg').default;
    };
    this.helpTooltip = this.card.querySelector('.tooltip_type_help');
    this.responseErrorElement = this.card.querySelector('#error-response');
  }

  static convertDate(date, cardData) {
    if (!date) { return cardData.date; }
    const dateArr = date.toString().substr(0, 10).split('-');
    const year = dateArr[0];
    const day = dateArr[2];
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const month = months[Number(dateArr[1]) - 1];
    const newDate = `${day} ${month}, ${year}`;
    return newDate;
  }

  renderIcon() {
    this.markButton = this.card.querySelector('.search-results__mark-button');
    this.markButtonFlag = this.markButton.querySelector('.search-results__flag-pic');
    this.markButtonFlag.classList.remove('search-results__flag-pic_type_loggedin');
    if (this.userStatus.getStatus()) {
      this.markButtonFlag.classList.add('search-results__flag-pic_type_loggedin');
      this.setEventListeners();
    }
  }

  renderSaved() {
    this.card.insertAdjacentHTML('afterbegin', `
    <span class="tooltip tooltip_type_keyword"></span>`);
    const searchIcon = this.card.querySelector('.search-results__icon');
    searchIcon.classList.add('search-results__icon_type_trash');
    searchIcon.classList.remove('search-results__icon_type_flag');
    const flagPic = this.card.querySelector('.search-results__flag-pic');
    flagPic.classList.add('search-results__trash-pic');
    flagPic.classList.remove('search-results__flag-pic');
    const keywordTooltip = this.card.querySelector('.tooltip_type_keyword');
    keywordTooltip.textContent = this.keyword;
    const helpTooltip = this.card.querySelector('.tooltip_type_help');
    helpTooltip.textContent = 'Убрать из сохраненных';
  }

  save() {
    this.mainApi.createArticle(this.keyword, this.title, this.text, this.date,
      this.source, this.link, this.image)
      .then((res) => {
        this.markButtonFlag.classList.add('search-results__flag-pic_type_saved');
        this.articleId = res.data._id;
        this.setRemoveEventListeners();
      })
      .catch((err) => {
        this.responseErrorElement.textContent = `${err.message}`;
        throw new Error(`Ошибка сохранения карточки: ${err}`);
      });
  }

  remove(articleId) {
    this.mainApi.deleteArticle(articleId)
      .then((res) => {
        if (res) {
          this.markButtonFlag.classList.remove('search-results__flag-pic_type_saved');
        }
      })
      .catch((err) => {
        this.responseErrorElement.textContent = `${err.message}`;
        throw new Error(`Ошибка удаления карточки: ${err}`);
      });
  }

  removeSavedCard() {
    this.mainApi.deleteArticle(this.cardId)
      .then((res) => {
        if (res) {
          this.card.parentNode.removeChild(this.card);
          this.intro.update();
        }
      })
      .catch((err) => {
        this.responseErrorElement.textContent = `${err.message}`;
        throw new Error(`Ошибка удаления карточки: ${err}`);
      });
  }

  setEventListeners() {
    this.markButton.addEventListener('click', this.save.bind(this));
  }

  setCardEventListener() {
    this.card.addEventListener('click', (event) => {
      if (!event.target === this.markButton) {
        window.open(this.link, '_blank');
      }
    });
    this.markButton.addEventListener('mouseover', () => {
      if (!this.userStatus.getStatus()) {
        this.helpTooltip.classList.remove('tooltip_disabled');
      }
    });
    this.markButton.addEventListener('mouseout', () => {
      if (!this.userStatus.getStatus()) {
        this.helpTooltip.classList.add('tooltip_disabled');
      }
    });
  }

  setRemoveEventListeners() {
    const markButtonSaved = this.markButton.querySelector('.search-results__flag-pic_type_saved');
    markButtonSaved.addEventListener('click', () => {
      this.remove(this.articleId);
    });
  }

  setSavedArticlesEventListeners() {
    const markButtonDelete = this.card.querySelector('.search-results__icon_type_trash');
    markButtonDelete.addEventListener('click', () => {
      this.removeSavedCard();
    });
  }
}
