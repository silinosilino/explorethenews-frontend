import Popup from './js/popup';
import Form from './js/form';
import Header from './js/header';
import MainApi from './js/mainApi';
// import UserInfo from './js/userInfo'

import './vendor/normalize.css';
import './style.css';

const mainApi = new MainApi('http:api.explorethenews.tk',
  {
    'Content-Type': 'application/json',
  });

// const userInfo = new UserInfo(userInfoData, mainApi);
// userInfoData.getUserInfo();
const header = new Header(false);
const createValidator = (...args) => new Form(...args);

const signupButton = document.querySelector('.logo');
const popupSignup = new Popup(signupButton, mainApi, header);
popupSignup.setContent();
popupSignup.configureInputPopup(createValidator);
popupSignup.setEventListeners();
