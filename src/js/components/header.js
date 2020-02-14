/* Header. Класс, отвечающий за логику работы шапки сайта. Его конструктор принимает объект опций.
В опциях передайте цвет шапки, так как на разных страницах он может быть разный.
Методы у класса Header такие:
render при вызове перерисовывает шапку в зависимости от переданного аргумента — объекта props.
У этого объекта есть два обязательных свойства:
isLoggedIn — залогинен ли пользователь;
userName — имя, которое отображается в шапке залогиненного пользователя.
props = {isLoggedIn: true, userName: 'Alexander', color: 'white'}
*/

export default class Header {
  constructor(props) {
    this.isLoggedIn = props.isLoggedIn;
    this.userName = props.name;
    this.color = props.color;
  }

  render() {
    if (this.isLoggedIn) {
      document.getElementById('userName').textContent = `${this.userName} [->`;
      document.querySelector('.header__menu').classList.add('header__menu_logged-in');
    }
  }
}
