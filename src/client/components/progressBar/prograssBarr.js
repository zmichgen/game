import progressbarTemplate from './progressBar.template.pug';
import './progressBar.scss';

export default class ProgressBar {
  constructor(playerName, barId, _hp) {
    const Uname = `${playerName}`;
    this.pbHtml = progressbarTemplate({ idpb: barId, name: Uname, hp: _hp });
  }

  getElement() {
    return this.pbHtml;
  }
}
