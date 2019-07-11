import './loadershow.scss';
import template from './loaderShowTemplate.pug';

export default class LoaderShow {
  constructor() {
    this.elemHtml = template();
  }

  show() {
    document.getElementById('loadershow').innerHTML = this.elemHtml;
    document.getElementById('loadershow').style.display = 'block';
  }

  hide() {
    document.getElementById('loadershow').innerHTML = '';
    document.getElementById('loadershow').style.display = 'none';
    this.element = '';
  }
}
