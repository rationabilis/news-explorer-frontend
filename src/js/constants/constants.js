const constants = {
  mainApiConfig: {
    mainUrl: 'https://www.api.inscientia.ru', /* 'http://localhost:3000', */
  },
  newsApiConfig: {
    days: 7,
    apiKey: '4fd67e008f0240d980dfe1d6ff26a56e',
    lang: 'ru',
  },

  popup: {
    loginForm: '#signin-popup',
    signupForm: '#signup-popup',
    regComplete: '#successed-reg',
    mobileMenu: {
      node: '#mobile',
      openButton: '.header__mobile-button ',
      closeButton: '.mobile-menu__close',
    },
  },

  results: {
    showStep: 3,
    showMore: { node: '.search-results__button', hide: 'invisible' },
    resultsContainer: '.cards',
    newsForm: '.search__form',
    searchInput: '.search__input',
    searchSubmit: '.search__button',
    preloader: { node: '.searching', hide: 'invisible' },
    notFound: { node: '.no-results', hide: 'invisible' },
    serverError: { node: '#preloader-server-error', hide: 'invisible' },
    resultsSection: { node: '.search-results', hide: 'invisible' },
  },
  swiper: {
    node: '.swiper-container',
    commitDate: '.swiper-slide__date',
    commitImage: '.swiper-slide__image',
    commitName: '.swiper-slide__name',
    commitEmail: '.swiper-slide__email',
    commitText: '.swiper-slide__text',
    template: '#commit-template',
    swiperWrap: '.swiper-wrapper',
  },
  card: {
    node: '.card',
    img: '.card__image',
    date: '.card__date',
    title: '.card__title',
    text: '.card__text',
    src: '.card__source',
    warning: '.card__warning',
    keyword: '.card__category',
    icon: {
      node: '.icon',
      saved: 'icon_saved',
      marked: 'icon_marked',
      bin: 'delete_icon',
    },

  },
  savedNewsArray: {
    savedNewsContainer: '.cards_saved',
    savedNumber: '.saved-number',
    articlesHeader: '.saved-articles__subtitle',
    words: {
      first: '.first-keyword',
      second: '.second-keyword',
      more: '.and-more',
      rest: '.other',
    },
  },
  cardPrototype: '#card-template',
  month: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа',
    'сентября', 'октября', 'ноября', 'декабря'],
};

export default constants;
