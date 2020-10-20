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
import common from '../js/components/common';

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

const showError = new ShowError();
const gitApi = new GitApi('https://api.github.com/repos/rationabilis/news-explorer-frontend/commits');


const commonMain = common();

commonMain.init();

const gitRender = new GitRender(
  gitApi.getCommits.bind(gitApi),
  constants,
);

gitApi.getCommits()
  .then((data) => { gitRender.renderCommits(data); })
  .catch((err) => {
    showError.show(err.message);
  });
