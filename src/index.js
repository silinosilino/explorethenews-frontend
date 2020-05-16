import Popup from './js/popup';
import Form from './js/form';
import './vendor/normalize.css';
import './style.css';

const createValidator = (...args) => new Form(...args);

const signupButton = document.querySelector('.logo');
const popupSignup = new Popup(signupButton);
popupSignup.setContent();
popupSignup.configureInputPopup(createValidator);
popupSignup.setEventListeners();
