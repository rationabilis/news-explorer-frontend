import './style.css';
import './images/favicon.png';
import './images/github_logo.png';
import './images/facebook_logo.png';
import './images/not-found.png';
import './images/author_avatar_1440.png';
import './images/author_avatar_768.png';
import './images/author_avatar_320.png';
import './images/search_background.png';
import './images/search_background_768.png';
import './images/search_background_320.png';
import './images/ogonki.png';
import './images/ogni.png';
import './images/close-button.png';
import './images/taiga.png';
import './images/park.png';
import './images/parki.png';
import './images/forest.png';
import './images/ivanova.png';
import './images/fyodorova.png';
import './images/dolinin.png';
import './images/webpack.png';
import './images/delete-icon-grey.png';
import './images/html.png';
import './images/css.png';
import './images/js.png';
import './images/delete-icon-black.png';
import './images/normal-icon.png';
import './images/hover-icon.png';
import './images/marked-icon.png';
import './images/mobile_menu_button_white.png';
import './images/mobile_menu_button_black.png';


const Header = require('./js/components/header').default;
const MainApi = require('./js/api/mainapi').default;
const NewsApi = require('./js/api/newsapi').default;
const NewsCardList = require('./js/components/newscardlist').default;

const { apiKey, days, lang } = require('./js/constants/constants');

const userName = 'Alexander';
const header = new Header({ isLoggedIn: true, name: userName, color: 'white' });
console.log(apiKey, days, lang);

header.render();

const mainApi = new MainApi('https://www.api.inscientia.ru');
const newsApi = new NewsApi(apiKey, days, lang);
const newsCardList = new NewsCardList(newsApi.getNews.bind(newsApi));
newsCardList.search('Химия');

newsCardList.renderResults({
  source: 'Popmech.ru',
  title: 'Физики нашли в океане новый тип волн',
  date: 'Wed Feb 12 2020 13:53:00 GMT+0300 (Москва, стандартное время) {}',
  text: 'Сотрудники кафедры физики моря и вод суши физического факультета МГУ совместно с коллегами из Японского агентства морских и наземных исследований и технологий (JAMSTEC) и Университета Кагавы (Япония) обнаружили и детально исследовали эффект генерации гравитац…',
  image: 'https://images11.popmeh.ru/upload/img_cache/b0d/b0d4da17b309fcfa18121454ba7acd8a_ce_2240x1176x0x112_fitted_1260x700.jpg',
  link: 'https://www.popmech.ru/science/news-547824-fiziki-nashli-v-okeane-novyy-tip-voln/',
  keyword: 'МГУ',
});

// Получение новостей с сервера
/* const selectedNews = newsApi.getNews('Химия');
console.log('статьи 3', selectedNews); */

/* mainApi.signup({
  name: 'Чубакка',
  email: 'chui@somewhere.com',
  password: 'grrrrhhhh',
}); */
