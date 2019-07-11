/* eslint-disable import/no-cycle */

import axios from 'axios';
import scoreTemplate from './scoreTemplate.pug';
import './score.scss';
import {
  URL_DB, _,
} from '../../GameState';

import LoaderShow from '../../components/loaderShow/loadershow';

export default class Score {
  constructor() {
    this.url = URL_DB;
    document.getElementById('root').innerHTML = '<div id="loadershow" class="loadershow"></div>';
  }

  render() {
    this.loadershow = new LoaderShow();
    this.loadershow.show();
    axios.get(this.url)
      .then((response) => {
        this.loadershow.hide();
        const [...data] = _.sortBy(response.data, 'score').reverse();
        this.page = scoreTemplate({ items: data });
        document.getElementById('root').innerHTML = this.page;
      });
  }
}
