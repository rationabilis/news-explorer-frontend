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
import Form from './js/components/form';
import ShowError from './js/components/error';
import MainApi from './js/api/main-api';
import NewsApi from './js/api/news-api';
import NewsRender from './js/components/news-render';


const headerMenu = document.querySelector('.header__menu');
const authorize = document.querySelector('#authorize');

const userName = document.querySelector('#userName');
const mainApi = new MainApi(constants.mainApiConfig.mainUrl);

const showError = new ShowError();

const loginForm = new Form(
  document.querySelector('#signin-popup'),
  '#signup-popup',
  mainApi.signin.bind(mainApi),
  mainApi.getUserData.bind(mainApi),
  showError,
);

const signupForm = new Form(
  document.querySelector('#signup-popup'),
  '#signin-popup',
  mainApi.signup.bind(mainApi),
  mainApi.getUserData.bind(mainApi),
  showError,
);

const regComplete = new Form(
  document.querySelector('#successed-reg'),
  '#signin-popup',
  null,
  null,
  showError,
);

const newsApi = new NewsApi(
  constants.newsApiConfig.apiKey,
  constants.newsApiConfig.days,
  constants.newsApiConfig.lang,
);

/* Проверка наличия актуальной куки для авторизации и получение данных пользователя  */
let userData = { };

mainApi.getUserData()
  .then((data) => {
    userData = data;
    if (userData.user) {
      userName.textContent = `${userData.user} ->`;
      localStorage.setItem('user', userData.user);
      headerMenu.classList.add('header__menu_logged-in');
      authorize.removeEventListener('click', () => { loginForm.open(); });
      userName.addEventListener('click', () => {
        mainApi.logout();
        headerMenu.classList.remove('header__menu_logged-in');
        authorize.addEventListener('click', () => {
          loginForm.open();
        });
      });
    } else {
      userName.textContent = '->';
      headerMenu.classList.remove('header__menu_logged-in');
      authorize.addEventListener('click', () => { loginForm.open(); });
      userName.removeEventListener('click', () => {
        mainApi.logout()
          .then(location.reload());
      });
    }
  })
  .catch((err) => {
    /*    this.showError.show(err.message); */
    headerMenu.classList.remove('header__menu_logged-in');
    authorize.addEventListener('click', () => { loginForm.open(); });
    userName.removeEventListener('click', () => {
      mainApi.logout();
      location.reload();
    });
  });


const newsRender = new NewsRender(
  newsApi.getNews.bind(newsApi),
  mainApi.createArticle.bind(mainApi),
  mainApi.removeArticle.bind(mainApi),
  showError,
  constants,
);
