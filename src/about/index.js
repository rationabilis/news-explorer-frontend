import './style.css';
import Swiper from 'swiper';

// Скрипт не работал из html
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
