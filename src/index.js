import Popup from './js/popup';
import Form from './js/form';
import Header from './js/header';
import MainApi from './js/mainApi';
import NewsApi from './js/newsApi';
import Search from './js/search';
import NewsCard from './js/newsCard';
import NewsCardList from './js/newsCardList';
import UserStatus from './js/userStatus';
// import UserInfo from './js/userInfo'

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

const createCard = (...args) => new NewsCard(...args);
const cardList = new NewsCardList(document.querySelector('.search-results__news-grid'), createCard, userStatus, mainApi);
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
    console.log('Login happened', userStatus);
    header.render('isLoggedIn', res.data.name);
    signupButton.classList.add('signout');
    signupButton.classList.remove('signin');
    // cardList.renderIcon();
  }).catch((err) => {
    header.render('isNotLoggedIn');
    throw new Error(`Ошибка: ${err}`);
  });
};
checkToken();


search.setEventListener();
cardList.setEventListener();

// search.convertDate('2020-05-25T08:35:00Z');
// const formSearch = document.querySelector('.search__form');
// const searchButton = formSearch.querySelector('.button_type_search');
// function newsFinder(event) {
//   event.preventDefault();
//   const newsFinderPromise = newsApi.getNews(formSearch.elements.search.value);
//   newsFinderPromise.then((res) => {
//     console.log(res);
//     const newsList = Array.from(res.articles);
//     console.log(newsList);
//   })
//     .catch((err) => {
//       throw new Error(`Ошибка: ${err}`);
//     });
// }
// searchButton.addEventListener('submit', newsFinder());
// const newsApi = new NewsApi();


// const userInfo = new UserInfo(userInfoData, mainApi);
// userInfoData.getUserInfo();
const createValidator = (...args) => new Form(...args);
// search.validate(createValidator);


// const signupButton = document.querySelector('.signup');

const popupSignup = new Popup(signupButton, mainApi, header, userStatus, cardList, createValidator);
// popupSignup.setContent();
popupSignup.configureInputPopup();
// console.log(popupSignup.form);
popupSignup.setEventListeners();
// popupSignup.setPopupEventListeners(createValidator);

// const extraButton = document.querySelector('.link_type_popup');
// const popupExtra = new Popup(extraButton, mainApi, header, userStatus, cardList);
// console.log(popupExtra);
// popupExtra.configureInputPopup(createValidator);
// popupExtra.setEventListeners();
// popupSignup.setFormEventListeners();
// const signinButton = document.querySelector('.signin');
// const popupSignin = new Popup(signupButton, mainApi, header);
// popupSignin.setContent();
// popupSignup.configureInputPopup(createValidator);
// popupSignin.setEventListeners();
// cardList.renderIcon();
