export default class MenuRender {
  constructor(loginFormOpen, logout, showError) {
    this.loginHandler = loginFormOpen;
    this.logoutHandler = logout;
    this.showError = showError;
 /*    this._authorize = document.querySelector('#authorize'); */
    this._shownName = document.querySelector('#userName');
/*     this._menuLogout = this._shownName.parentNode.querySelector('.menu__logout'); */
    this._savedArticles = document.querySelector('#menu-saved-articles');
    this._updateView = new Event('updateView', { bubbles: true });
    console.log(this.loginHandler, this.logoutHandler, this.showError, this._authorize, this._shownName);
  }
 /*  console.log('constructor'); */


  _onClick() {
    console.log('_onClick');
    const user = localStorage && localStorage.getItem('user');
    if (user) {
      this._logout();
    } else {
      this._login();
    }
  }

  _logout() {
    this.logoutHandler()
      .then(() => {
        // eslint-disable-next-line no-unused-expressions
        localStorage && localStorage.clear();
        this._renderMenu();
        document.dispatchEvent(this._updateView);
      })
      .catch((err) => {
        this.showError.show(err.message);
      });
  }

  _login() {
    this.loginHandler();
    console.log('login');
  }

  _renderMenu() {
    const user = localStorage && localStorage.getItem('user');
    console.log(user);
    if (!user) {
      if (document.location.pathname === '/articles/') document.location.href = '../';
      this._shownName.textContent = 'Авторизуйтесь';
/*       this._menuLogout.style.display = 'none'; */
/*       this._savedArticles.style.display = 'none'; */
    } else {
      this._shownName.textContent = user;
      this._menuLogout.style.display = 'inline-block';
      this._savedArticles.style.display = 'flex';
    }
  }

  init() {
    this._renderMenu();
    document.addEventListener('updateMenu', this._renderMenu.bind(this));
    this._authorize.addEventListener('click', () => this._onClick());
  }
}
