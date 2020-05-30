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
            <span class="popup__input-title"><a class="link link_type_popup" href="">Выполнить вход</a></span>
        </form>
     `);
  }

  setContent(event) {
    console.log('Starting setConten, event.target', event.target);
    // if (this.element.classList.contains('signup')) {
    if (event.target.classList.contains('signup')) {
      console.log('currently in signup');
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
            <button type="submit" class="button button_type_popup">Зарегистрироваться</button>
            <span class="popup__input-title popup__input-title_type_centered">или <a class="link link_type_popup signin" href="">Войти</a></span>
        </form>
    `);
    }
    // if (this.element.classList.contains('signin')) {
    if (event.target.classList.contains('signin')) {
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
            <button type="submit" class="button button_type_popup">Войти</button>
            <span class="popup__input-title popup__input-title_type_centered">или <a class="link link_type_popup signup">Зарегистрироваться</a></span>
        </form>
    `);
      this.form = this.popup.querySelector('.popup__form');
    }
    this.setPopupEventListeners();
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
    console.log("starting open");
    this.popup.classList.add('popup_is-opened');
    console.log('popup after opening', this.popup);
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

  configureInputPopup() {
    console.log('configureInputPopup: starting');
    this.element.addEventListener('click', (event) => {
      if (event.currentTarget.classList.contains('signout')) {
        console.log('clicked on signout');
        this.header.render('isNotLoggedIn');
        this.userStatus.isLoggedIn = false;
        localStorage.setItem('explorethenews', 0);
        this.element.classList.remove('signout');
        return;
      }
      console.log('configureInputPopup: before open');
      this.open();
      this.setContent(event);
      this.form = this.popup.querySelector('.popup__form');
      this.createValidator(this.form).setEventListeners();
      this.setFormEventListeners();
      // const popupLink = this.popup.querySelector('.link_type_popup');
      // console.log("configureInputPopup: popupLink:", popupLink);
      // popupLink.addEventListener('click', () => {
      //   this.open();
      //   this.setContent();
      //   this.form = this.popup.querySelector('.popup__form');
      //   this.createValidator(this.form).setEventListeners();
      //   this.setFormEventListeners();
      // });
    });
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
          // this.clearContent();
          this.setContentSuccess();
          this.element.classList.add('signin');
          this.element.classList.remove('signup');
          this.element.textContent = 'Войти';
          // this.clearContent();
          // this.setContent();

          // this.userInfoData.setUserInfo(res.name, res.email, res.password);
          // this.close();
        })

        .catch((err) => {
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
          throw new Error(`Ошибка: ${err}`);
        });
    }
  }

  setPopupEventListeners() {
    const extraButton = document.querySelector('.link_type_popup');
    console.log('setPopupEventListeners: extraButton:', extraButton);
    extraButton.addEventListener('click', (event) => {
      console.log('extraButton: click');
      // this.configureInputPopup.bind(this);
      // this.configureInputPopup();
      // this.open();
      // console.log('open happened');
      // this.clearContent();
      console.log('popup should have been opened', this.popup);
      this.setContent(event);
      this.form = this.popup.querySelector('.popup__form');
      this.createValidator(this.form).setEventListeners();
      this.setFormEventListeners();
    });
  }

  //   else if (event.currentTarget.name === 'signout') {
  //     console.log('clicked on signout');
  //     this.header.render('isNotLoggedIn');
  //     this.userStatus.isLoggedIn = false;
  //     localStorage.setItem('explorethenews', 0);
  //     localStorage.removeItem('explorethenews');
  //   }
}
