const header = document.querySelector('.header');
const header__menu = document.querySelector('.header__menu');
const userButton = document.querySelector('.edit-button');
const userNameHeader = document.querySelector('.user-info__name');
const aboutUserParagraph = document.querySelector('.user-info__job');

/* Параметры запроса новостей */
const days = 7; // За последние 7 дней
const apiKey = '4fd67e008f0240d980dfe1d6ff26a56e';
const lang = 'ru';

module.exports = {
  days,
  apiKey,
  lang,
};
