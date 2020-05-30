// import Popup from '../js/popup';
// import Form from '../js/form';
import Header from '../js/header';
import MainApi from '../js/mainApi';
// import NewsApi from '../js/newsApi';
// import Search from '../js/search';
import NewsCard from '../js/newsCard';
import NewsCardList from '../js/newsCardList';
import Intro from '../js/intro';
import UserStatus from '../js/userStatus';

import '../vendor/normalize.css';
import './articles.css';

const token = localStorage.getItem('explorethenews');
const mainApi = new MainApi('http://localhost:3000',
  {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });
const intro = new Intro();
const signupButton = document.querySelector('.menue__item_type_feachered');

const getUserPromiss = mainApi.getUserData();
getUserPromiss.then((res) => {
  signupButton.textContent = res.data.name;
  intro.setName(res.data.name);
  signupButton.insertAdjacentHTML('beforeend', `
    <svg class="menue__exit-pic">
      <path class="menue__exit-pic-path menue__exit-pic-path_theme_dark"></path>
    </svg>
  `);
}).catch((err) => {
  throw new Error(`Ошибка: ${err}`);
});

const createCard = (...args) => new NewsCard(...args);
const cardList = new NewsCardList(document.querySelector('.search-results__news-grid'), createCard, true, mainApi);
const getArticlesPromiss = mainApi.getArticles();
getArticlesPromiss.then((res) => {
  console.log('saved articles', res);
  intro.setLength(res.data.length);
  intro.setTitle();
  console.log('keywords arr', res.data);
  intro.setText(res.data);
  console.log(res.data.length);
  cardList.renderSaved(res.data);
}).catch((err) => {
  throw new Error(`Ошибка: ${err}`);
});
