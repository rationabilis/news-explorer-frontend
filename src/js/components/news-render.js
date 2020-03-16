/* eslint-disable max-len */
/* eslint-disable no-undef */
export default class NewsRender {
  constructor(
    getNews, saveArticle, deleteArticle, showError,
    {
      cardPrototype, results, card, month,
    },
  ) {
    this._showMore = document.querySelector(results.showMore.node);
    this._preloader = document.querySelector(results.preloader.node);
    this._notFound = document.querySelector(results.notFound.node);
    this._resultsSection = document.querySelector(results.resultsSection.node);
    this.cardPrototype = document.querySelector(cardPrototype).content;
    this._resultsContainer = document.querySelector(results.resultsContainer);
    this._submit = document.querySelector(results.newsForm);
    this._searchInput = document.querySelector(results.searchInput);
    this._searchSubmit = document.querySelector(results.searchSubmit);
    this._serverError = document.querySelector(results.serverError.node);
    this.savedNewsArray = results;
    this.savedNewsArray.month = month;
    this.getNews = getNews;
    this.saveArticle = saveArticle;
    this.deleteArticle = deleteArticle;
    this.showError = showError;
    this.card = card;
    this._news = [];
    this._position = 0;

    this._resultsContainer.addEventListener('click', (event) => this.cardHandler(event));
    this._submit.addEventListener('submit', (event) => this.search(event));
    this._showMore.addEventListener('click', () => this._renderCards());
    document.addEventListener('updateView', () => this.savedIconHandler());
  }

  // eslint-disable-next-line class-methods-use-this
  _isLogged() {
    return Boolean(localStorage.getItem('user'));
  }

  createCard(data) {
    const searchResult = this.cardPrototype.cloneNode(true);
    searchResult.querySelector(this.card.node).href = data.link;
    searchResult.querySelector(this.card.img).src = data.image;
    searchResult.querySelector(this.card.date).textContent = `${data.date.getDate()} ${this.savedNewsArray.month[data.date.getMonth()]} ${data.date.getFullYear()}`;
    searchResult.querySelector(this.card.title).textContent = data.title;
    searchResult.querySelector(this.card.text).textContent = data.text;
    searchResult.querySelector(this.card.src).textContent = data.source;
    searchResult.querySelector(this.card.icon.node).setAttribute('savedID', data._id);
    if (this._isLogged()) {
      searchResult.querySelector(this.card.icon.node).classList.add(this.card.icon.saved);
      searchResult.querySelector(this.card.icon.node).setAttribute('cardID', this._position);
    }

    return searchResult;
  }

  cardHandler(event) {
    const iconClass = this.card.icon.node.slice(1, this.card.icon.node.length);
    if (event.target.className.includes(iconClass)) {
      event.preventDefault();
      if (this._isLogged()) {
        if (event.target.className.includes(this.card.icon.marked)) {
          this.deleteArticle(event.target.getAttribute('savedID'))
            .then(() => {
              event.target.classList.remove(this.card.icon.marked);
              event.target.removeAttribute('savedID');
            })
            .catch((err) => {
              this.showError.show(err.message);
            });
          event.target.classList.remove(this.card.icon.marked);
        } else {
          this.saveArticle(this._news[event.target.getAttribute('cardID')])
            .then((res) => {
              event.target.classList.add(this.card.icon.marked);
              event.target.setAttribute('savedID', res);
            })
            .catch((err) => {
              this.showError.show(err.message);
            });
        }
      }
    }
  }

  search(event) {
    event.preventDefault();
    const key = this._searchInput.value.replace(/^\s+/, '');
    if (key.length === 0) {
      this.showError.show('Пустой запрос!');
      return;
    }
    this._resultsSection.classList.add(this.savedNewsArray.resultsSection.hide);
    this._notFound.classList.add(this.savedNewsArray.notFound.hide);
    this._preloader.classList.remove(this.savedNewsArray.preloader.hide);
    this._showMore.classList.remove(this.savedNewsArray.showMore.hide);
    if (this._news.length !== 0) {
      this._clearResults();
    }
    this._lockSearch();
    this.getNews(key)
      .then((data) => {
        this._news = data;
        this._preloader.classList.add(this.savedNewsArray.preloader.hide);
        if (data.length === 0) {
          this._notFound.classList.remove(this.savedNewsArray.notFound.hide);
          this._unlockSearch();
        } else {
          this._unlockSearch();
          this._renderCards();
          this._resultsSection.classList.remove(this.savedNewsArray.resultsSection.hide);
        }
      })
      .catch((err) => {
        this._notFound.classList.add(this.savedNewsArray.notFound.hide);
        this._preloader.classList.add(this.savedNewsArray.notFound.hide);
        this._serverError.classList.remove(this.savedNewsArray.serverError.hide);
        this._unlockSearch();
        this.showError.show(err.message);
      });
  }

  _clearResults() {
    this._position = 0;
    this._news.splice(0, this._news.length);
    while (this._resultsContainer.firstChild) {
      this._resultsContainer.removeChild(this._resultsContainer.firstChild);
    }
  }

  _renderCards() {
    const searchResult = document.createDocumentFragment();
    const numberOfLeftCards = this._news.length - this._position;
    const numberOfNewsToAdd = numberOfLeftCards < this.savedNewsArray.showStep ? numberOfLeftCards : this.savedNewsArray.showStep;
    if (this._news.length - this._position <= this.savedNewsArray.showStep) { this._showMore.classList.add(this.savedNewsArray.showMore.hide); }
    for (let i = 0; i < numberOfNewsToAdd; i += 1) {
      searchResult.appendChild(this.createCard(this._news[this._position]));
      this._position += 1;
    }
    this._resultsContainer.appendChild(searchResult);
  }

  savedIconHandler() {
    Array.from(this._resultsContainer.querySelectorAll(this.card.node)).forEach(
      (item) => {
        if (this._isLogged()) {
          item.querySelector(this.card.icon.node).classList.add(this.card.icon.saved);
        } else {
          item.querySelector(this.card.icon.node).classList.remove(this.card.icon.saved);
          item.querySelector(this.card.icon.node).classList.remove(this.card.icon.marked);
        }
      },
    );
  }

  _lockSearch() {
    this._searchInput.setAttribute('disabled', true);
    this._searchSubmit.setAttribute('disabled', true);
  }

  _unlockSearch() {
    this._searchInput.removeAttribute('disabled', true);
    this._searchSubmit.removeAttribute('disabled', true);
  }
}
