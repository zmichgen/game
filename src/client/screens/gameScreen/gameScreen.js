/* eslint-disable import/no-cycle */
import * as _ from 'lodash';
import './gameScreen.scss';
import gameScreenTemplate from './gameScreen.template.pug';

import {
  User, WELCOM_MES, WELCOM_BACK_MES,
  MAX_HP, BaseMonster, Landing, GAME, MAX_TOYS, reduceMonster,
  pushButtonSound,
} from '../../GameState';

import SantaSprite from '../../components/santa/santa';
import MonsterSprite from '../../components/monster/monster';
import ProgressBar from '../../components/progressBar/prograssBarr';
import ChooseMagic from '../../components/chooseMagic/chooseMagic';

export default class Game {
  constructor() {
    this.greeting = '';
    this.user = new SantaSprite();
    this.monster = new MonsterSprite();
    GAME.LEVEL = (User.level <= MAX_TOYS) ? User.level : MAX_TOYS;
  }

  getElement() {
    return this.page;
  }

  exit() {
    pushButtonSound();
    this.landing = new Landing();
    document.getElementById('nav').enable();
    this.landing.render();
  }

  goGame() {
    pushButtonSound();
    this.choose = new ChooseMagic().show();
  }

  render() {
    reduceMonster.hp = (User.level < 6) ? (reduceMonster.hp - 5) : 10;
    if (User.novice) {
      this.greeting = _.join([WELCOM_MES, User.name, '!'], '');
      User.visit = false;
    } else {
      this.greeting = _.join([WELCOM_BACK_MES, User.name, '!'], '');
    }
    this.page = gameScreenTemplate({ greeting: this.greeting, level: GAME.LEVEL });
    document.getElementById('nav').disable();
    document.getElementById('root').innerHTML = this.page;
    this.user.draw();
    this.monster.draw();
    BaseMonster.hp = MAX_HP;
    this.monsterProgressBar = new ProgressBar(BaseMonster.name, 'monsterHP', BaseMonster.hp);
    this.userProgressBar = new ProgressBar(User.name, 'userHP', User.hp);
    document.querySelector('.user-progress').innerHTML = this.userProgressBar.getElement();
    document.querySelector('.monster-progress').innerHTML = this.monsterProgressBar.getElement();
    document.getElementById('exit').addEventListener('click', this.exit);
    document.getElementById('go').addEventListener('click', this.goGame);
  }
}
