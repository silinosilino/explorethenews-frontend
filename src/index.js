import Popup from './js/popup';
import Form from './js/form';
// import PopupSignup from './scripts/popupSignup'
import './vendor/normalize.css';
import './style.css';

const createValidator = (...args) => new Form(...args);

const signupButton = document.querySelector('.logo');
console.log(signupButton);
const popupSignup = new Popup(signupButton);
popupSignup.setContent();
popupSignup.configureInputPopup(createValidator);
popupSignup.setEventListeners();
