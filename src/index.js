import Popup from './js/popup';
import Form from './js/form';
import Header from './js/header';
import MainApi from './js/mainApi';
import NewsApi from './js/newsApi';
import Search from './js/search';
import NewsCard from './js/newsCard';
import NewsCardList from './js/newsCardList';
import UserStatus from './js/userStatus';
import Intro from './js/intro';

import './vendor/normalize.css';
import './style.css';

const header = new Header();
const token = localStorage.getItem('explorethenews');
const mainApi = new MainApi('http://localhost:3000',
  {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

const userStatus = new UserStatus(false);
const signupButton = document.querySelector('.menue__item_type_feachered');
const intro = new Intro();
const createCard = (...args) => new NewsCard(...args);
const cardList = new NewsCardList(document.querySelector('.search-results__news-grid'), createCard, userStatus, mainApi, intro);
const newsApi = new NewsApi();
const search = new Search(newsApi, cardList);


const checkToken = () => {
  if (!token) {
    header.render('isNotRegistered');
    return;
  }
  const getUserPromiss = mainApi.getUserData();
  getUserPromiss.then((res) => {
    userStatus.switchStatus();
    header.render('isLoggedIn', res.data.name);
    signupButton.classList.add('signout');
    signupButton.classList.remove('signin');
  }).catch((err) => {
    header.render('isNotLoggedIn');
    throw new Error(`Ошибка: ${err}`);
  });
};
checkToken();

search.setEventListener();
cardList.setEventListener();
const createValidator = (...args) => new Form(...args);
const popup = new Popup(signupButton, mainApi, header, userStatus, cardList, createValidator);
popup.setEventListeners();
