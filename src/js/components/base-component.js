export default class BaseComponent {
  constructor(domElement, eventsForElement = {}) {
    this.domElement = domElement;
    this.eventsForElement = eventsForElement;
    this._setHandlers();
  }

  _setHandlers() {
    Array.from(Object.keys(this.eventsForElement)).forEach((event) => {
      this.domElement.addEventListener(event, this.eventsForElement[event]);
    });
  }
}
