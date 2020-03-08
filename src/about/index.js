/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import './style.css';

import '../images/close-button.png';
import '../images/mobile_menu_button_white.png';
import '../images/mobile_menu_button_black.png';

import Swiper from 'swiper';
import MainApi from '../js/api/main-api';
import Form from '../js/components/form';
import GitApi from '../js/api/git-api';
import GitRender from '../js/components/git-render';
import ShowError from '../js/components/error';
import constants from '../js/constants/constants';


// eslint-disable-next-line no-unused-vars
const swiper = new Swiper('.swiper-container', {
  updateOnWindowResize: true,
  slidesPerView: 4,
  spaceBetween: 16,
  slidesPerGroup: 1,
  loop: true,
  loopFillGroupWithBlank: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    200: {
      slidesPerView: 1,
      spaceBetween: 8,
    },
    700: {
      slidesPerView: 3,
      spaceBetween: 8,
    },
    1400: {
      slidesPerView: 4,
      spaceBetween: 16,
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const mainApi = new MainApi(constants.mainApiConfig.mainUrl);
const authorize = document.querySelector('#authorize');
const userName = document.querySelector('#userName');
const headerMenu = document.querySelector('.header__menu');
const showError = new ShowError();
const gitApi = new GitApi('https://api.github.com/repos/rationabilis/news-explorer-frontend/commits');

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
    this.showError.show(err.message);
    headerMenu.classList.remove('header__menu_logged-in');
    authorize.addEventListener('click', () => { loginForm.open(); });
    userName.removeEventListener('click', () => {
      mainApi.logout();
      location.reload();
    });
  });

const gitRender = new GitRender(
  gitApi.getCommits.bind(gitApi),
  constants,
);

gitApi.getCommits()
  .then((data) => { gitRender.renderCommits(data); })
  .catch((err) => {
    showError.show(err.message);
  });
