export default class MobileMenu {
  constructor(domElement) {
    this.domElement = domElement;
  }

  open() {
    this.domElement.classList.remove('invisible');
  }

  close() {
    this.domElement.classList.add('invisible');
  }
}
