export default class GitRender {
  constructor(getCommits, { month, swiper }) {
    this.getCommits = getCommits;
    this.swiper = swiper;
    this.month = month;
    this._cardPrototype = document.querySelector(this.swiper.template).content;
  }

  renderCommits(data) {
    const container = document.createDocumentFragment();
    data.forEach((item) => {
      container.appendChild(this._createCommit(item));
    });
    document.querySelector(this.swiper.swiperWrap).appendChild(container);
    this.swiperUpdate();
  }

  _createCommit(data) {
    const container = this._cardPrototype.cloneNode(true);
    container.querySelector(this.swiper.commitDate).textContent = `${data.date.getDate()} ${this.month[data.date.getMonth()]} ${data.date.getFullYear()}`;
    container.querySelector(this.swiper.commitImage).src = data.avatar;
    container.querySelector(this.swiper.commitName).textContent = data.name;
    container.querySelector(this.swiper.commitEmail).textContent = data.email;
    container.querySelector(this.swiper.commitText).textContent = data.message;
    return container;
  }
}
