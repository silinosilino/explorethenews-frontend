export default class NewsCardList {
  constructor(container, createCard, userStatus, mainApi) {
    this.container = container;
    this.createCard = createCard;
    this.userStatus = userStatus;
    this.showMoreButton = this.container.parentNode.querySelector('.button_type_showmore');
    this.mainApi = mainApi;
    this.cardsArray = [];
  }

  clear() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  render(arr, keyword, start = 0) {
    this.arr = arr;
    this.start = start;
    this.keyword = keyword;
    const showArr = this.arr.slice(this.start, this.start + 3);
    if (this.start + 3 >= this.arr.length) {
      this.showMoreButton.classList.add('button_type_disabled');
    }
    showArr.forEach((dataItem) => {
      const cardData = dataItem;
      cardData.keyword = this.keyword;
      this.addCard(cardData);
    });
  }

  renderSaved(arr) {
    arr.forEach((cardData) => {
      this.addSavedCard(cardData);
    });
  }

  addSavedCard(savedData) {

    const cardData = savedData;
    // cardData.keyword = savedData.keyword;
    // cardData.title = savedData.title;
    // cardData.description = savedData.text;
    // cardData.source.name = savedData.source;
    // cardData.url = savedData.link;
    // cardData.urlToImage = savedData.image;
    // cardData.owner = savedData.owner;
    // cardData.cardId = savedData._id;
    cardData.description = savedData.text;
    cardData.url = savedData.link;
    cardData.urlToImage = savedData.image;

    // cardData.date = NewsCard.convertDate(cardData.publishedAt, cardData);
    // cardData.userStatus = userStatus;
    // cardData.mainApi = mainApi;

    // cardData.text = savedData.description;
    // cardData.urlToImage = savedData.image;
    // cardData.url = savedData.link;
    const card = this.createCard(cardData, this.userStatus, this.mainApi);
    card.create();
    card.renderSaved();
    console.log(card);
    card.setSavedArticlesEventListeners();
    console.log('hgfhgfh');
    // card.renderIcon();
    this.container.appendChild(card.card);
    // this.cardsArray.push(card);
    // return card;
  }

  addCard(cardData) {
    const card = this.createCard(cardData, this.userStatus, this.mainApi);
    card.create();
    card.renderIcon();
    card.setCardEventListener();
    this.container.appendChild(card.card);
    this.cardsArray.push(card);
    return card;
  }

  updateIcon() {
    this.cardsArray.forEach((card) => {
      card.renderIcon();
    });
  }

  setEventListener() {
    this.showMoreButton.addEventListener('click', () => {
      this.render(this.arr, this.keyword, this.start + 3);
    });
  }
}
