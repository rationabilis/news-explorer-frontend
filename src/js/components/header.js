export default class Header {
  constructor(props) {
    this._isLoggedIn = false;
    this._userName = 'Авторизоваться';
    this.color = props.color;
  }

  render() {
    if (this.isLoggedIn) {
      document.getElementById('userName').textContent = `${this.userName} [->`;
      document.querySelector('.header__menu').classList.add('header__menu_logged-in');
    }
  }
}
