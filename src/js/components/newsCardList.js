export default class NewsCardList {
  constructor(container, createCard, userStatus, mainApi, intro) {
    this.container = container;
    this.createCard = createCard;
    this.userStatus = userStatus;
    this.showMoreButton = this.container.parentNode.querySelector('.button_type_showmore');
    this.mainApi = mainApi;
    this.intro = intro;
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
    cardData.description = savedData.text;
    cardData.url = savedData.link;
    cardData.urlToImage = savedData.image;
    const card = this.createCard(cardData, this.userStatus, this.mainApi, this.intro);
    card.create();
    card.renderSaved();
    card.setSavedArticlesEventListeners();
    this.container.appendChild(card.card);
  }

  addCard(cardData) {
    const card = this.createCard(cardData, this.userStatus, this.mainApi, this.intro);
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
