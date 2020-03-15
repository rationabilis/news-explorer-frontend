/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
export default class SavedNewsArray {
  constructor(getArticles, deleteArticle, {
    cardPrototype, savedNewsArray, card, month,
  }, showError) {
    this.showError = showError;
    this.card = card;
    this.getArticles = getArticles;
    this._stats = {};
    this.savedNewsArray = savedNewsArray;
    this.month = month;
    this.deleteArticle = deleteArticle;
    this.cardPrototype = document.querySelector(cardPrototype).content;
    this._articlesHeader = document.querySelector(this.savedNewsArray.articlesHeader);
    this._savedNewsContainer = document.querySelector(this.savedNewsArray.savedNewsContainer);
    this._savedNumber = document.querySelector(this.savedNewsArray.savedNumber);
    this._savedNewsContainer.addEventListener('click', (event) => this.articlesHandler(event));
    this.render();
  }

  articlesHandler(event) {
    const iconClass = this.card.icon.node.slice(1, this.card.icon.node.length);
    if (event.target.className.includes(iconClass)) {
      event.preventDefault();
      this.deleteArticle(event.target.getAttribute('savedID'))
        .then(() => {
          delete this._stats[event.target.getAttribute('savedID')];
          this._savedNewsContainer.removeChild(event.target.closest(this.card.node));
          this.keywordsStats();
        })
        .catch((err) => {
          this.showError.show(err.message);
        });
    }
  }

  createCard(data) {
    const container = this.cardPrototype.cloneNode(true);
    container.querySelector(this.card.text).textContent = data.text;
    container.querySelector(this.card.src).textContent = data.source;
    container.querySelector(this.card.keyword).textContent = data.keyword;
    container.querySelector(this.card.node).href = data.link;
    container.querySelector(this.card.img).style.backgroundImage = `url(${data.image})`;
    container.querySelector(this.card.date).textContent = `${data.date.getDate()} ${this.month[data.date.getMonth()]} ${data.date.getFullYear()}`;
    container.querySelector(this.card.title).textContent = data.title;
    container.querySelector(this.card.icon.node).setAttribute('savedID', data._id);
    return container;
  }

  render() {
    if (!this.saved) return;
    this.getArticles()
      .then((res) => {
        const articlesArray = res.data;
        articlesArray.forEach((item) => {
          this._stats[item._id] = item.keyword;
          // eslint-disable-next-line no-param-reassign
          item.date = new Date(Date.parse(item.date));
          this._savedNewsContainer.appendChild(this.createCard(item));
        });
        this.keywordsStats();
      })
      .catch((err) => this.showError.show(err.message));
  }

  userName() {
    return localStorage.getItem('user');
  }

  saved() {
    return Boolean(this.userName());
  }

  keywordsNumber() {
    const keywords = {};
    const popular = { words: [], key: '', max: 0 };
    Array.from(Object.keys(this._stats)).forEach((item) => {
      if (!(this._stats[item] in keywords)) {
        keywords[this._stats[item]] = 1;
      } else {
        keywords[this._stats[item]] += 1;
      }
    });
    const keywordsTotal = Array.from(Object.keys(keywords)).length;
    const keywordsStep = keywordsTotal >= 3 ? 3 : keywordsTotal;
    for (let i = 0; i < keywordsStep; i += 1) {
      Array.from(Object.keys(keywords)).forEach((item) => {
        if (popular.max < keywords[item]) {
          popular.max = keywords[item];
          popular.key = item;
        }
      });
      delete keywords[popular.key];
      popular.words.push(popular.key);
      popular.max = 0;
      popular.key = '';
    }

    return {
      popular: popular.words,
      keywordsTotal,
    };
  }

  keywordsStats() {
    this._savedNumber.textContent = `${this.userName()}, у Вас ${Array.from(Object.keys(this._stats)).length} сохраненных статей`;
    const keywords = this.keywordsNumber();

    document.querySelector(this.savedNewsArray.words.first).textContent = keywords.keywordsTotal >= 1 ? keywords.popular.shift() : '';
    let tagLine = '';
    if (keywords.keywordsTotal === 3) {
      tagLine = `, ${keywords.popular.shift()}, ${keywords.popular.shift()}`;
    } else {
      tagLine = keywords.keywordsTotal <= 1 ? '' : `, ${keywords.popular.shift()}`;
    }
    document.querySelector(this.savedNewsArray.words.second).textContent = tagLine;
    document.querySelector(this.savedNewsArray.words.rest).style.display = keywords.keywordsTotal > 3 ? 'auto' : 'none';
    document.querySelector(this.savedNewsArray.words.more).textContent = keywords.keywordsTotal - 2;
  }
}
