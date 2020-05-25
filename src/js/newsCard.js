export default class NewsCard {
  constructor(cardData) {
    this.keyword = cardData.keyword;
    this.title = cardData.title;
    this.text = cardData.description;
    this.date = cardData.publishedAt;
    this.source = cardData.source.name;
    this.link = cardData.url;
    this.image = cardData.urlToImage;
    this.owner = cardData.owner;
    // this.api = api;
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

  // markLiked(event) {
  //   if (event.target.classList.contains('place-card__like-icon_liked')) {
  //     event.target.classList.remove('place-card__like-icon_liked');
  //     this.api.unlikeCard(this.cardId);
  //     this.updateLikes();
  //   } else {
  //     event.target.classList.add('place-card__like-icon_liked');
  //     this.api.likeCard(this.cardId);
  //     this.updateLikes();
  //   }
  // }

  // checkLikes() {
  //   if (this.like.some((like) => like._id === this.api.userId)) {
  //     this.placeCard.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
  //   } else {
  //     this.placeCard.querySelector('.place-card__like-icon').classList.remove('place-card__like-icon_liked');
  //   }
  // }

  // remove(event) {
  //   this.placeCard.parentNode.removeChild(this.placeCard);
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
