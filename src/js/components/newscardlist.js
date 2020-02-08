
/* NewsCardList. Класс списка карточек новостей. Конструктор принимает массив карточек,
которые должны быть в списке при первой отрисовке. Методы:
renderResults принимает массив экземпляров карточек и отрисовывает их;
renderLoader отвечает за отрисовку лоудера;
renderError принимает объект ошибки и показывает ошибку в интерфейсе;
showMore отвечает за функциональность кнопки «Показать ещё»;
addCard принимает экземпляр карточки и добавляет её в список. */

export default class NewsCardList {
  constructor(cardList) {
    this.cardList = cardList;
    this.card = this.create();
    this.imageOrDelete = this.imageOrDelete.bind(this);
    this.card.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.card.querySelector('.place-card__image').addEventListener('click', this.imageOrDelete);
  }

  imageOrDelete(evt) {
    /* Попап изображения */
    if (evt.target.classList.contains('place-card__image')) { this.popupCall(); }

    /* Удаляет карточку кликом по кнопке корзина */
    if (evt.target.classList.contains('place-card__delete-icon')) { this.remove(); }
  }

  renderResults() {
    const initialCard = document.createElement('div');
    initialCard.innerHTML = `<div class="place-card">
        <div class="place-card__image">
          <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name"></h3>
          <button class="place-card__like-icon"></button>
        </div>
      </div>`;

    const initialCardImage = initialCard.querySelector('.place-card__image');
    const initialCardName = initialCard.querySelector('.place-card__name');
    initialCardImage.setAttribute('style', `background-image: url(${this.placeLink})`);
    initialCardName.textContent = this.placeName;

    this.initialCard = initialCard.firstChild;
    return this.initialCard;
  }

  remove() {
    this.card.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
    this.card.querySelector('.place-card__image').removeEventListener('click', this.imageOrDelete);
    this.card.parentNode.removeChild(this.card);
  }

  /*   like(evt) {
    evt.target.classList.toggle('place-card__like-icon_liked');
  } */

/*   renderLoader() {}

  renderError() {}

  showMore() {}

  addCard() {} */
}
