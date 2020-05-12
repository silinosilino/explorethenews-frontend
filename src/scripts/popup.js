export default class Popup{
  constructor(element){
      this.element = element;
      this.popup = document.createElement('div');
      this.popup.classList.add('popup');
      const root = document.querySelector('.root');
      root.appendChild(this.popup);
      this.popupCloser = document.createElement('img');
      this.popupCloser.src = "./images/close.svg";
      this.popupCloser.classList.add('popup__close');
      this.popupContent = document.createElement('div');
      this.popupContent.classList.add('popup__content')
      this.popup.appendChild(this.popupContent);
      this.popupContent.appendChild(this.popupCloser);
      this.popupContent.insertAdjacentHTML('afterbegin', `
      <h3 class="popup__title">Редактировать профиль</h3>
      <form class="popup__form" name="profile">
          <input type="text" name="username" class="popup__input popup__input_type_name" placeholder="Имя">
          <span id="error-username" class="error-message"></span>
          <input type="text" name="userjob" class="popup__input popup__input_type_name" placeholder="О себе">
          <span id="error-userjob" class="error-message"></span>
          <button type="submit" class="button popup__button">Сохранить</button>
      </form>
  `);
  }

  setEventListeners(){
      this.popupCloser.addEventListener('click', this.close.bind(this));
      this.popup.addEventListener('click', function() {
          if (!event.target.closest('.popup__content')) {
              this.close();
              }
          }.bind(this));
      document.addEventListener('keydown', function() {
          if (event.key === 'Escape') {
              this.close();
              }
          }.bind(this));
  }

  open(event){
      this.popup.classList.add('popup_is-opened');
  }

  close(event){
      this.popup.classList.remove('popup_is-opened');
  }

  // configureInputPopup(createValidator){
    configureInputPopup(){

      this.form = this.popup.querySelector('.popup__form');
      this.element.addEventListener('click', this.open.bind(this));
      // createValidator(this.form).setEventListeners();
      this.setFormEventListeners();
  }

//   renderLoading(isLoading){
//       const popupButton = this.popup.querySelector(".popup__button");
//       if (isLoading){
//         popupButton.textContent = "Загрузка...";
//       } else {
//           popupButton.textContent = "Сохранить";
//       }
//   }
 }