/* eslint-disable no-new */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import './style.css';

import '../images/close-button.png';
import '../images/delete-icon-grey.png';
import '../images/delete-icon-black.png';
import '../images/normal-icon.png';
import '../images/hover-icon.png';
import '../images/marked-icon.png';
import '../images/mobile_menu_button_white.png';
import '../images/mobile_menu_button_black.png';

import constants from '../js/constants/constants';
import SavedNewsArray from '../js/components/saved-news-array';
import common from '../js/components/common';

const commonMain = common();

commonMain.init();


new SavedNewsArray(
  commonMain.mainApi.getArticles.bind(commonMain.mainApi),
  commonMain.mainApi.removeArticle.bind(commonMain.mainApi),
  constants,
  commonMain.showError,
);
