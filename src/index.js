import Popup from './js/popup';
import Form from './js/form';
import Header from './js/header';
import MainApi from './js/mainApi';
// import UserInfo from './js/userInfo'

import './vendor/normalize.css';
import './style.css';

const mainApi = new MainApi('http://localhost:3000',
  {
    Authorization: 'No Auth',
    'Content-Type': 'application/json',
  });

// const userInfo = new UserInfo(userInfoData, mainApi);
// userInfoData.getUserInfo();
const header = new Header(false);
const createValidator = (...args) => new Form(...args);

// const signupButton = document.querySelector('.signup');
const signupButton = document.querySelector('.menue__item_type_feachered');
const popupSignup = new Popup(signupButton, mainApi, header);
popupSignup.setContent();
popupSignup.configureInputPopup(createValidator);
// console.log(popupSignup.form);
popupSignup.setEventListeners();
popupSignup.setFormEventListeners();
// const signinButton = document.querySelector('.signin');
// const popupSignin = new Popup(signupButton, mainApi, header);
// popupSignin.setContent();
// popupSignup.configureInputPopup(createValidator);
// popupSignin.setEventListeners();
