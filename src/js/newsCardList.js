export default class NewsCardList {
  constructor(container, createCard) {
    this.container = container;
    this.createCard = createCard;
    // this.openImageCallback = openImageCallback;
    // this.api = api;
  }

  render(arr) {
    arr.forEach((cardData) => {
      this.addCard(cardData);
      // if (addDeleteIcon) {
      //   card.placeCard.querySelector('.place-card__delete-icon').style.display = 'block';
      // }
    });
  }

  addCard(cardData) {
    const card = this.createCard(cardData);
    card.create();
    // card.setEventListeners();
    this.container.appendChild(card.card);
    return card;
  }
}
