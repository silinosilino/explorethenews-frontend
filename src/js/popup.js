export default class Popup {
  constructor(element, mainAapi, header) {
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
  }

  setContentSuccess() {
    this.popupContent.insertAdjacentHTML('afterbegin', `
        <h3 class="popup__title">Gользователь успешно зарегистрирован</h3>
        <form class="popup__form" name="signup">
            <span class="popup__input-title"><a class="link link_type_popup" href="">Выполнить вход</a></span>
        </form>
     `);
  }

  setContent() {
    if (this.element.classList.contains('logo')) {
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
            <button type="submit" class="button button_type_popup">Зарегистрироваться</button>
            <span class="popup__input-title popup__input-title_type_centered">или <a class="link link_type_popup" href="">Войти</a></span>
        </form>
    `);
    }
  }


  setEventListeners() {
    this.popupCloser.addEventListener('click', this.close.bind(this));
    this.popup.addEventListener('click', (event) => {
      if (!event.target.closest('.popup__content')) {
        this.close();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
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

  configureInputPopup(createValidator) {
    this.form = this.popup.querySelector('.popup__form');
    this.element.addEventListener('click', this.open.bind(this));
    createValidator(this.form).setEventListeners();
  }

  setFormEventListeners() {
    this.form.addEventListener('submit', this.updateHandler.bind(this));
  }

  updateHandler(event) {
    event.preventDefault();
    if (event.currentTarget.name === 'signup') {
      const formSignUp = event.currentTarget;
      const signupPromise = this.mainApi.signup(
        formSignUp.elements.username.value,
        formSignUp.elements.email.value,
        formSignUp.elements.password.value,
      );
      signupPromise.then((res) => {
        if (!res.ok) {
          return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
        return res.json();
      })
        .then(() => {
          this.setContentSuccess();

          // this.userInfoData.setUserInfo(res.name, res.email, res.password);
          // this.close();
        })

        .catch((err) => {
          throw new Error(`Ошибка: ${err}`);
        });
    } else {
      const formSignIn = event.currentTarget;
      const signinPromise = this.mainApi.signin(
        formSignIn.elements.email.value,
        formSignIn.elements.password.value,
      );
      signinPromise.then((res) => {
        if (!res.ok) {
          return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
        return res.json();
      })
        .then((res) => {
          this.header.render(res.name, true);
          this.close();
        })

        .catch((err) => {
          throw new Error(`Ошибка: ${err}`);
        });
    }
  }
}
