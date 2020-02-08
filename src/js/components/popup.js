/* Popup. Класс попапа. Вот его методы:
setContent — вставляет в попап содержимое, например, форму входа или сообщение об успешной
регистрации;
clearContent — очищает содержимое попапа;
open — открывает попап;
close — закрывает попап. */

export default class Popup {
  constructor(popupContent) {
    this.popupContainer = document.querySelector('.popup');
    this.popupContainer.innerHTML = popupContent;
    this.open();

    const popupCloseButton = document.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', (event) => this.close());

    this.popupButton = document.querySelector('.popup__button');
  }


  clearContent() {
    this.popupContainer.innerHTML = '';
  }

  open() {
    this.popupContainer.removeAttribute('invisible', true);
  }

  close() {
    this.popupContainer.addAttribute('invisible', true);
    clearContent();
  }

  enablePopupButton() {
    this.popupButton.removeAttribute('disabled', true);
  }

  disablePopupButton() {
    this.popupButton.setAttribute('disabled', true);
  }
}
