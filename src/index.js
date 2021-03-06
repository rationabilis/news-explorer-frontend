/* eslint-disable no-new */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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

import constants from './js/constants/constants';
import common from './js/components/common';
import NewsRender from './js/components/news-render';

const commonMain = common();

commonMain.init();

const newsRender = new NewsRender(
  commonMain.newsApi.getNews.bind(commonMain.newsApi),
  commonMain.mainApi.createArticle.bind(commonMain.mainApi),
  commonMain.mainApi.removeArticle.bind(commonMain.mainApi),
  commonMain.showError,
  constants,
);
