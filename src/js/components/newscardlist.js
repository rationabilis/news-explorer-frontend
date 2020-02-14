
/* NewsCardList. Класс списка карточек новостей. Конструктор принимает массив карточек,
которые должны быть в списке при первой отрисовке. Методы:
renderResults принимает массив экземпляров карточек и отрисовывает их;
renderLoader отвечает за отрисовку лоудера;
renderError принимает объект ошибки и показывает ошибку в интерфейсе;
showMore отвечает за функциональность кнопки «Показать ещё»;
addCard принимает экземпляр карточки и добавляет её в список. */

export default class NewsCardList {
  constructor(getNews) {
    this.getNews = getNews;
    this.newsArray = [];
    /*     this.cardPrototype = document.querySelector('card-template').content; */
    /*     this.card = this.create(); */
    /*     this.imageOrDelete = this.imageOrDelete.bind(this);
    this.card.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.card.querySelector('.place-card__image').addEventListener('click', this.imageOrDelete);
  */ }

  search() {
    /*     event.preventDefault();
    const key = this._searchInput.value.replace(/^\s+/, '');
    if (key.length === 0) {
      this.showError.show('Пустой запрос!');
      return;
    }
    this._serverError.classList.add(this.cardsArray.serverError.hide);
    this._resultsSection.classList.add(this.cardsArray.resultsSection.hide);
    this._notFound.classList.add(this.cardsArray.notFound.hide);
    this._preloader.classList.remove(this.cardsArray.preloader.hide);
    this._showMore.classList.remove(this.cardsArray.showMore.hide);
    if (this._news.length !== 0) {
      this._clearResults();
    }
    this._lockSearch(); */
    this.getNews('МГУ')
      .then((data) => {
        console.log('3', data);
        /*         'статьи', this.newsArray */
        /*         this._news = data; */
        /*         this._preloader.classList.add(this.cardsArray.preloader.hide);
        if (data.length === 0) {
          this._notFound.classList.remove(this.cardsArray.notFound.hide);
        } else {
          this._unlockSearch();
          this._renderCards();
          this._resultsSection.classList.remove(this.cardsArray.resultsSection.hide);
        } */
        console.log('статьи');
      })
      .catch((err) => {
        /*         this._notFound.classList.add(this.cardsArray.notFound.hide);
        this._preloader.classList.add(this.cardsArray.notFound.hide);
        this._serverError.classList.remove(this.cardsArray.serverError.hide);
        this._unlockSearch(); */
/*         this.showError.show(err.message); */
      });
  }

  imageOrDelete(evt) {
    /* Попап изображения */
    if (evt.target.classList.contains('place-card__image')) { this.popupCall(); }

    /* Удаляет карточку кликом по кнопке корзина */
    if (evt.target.classList.contains('place-card__delete-icon')) { this.remove(); }
  }

  renderResults(card) {
    this.card = card;
    const newsCard = this.cardTemplate.cloneNode(true);
    newsCard.querySelector(this.card.text).textContent = this.data.text;
    newsCard.querySelector(this.card.src).textContent = this.data.source;
    newsCard.querySelector(this.card.keyword).textContent = this.data.keyword;
/*     newsCard.querySelector(this.card.icon.node).setAttribute('UID', this.data._id); */
    newsCard.querySelector(this.card.node).href = this.data.link;
    newsCard.querySelector(this.card.img).style.backgroundImage = `url(${this.data.image})`;
    newsCard.querySelector(this.card.date).textContent = `${this.data.date.getDate()} ${this.month[this.data.date.getMonth()]} ${this.data.date.getFullYear()}`;
    newsCard.querySelector(this.card.title).textContent = this.data.title;
    return newsCard;
  }

  remove() {
    this.card.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
    this.card.querySelector('.place-card__image').removeEventListener('click', this.imageOrDelete);
    this.card.parentNode.removeChild(this.card);
  }


/*   renderLoader() {}

  renderError() {}

  showMore() {}

  addCard() {} */
}
