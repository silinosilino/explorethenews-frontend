export default class Popup {
  constructor(element, mainAapi, header, userStatus, cardList, createValidator) {
    this.element = element;
    this.popup = document.createElement('div');
    this.popup.classList.add('popup');
    const root = document.querySelector('.root');
    root.appendChild(this.popup);
    this.popupCloser = document.createElement('img');
    this.popupCloser.src = require('../images/back.png').default;
    this.popupCloser.classList.add('popup__close');
    this.popupContent = document.createElement('div');
    this.popupContent.classList.add('popup__content');
    this.popup.appendChild(this.popupContent);
    this.popupContent.appendChild(this.popupCloser);
    this.mainApi = mainAapi;
    this.header = header;
    this.userStatus = userStatus;
    this.cardList = cardList;
    this.createValidator = createValidator;
    // this.signupButton = document.querySelector('.menue__item_type_feachered');
  }

  clearContent() {
    this.popupContent.innerHTML = '';
  }

  setContentSuccess() {
    this.clearContent();
    this.popupContent.insertAdjacentHTML('afterbegin', `
        <h3 class="popup__title">Пользователь успешно зарегистрирован</h3>
        <form class="popup__form" name="signup">
            <span class="popup__input-title"><a class="link_type_popup" href="">Выполнить вход</a></span>
        </form>
     `);
  }

  setContent(event) {
    if (event.target.classList.contains('signup')) {
      this.clearContent();
      this.popupContent.insertAdjacentHTML('afterbegin', `
        <h3 class="popup__title">Регистрация</h3>
        <form class="popup__form" name="signup">
            <span class="popup__input-title">Email</span>
            <input type="email" name="email" class="popup__input popup__input_type_name" placeholder="Введите почту">
            <span id="error-email" class="error-message"></span>
            <span class="popup__input-title">Пароль</span>
            <input type="text" name="password" class="popup__input popup__input_type_name" placeholder="Введите пароль">
            <span id="error-password" class="error-message"></span>
            <span class="popup__input-title">Имя</span>
            <input type="text" name="username" class="popup__input popup__input_type_name" placeholder="Введите своё имя">
            <span id="error-username" class="error-message"></span>
            <span id="error-response" class="error-message"></span>
            <button type="submit" class="button button_type_popup">Зарегистрироваться</button>
            <span class="popup__input-title popup__input-title_type_centered">или <p class="link_type_popup signin">Войти</p></span>
        </form>
    `);
    } else if (event.target.classList.contains('signin')) {
      this.clearContent();
      this.popupContent.insertAdjacentHTML('afterbegin', `
        <h3 class="popup__title">Вход</h3>
        <form class="popup__form" name="signin">
            <span class="popup__input-title">Email</span>
            <input type="email" name="email" class="popup__input popup__input_type_name" placeholder="Введите почту">
            <span id="error-email" class="error-message"></span>
            <span class="popup__input-title">Пароль</span>
            <input type="text" name="password" class="popup__input popup__input_type_name" placeholder="Введите пароль">
            <span id="error-password" class="error-message"></span>
            <span id="error-response" class="error-message"></span>
            <button type="submit" class="button button_type_popup">Войти</button>
            <span class="popup__input-title popup__input-title_type_centered">или <p class="link link_type_popup signup">Зарегистрироваться</p></span>
        </form>
    `);
    }
    this.popupContent.appendChild(this.popupCloser);
    this.setPopupEventListeners();
  }


  setEventListeners() {
    this.popupCloser.addEventListener('click', this.close.bind(this));
    this.popup.addEventListener('click', (event) => {
      if (!event.target.closest('.popup__content') && !event.target.closest('.popup__input-title')) {
        this.close();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });
    this.element.addEventListener('click', (event) => {
      if (event.currentTarget.classList.contains('signout')) {
        this.header.render('isNotLoggedIn');
        this.userStatus.isLoggedIn = false;
        localStorage.setItem('explorethenews', 0);
        this.cardList.updateIcon();
        this.element.classList.remove('signout');
        return;
      }
      this.configurePopup(event);
    });
  }

  open() {
    this.popup.classList.add('popup_is-opened');
    if (window.screen.width < 601) {
      const menueIcon = document.querySelector('.menue__icon');
      menueIcon.classList.add('menue__icon_disabled');
    }
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
    if (window.screen.width < 601) {
      const menueIcon = document.querySelector('.menue__icon');
      menueIcon.classList.remove('menue__icon_disabled');
    }
  }

  configurePopup(event) {
    this.open();
    this.setContent(event);
    this.form = this.popup.querySelector('.popup__form');
    this.responseErrorElement = this.form.querySelector('#error-response');
    this.createValidator(this.form).setEventListeners();
    this.setFormEventListeners();
  }

  setFormEventListeners() {
    this.form = this.popup.querySelector('.popup__form');
    this.form.addEventListener('submit', this.updateHandler.bind(this));
  }

  updateHandler(event) {
    event.preventDefault();
    if (event.currentTarget.name === 'signup') {
      const formSignup = event.currentTarget;
      const signupPromise = this.mainApi.signup(
        formSignup.elements.username.value,
        formSignup.elements.email.value,
        formSignup.elements.password.value,
      );
      signupPromise
        .then(() => {
          this.setContentSuccess();
          this.element.classList.add('signin');
          this.element.classList.remove('signup');
          this.header.render('isNotLoggedIn');
          // this.element.textContent = 'Войти';
        })
        .catch((err) => {
          this.responseErrorElement.textContent = `${err.message}`;
          throw new Error(`Ошибка: ${err}`);
        });
    } else if (event.currentTarget.name === 'signin') {
      const formSignin = event.currentTarget;
      const signinPromise = this.mainApi.signin(
        formSignin.elements.email.value,
        formSignin.elements.password.value,
      );
      signinPromise
        .then((res) => {
          localStorage.setItem('explorethenews', res.token);
          this.userStatus.isLoggedIn = true;
          this.cardList.updateIcon();
          this.header.render('isLoggedIn', res.name);
          this.element.classList.add('signout');
          this.element.classList.remove('signin');
          this.close();
        })
        .catch((err) => {
          this.responseErrorElement.textContent = `${err.message}`;
          throw new Error(`Ошибка: ${err}`);
        });
    }
  }

  setPopupEventListeners() {
    const extraButton = document.querySelector('.link_type_popup');
    extraButton.addEventListener('click', (event) => {
      this.configurePopup(event);
    });
  }
}
