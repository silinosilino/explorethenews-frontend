export default class Form {
  constructor(form) {
    this.form = form;
    this.button = this.form.querySelector('.button_type_popup');
  }

  static validateInputElement(element) {
    const errorElement = document.querySelector(`#error-${element.name}`);
    let isValid = false;
    if (element.name === 'email') {
      isValid = element.value.match(/^\w+(\.\w+)*@(\w+\.)+[a-zA-Z]{2,6}/);
      if (!isValid) {
        errorElement.textContent = 'Неправильный формат email';
      } else {
        errorElement.textContent = '';
      }
    } else if (element.value.length < 1) {
      errorElement.textContent = 'Это обязательное поле';
    } else if (element.value.length === 1 || element.value.length > 30) {
      errorElement.textContent = 'Должно быть от 2 до 30 символов';
    } else if (element.value.length > 1 && element.value.length < 30) {
      errorElement.textContent = '';
      isValid = true;
    }
    return isValid;
  }

  validateForm() {
    let isValid = true;
    Array.from(this.form.elements).forEach((elem) => {
      if ((elem.type === 'text' || elem.type === 'email') && !Form.validateInputElement(elem)) {
        isValid = false;
      }
    });
    if (!isValid) {
      this.button.setAttribute('disabled', 'true');
      this.button.classList.remove('button_type_popup_is-active');
    } else {
      this.button.removeAttribute('disabled');
      this.button.classList.add('button_type_popup_is-active');
    }
  }

  setEventListeners() {
    this.form.addEventListener('input', this.validateForm.bind(this));
  }
}
