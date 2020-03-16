/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-new */
import constants from '../constants/constants';
import Form from './form';
import ShowError from './error';
import MainApi from '../api/main-api';
import NewsApi from '../api/news-api';
import BaseComponent from './base-component';
import MobileMenu from './mobileMenu';

const common = () => {
  const headerMenu = document.querySelector(constants.header.menu);
  const authorize = document.querySelector(constants.header.authorize);

  const userName = document.querySelector(constants.header.userName);
  const mobileUserName = document.querySelector(constants.popup.mobileMenu.userName);
  const mobileSavedNews = document.querySelector(constants.popup.mobileMenu.savedNews);
  const mainApi = new MainApi(constants.mainApiConfig.mainUrl);
  const showError = new ShowError();

  const loginForm = new Form(
    document.querySelector(constants.popup.loginForm),
    constants.popup.signupForm,
    mainApi.signin.bind(mainApi),
    mainApi.getUserData.bind(mainApi),
    showError,
  );

  const signupForm = new Form(
    document.querySelector(constants.popup.signupForm),
    constants.popup.loginForm,
    mainApi.signup.bind(mainApi),
    mainApi.getUserData.bind(mainApi),
    showError,
  );

  const regComplete = new Form(
    document.querySelector(constants.popup.regComplete),
    constants.popup.loginForm,
    null,
    null,
    showError,
  );

  const mobileMenu = new MobileMenu(
    document.querySelector(constants.popup.mobileMenu.node),
  );

  new BaseComponent(
    document.querySelector(constants.popup.mobileMenu.openButton),
    { click: () => { mobileMenu.open(); } },
  );

  new BaseComponent(
    document.querySelector(constants.popup.mobileMenu.closeButton),
    { click: () => { mobileMenu.close(); } },
  );


  const newsApi = new NewsApi(
    constants.newsApiConfig.apiKey,
    constants.newsApiConfig.days,
    constants.newsApiConfig.lang,
  );

  let userData;

  function mainLogin() {
    mobileMenu.close();
    loginForm.open();
  }

  function mainLogout() {
    headerMenu.classList.remove(constants.header.loggedIn);
    userData = 'Авторизоваться';
    authorize.addEventListener('click', () => { loginForm.open(); });
    mainApi.logout()
      .then(() => { document.location.href = '../index.html'; });
  }

  function init() {
    userData = localStorage.getItem('user');
    if (userData == null || userData === 'Авторизоваться') {
      userData = 'Авторизоваться';
      mobileSavedNews.classList.add('invisible');
      userName.textContent = `${userData} ->`;
      mobileUserName.textContent = userData;
      headerMenu.classList.remove(constants.header.loggedIn);
      new BaseComponent(authorize, {
        click: () => {
          loginForm.open();
        },
      });
      new BaseComponent(mobileUserName, {
        click: () => {
          mainLogin();
        },
      });
      userName.removeEventListener('click', () => {
        mainApi.logout();
      });
      mobileUserName.removeEventListener('click', () => {
        mobileMenu.close();
        mainApi.logout();
      });
    } else {
      userData = localStorage.getItem('user');
      userName.textContent = `${userData} ->`;
      mobileUserName.textContent = userData;
      headerMenu.classList.add(constants.header.loggedIn);
      authorize.removeEventListener('click', () => {
        loginForm.open();
      });
      mobileUserName.removeEventListener('click', () => {
        mainLogin();
      });

      new BaseComponent(mobileUserName, { click: () => { mainLogout(); } });

      new BaseComponent(userName, { click: () => { mainLogout(); console.log('добавлен слушатель на выход'); } });
    }
  }

  return {
    loginForm,
    signupForm,
    regComplete,
    mobileMenu,
    newsApi,
    mainApi,
    showError,
    init,
  };
};

export default common;
