import './style.css';
import Swiper from 'swiper';

// Скрипт не работал из html
// eslint-disable-next-line no-unused-vars
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 4,
  spaceBetween: 16,
  slidesPerGroup: 1,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
