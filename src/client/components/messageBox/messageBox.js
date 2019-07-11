/* eslint-disable no-undef */
import MessageBoxTemplate from './msgBox.template.pug';
import './messageBox.scss';

export default class MsgBox {
  constructor(titleText, bodyText) {
    this.msg = MessageBoxTemplate({ title: titleText, msg: bodyText, btnName: 'Понял' });
    document.getElementById('msgBox').innerHTML = this.msg;
  }

  // eslint-disable-next-line class-methods-use-this
  show() {
    $('#msgBox').modal('show');
  }
}
