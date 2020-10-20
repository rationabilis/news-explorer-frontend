/* eslint-disable no-undef */

export default class ShowError {
  constructor() {
    this.domElement = document.querySelector('#server-fail');
    this.errorMessage = document.querySelector('#server-fail-message');
  }

  show(message) {
    this.errorMessage.textContent = message;
    this.domElement.classList.remove('invisible');
  }

  hide() {
    this.errorMessage.textContent = '';
    this.domElement.classList.add('invisible');
  }
}
