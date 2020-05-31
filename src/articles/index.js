import MainApi from '../js/api/mainApi';
import NewsCard from '../js/components/newsCard';
import NewsCardList from '../js/components/newsCardList';
import Intro from '../js/components/intro';

import '../vendor/normalize.css';
import './articles.css';

const token = localStorage.getItem('explorethenews');
const mainApi = new MainApi('http://localhost:3000',
  {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });
const intro = new Intro(mainApi);
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
const cardList = new NewsCardList(document.querySelector('.search-results__news-grid'), createCard, true, mainApi, intro);
const getArticlesPromiss = mainApi.getArticles();
getArticlesPromiss.then((res) => {
  intro.setLength(res.data.length);
  intro.setTitle();
  intro.setText(res.data);
  cardList.renderSaved(res.data);
}).catch((err) => {
  throw new Error(`Ошибка: ${err}`);
});
