/* Popup. Класс попапа. Вот его методы:
setContent — вставляет в попап содержимое, например, форму входа или сообщение об успешной
регистрации;
clearContent — очищает содержимое попапа;
open — открывает попап;
close — закрывает попап. */

export default class Popup {
  constructor(popupContent, nextStep) {

    const popupContainer = document.querySelector('.popup');
    popupContainer.innerHTML = popupContent;
    console.log(popupContainer);
    this.nextStep = nextStep;

    const popupSwitchButton = document.querySelector('.popup__under-button');
    console.log(popupSwitchButton);
/*     popupSwitchButton.addEventListener('click', function () {
      this.close(); */
/*       nextStep.open(); */
   /*  }); */


    this.nextStep = nextStep;
    const popupCloseButton = popupContainer.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', (event) => this.close());

    this.popupButton = popupContainer.querySelector('.popup__button');
  }


  clearContent() {
    this.popupContainer.innerHTML = '';
  }

  open() {
    console.log('open');
    this.popupContainer.classList.remove('.invisible');
  }

  close() {
    this.popupContainer.addAttribute('invisible', true);
    this.clearContent();
  }

  enablePopupButton() {
    this.popupButton.removeAttribute('disabled', true);
  }

  disablePopupButton() {
    this.popupButton.setAttribute('disabled', true);
  }
}
