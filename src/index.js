import Popup from './js/popup';
import Form from './js/form';
import Header from './js/header';
import MainApi from './js/mainApi';
import NewsApi from './js/newsApi';
import Search from './js/search';
// import UserInfo from './js/userInfo'

import './vendor/normalize.css';
import './style.css';

const mainApi = new MainApi('http://localhost:3000',
  {
    // Authorization: 'No Auth',
    'Content-Type': 'application/json',
  });


const newsApi = new NewsApi();
const search = new Search(newsApi);
search.setEventListener();

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
const header = new Header(false);
const createValidator = (...args) => new Form(...args);

// const signupButton = document.querySelector('.signup');
const signupButton = document.querySelector('.menue__item_type_feachered');
const popupSignup = new Popup(signupButton, mainApi, header);
// popupSignup.setContent();
popupSignup.configureInputPopup(createValidator);
// console.log(popupSignup.form);
popupSignup.setEventListeners();
// popupSignup.setFormEventListeners();
// const signinButton = document.querySelector('.signin');
// const popupSignin = new Popup(signupButton, mainApi, header);
// popupSignin.setContent();
// popupSignup.configureInputPopup(createValidator);
// popupSignin.setEventListeners();
