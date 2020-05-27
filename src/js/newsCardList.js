export default class NewsCardList {
  constructor(container, createCard, userStatus) {
    this.container = container;
    this.createCard = createCard;
    this.userStatus = userStatus;
    this.showMoreButton = this.container.parentElement.querySelector('.button_type_showmore');
    // this.openImageCallback = openImageCallback;
    // this.api = api;
  }

  clear() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  render(arr, start = 0) {
    this.arr = arr;
    this.start = start;
    const showArr = this.arr.slice(this.start, this.start + 3);
    if (this.start + 3 >= this.arr.length) {
      console.log(this.start, this.arr.length);
      this.showMoreButton.classList.add('button_type_disabled');
    }
    showArr.forEach((cardData) => {
      this.addCard(cardData);
      // if (addDeleteIcon) {
      //   card.placeCard.querySelector('.place-card__delete-icon').style.display = 'block';
      // }
    });
  }

  addCard(cardData) {
    const card = this.createCard(cardData, this.userStatus);
    card.create();
    card.renderIcon();
    // card.setEventListeners();
    this.container.appendChild(card.card);
    return card;
  }

  setEventListener() {
    this.showMoreButton.addEventListener('click', () => {
      this.render(this.arr, this.start + 3);
    });
  }
}
