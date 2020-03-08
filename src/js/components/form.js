/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
export default class Form {
  constructor(domElement, goTo, handler, getUser, showError) {
    this.domElement = domElement;
    this.headerMenu = document.querySelector('.header__menu');
    this.userName = document.querySelector('#userName');
    this.closeButton = domElement.querySelector('.popup__close');
    this.closeButton.addEventListener('click', () => { this.close(); });
    this.form = domElement.querySelector('.popup__form');
    this._pathMarker = goTo;
    this.goTo = document.querySelector(goTo);
    this.nextStep = domElement.querySelector('.popup__under-button');
    this.nextStep.addEventListener('click', () => { this.openNext(); });
    this.serverHandler = handler;
    this.getUser = getUser;
    this.showError = showError;
    this.submitButton = '.popup__button';
    this._inputs = [];

    Array.from(this.form.elements)

      .forEach((item) => {
        if (item.nodeName == 'BUTTON') {
          this.submitButton = item;
        }
        if (item.nodeName == 'INPUT') {
          this._inputs.push(item);
          item.addEventListener('input', () => this.inputHandler());
        }
      });

    this.form.addEventListener('submit', (event) => this.submitForm(event));
  }

  disableSubmitButton() {
    this.submitButton.setAttribute('disabled', true);
  }

  enableSubmitButton() {
    this.submitButton.removeAttribute('disabled', true);
  }

  disableInputs() {
    this._inputs.forEach((item) => item.setAttribute('disabled', true));
  }

  enableInputs() {
    this._inputs.forEach((item) => item.removeAttribute('disabled', true));
  }

  inputHandler() {
    this.form.querySelector('.signup-form-error').classList.add('invisible');
    let validator = true;
    this._inputs.forEach((item) => {
      if (!this.isValid(item)) { validator = false; }
    });
    if (validator) {
      this.enableSubmitButton();
    } else {
      this.disableSubmitButton();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  isValid(elementToCheck) {
    const errorElement = document.querySelector(`#error-${elementToCheck.id}`);
    if (!elementToCheck.validity.valid) {
      errorElement.classList.remove('invisible');
      return false;
    }
    errorElement.classList.add('invisible');
    return true;
  }

  submitForm(event) {
    const userToSend = {};
    event.preventDefault();
    this.disableSubmitButton();
    this.disableInputs();
    this._inputs.forEach((item) => {
      userToSend[item.name === 'user-name' ? 'name' : item.name] = item.value;
    });
    this.serverHandler(userToSend)
      .then(() => {
        if (this._pathMarker === '#signup-popup') {
          this.close();
          this.enableSubmitButton();
          this.enableInputs();
          this.getUser()
            .then((res) => {
              localStorage && localStorage.setItem('user', res);
              this.headerMenu.classList.add('header__menu_logged-in');
              this.userName.textContent = `${userData.user} ->`;
            })
            .catch((err) => this.showError.show(err.message));
        }
        if (this._pathMarker === '#signin-popup') {
          this.goTo = document.querySelector('#successed-reg');
          this.openNext();
          this.goTo = document.querySelector(this._pathMarker);
          this.enableSubmitButton();
          this.enableInputs();
        }
      })
      .catch((err) => {
        if (err.message === '400' || err.message === '401') {
          this.form.querySelector(`#${this.form.name}-fatal`).classList.remove('invisible');
        } else {
          this.showError.show(err.message);
        }
        this.enableSubmitButton();
        this.enableInputs();
      });
  }

  open() {
    this.domElement.classList.remove('invisible');
    /*     document.querySelector('#scroll').classList.add('body-noscroll'); */
  }

  close() {
    /*     document.querySelector('#scroll').classList.remove('body-noscroll'); */
    this.domElement.classList.add('invisible');
  }

  openNext() {
    this.domElement.classList.add('invisible');
    this.goTo.classList.remove('invisible');
  }
}
