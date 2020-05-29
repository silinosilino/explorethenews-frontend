export default class NewsCard {
  constructor(cardData, userStatus, mainApi) {
    this.keyword = cardData.keyword;
    this.title = cardData.title;
    this.text = cardData.description;
    this.date = NewsCard.convertDate(cardData.publishedAt);
    this.source = cardData.source.name;
    this.link = cardData.url;
    this.image = cardData.urlToImage;
    this.owner = cardData.owner;
    this.userStatus = userStatus;
    this.mainApi = mainApi;
    // this.cardId = cardData._id;
    // this.openImageCallback = openImageCallback;
    // this.openImage = this.openImage.bind(this);
    // this.markLiked = this.markLiked.bind(this);
    // this.updateLikes = this.updateLikes.bind(this);
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
          <span class="tooltip tooltip_type_help">Войдите, чтобы сохранять статьи</span>
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
    // if (!cardImage.complete) {
    //   cardImage.src = 'https://l-files.livejournal.net/og_image/339052/12762?v=1589990459';
    // }
  }

  static convertDate(date) {
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
    console.log(this.userStatus);
    if (this.userStatus.getStatus()) {
      this.markButtonFlag.classList.add('search-results__flag-pic_type_loggedin');
      this.setEventListeners();
      console.log('in render', this.mainApi);
    }
  }
  // updateLikes() {
  //   const initialCardsPromise = this.api.getInitialCards();
  //   initialCardsPromise.then((result) => {
  //     const cardItem = result.cardsArray.find((item) => this.cardId === item._id);
  //     return cardItem;
  //   })
  //     .then((item) => {
  //       this.cardLikeCounter.textContent = item.likes.length;
  //     });
  // }

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

  // if (event.target.classList.contains('search-results__flag-pic')) {
  //   event.target.classList.add('search-results__flag-pic_saved');
  //   this.mainApi.unlikeCard(this.cardId);
  // this.updateLikes();
  // } else {
  //   event.target.classList.add('place-card__like-icon_liked');
  //   this.api.likeCard(this.cardId);
  //   this.updateLikes();
  // }
  //   }
  // }


  setEventListeners() {
    // constButton = this.markButton.querySelector('.search-results__icon_type_flag');
    this.markButton.addEventListener('click', this.save.bind(this));
    //   } else if (event.currentTarget.firstChild.classList.containes('search-results__flag-pic_type_saved')) {
    //     this.remove.bind(this);
    //   }
    // });
  }

  setRemoveEventListeners() {
    const markButtonSaved = this.markButton.querySelector('.search-results__flag-pic_type_saved');
    markButtonSaved.addEventListener('click', () => {
      console.log('click on saved card');
      console.log(this);
      this.remove(this.articleId);
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


  // checkLikes() {
  //   if (this.like.some((like) => like._id === this.api.userId)) {
  //     this.placeCard.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
  //   } else {
  //     this.placeCard.querySelector('.place-card__like-icon').classList.remove('place-card__like-icon_liked');
  //   }
  // }

  // setEventListeners() {
  //   this.placeCard.querySelector('.place-card__like-icon').addEventListener('click', this.markLiked);
  //   this.placeCard.querySelector('.place-card__delete-icon').addEventListener('click', (event) => {
  //     if (window.confirm('Вы действительно хотите удалить эту карточку?')) {
  //       const deletePromise = this.api.deleteCard(this.cardId);
  //       deletePromise.then((res) => {
  //         if (!res.ok) {
  //           return Promise.reject(`Ошибка: ${res.status}`);
  //         }
  //         this.remove();
  //       })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   });
  //   this.placeCard.querySelector('.place-card__image').addEventListener('click', this.openImage);
  // }
}
