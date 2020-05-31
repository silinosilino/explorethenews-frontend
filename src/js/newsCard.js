export default class NewsCard {
  constructor(cardData, userStatus, mainApi) {
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
    // cardImage.setAttribute('style', `background-image: url(${this.image})`);
    cardImage.onerror = function () {
      // cardImage.setAttribute('style', 'background-image: url("../images/avatar/1.jpg")');
      cardImage.src = require('../images/avatar/1.jpg').default;
    };
    this.helpTooltip = this.card.querySelector('.tooltip_type_help');
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
    // tooltip.classList.remove('tooltip_type_help');
    // this.setRemoveSavedArticlesEventListeners();
  }


  save() {
    // if (event.currentTarget.child.child.classList.containes('search-results__flag-pic_type_saved')) {
    // console.log('in save', this.mainApi);
    // console.log('event.target', event.target);
    // console.log('event.currentTarget', event.currentTarget);
    // console.log(event.currentTarget.closest('.search-results__news-card'));
    // console.log(this);
    this.mainApi.createArticle(this.keyword, this.title, this.text, this.date,
      this.source, this.link, this.image)
      .then((res) => {
        this.markButtonFlag.classList.add('search-results__flag-pic_type_saved');
        console.log(res);
        console.log(res.data._id);
        this.articleId = res.data._id;
        this.setRemoveEventListeners();
      })
      .catch((err) => {
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
        throw new Error(`Ошибка удаления карточки: ${err}`);
      });

    // this.card.parentNode.removeChild(this.card);
  }

  removeSavedCard() {
    this.mainApi.deleteArticle(this.cardId)
      .then((res) => {
        if (res) {
          this.card.parentNode.removeChild(this.card);
        }
      })
      .catch((err) => {
        throw new Error(`Ошибка удаления карточки: ${err}`);
      });
  }


  setEventListeners() {
    // constButton = this.markButton.querySelector('.search-results__icon_type_flag');
    this.markButton.addEventListener('click', this.save.bind(this));

    //   } else if (event.currentTarget.firstChild.classList.containes('search-results__flag-pic_type_saved')) {
    //     this.remove.bind(this);
    //   }
    // });
  }

  setCardEventListener() {
    this.card.addEventListener('click', (event) => {
      if (!event.target === this.markButton) {
      // console.log('click');
        window.open(this.link, '_blank');
      }
      // document.location.href = this.link;
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
  // this.card.addEventListener('hover', () => {
  //   console.log('click');
  //   // this.card.style = 'cursor: pointer';
  //   this.card.style.cursor = 'pointer';
  //   // document.location.href = this.link;
  // });


  setRemoveEventListeners() {
    const markButtonSaved = this.markButton.querySelector('.search-results__flag-pic_type_saved');
    markButtonSaved.addEventListener('click', () => {
      console.log('click on saved card');
      console.log(this);
      this.remove(this.articleId);
    });
  }

  setSavedArticlesEventListeners() {
    // this.markButton.addEventListener('click', this.removeSavedCard(this.articleId));
    const markButtonDelete = this.card.querySelector('.search-results__icon_type_trash');
    // console.log('Where am I?', markButtonDelete);
    markButtonDelete.addEventListener('click', () => {
      console.log('click on saved card');
      console.log(this);
      this.removeSavedCard();
    });
  }

  // setEventListeners() {
  //   const flagButton = this.markButton.querySelector('.search-results__icon_type_flag');
  //   flagButton.addEventListener('click', (event) => {
  //     if (event.currentTarget.classList.containes('search-results__flag-pic_type_loggedin')) {
  //       this.save.bind(this);
  //     } else if (event.currentTarget.firstChild.classList.containes('search-results__flag-pic_type_saved')) {
  //       this.remove.bind(this);
  //     }
  //   });
  // }
}
