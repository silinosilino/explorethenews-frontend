import Popup from './js/popup';
// import PopupSignup from './scripts/popupSignup'

import "./style.css";

const signupButton = document.querySelector('.logo');
console.log(signupButton);
const popupSignup = new Popup(signupButton);
popupSignup.setEventListeners();
popupSignup.configureInputPopup();
popupSignup.open();