export default class Header {
  constructor() {
    const header = document.querySelector('.header');
    this.signupButton = header.querySelector('.menue__item_type_feachered');
    this.articles = header.querySelector('.menue__item_type_articles');
    this.isLoggedIn = false;
  }

  render(status, name) {
    if (status === 'isLoggedIn') {
      this.isLoggedIn = true;
      this.articles.classList.remove('menue__item_type_disabled');
      this.signupButton.textContent = name;
      this.signupButton.insertAdjacentHTML('beforeend', `
      <svg class="menue__exit-pic">
        <path class="menue__exit-pic-path menue__exit-pic-path_theme_light"></path>
      </svg>
    `);
    } else if (status === 'isNotLoggedIn') {
      this.articles.classList.add('menue__item_type_disabled');
      this.signupButton.textContent = 'Войти';
      this.signupButton.classList.add('signin');
    } else if (status === 'isNotRegistered') {
      this.articles.classList.add('menue__item_type_disabled');
      this.signupButton.textContent = 'Авторизоваться';
      this.signupButton.classList.add('signup');
    }
  }
}
