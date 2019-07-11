/* eslint-disable import/no-cycle */
import RegForm from '../register/reg';
import slideData from './caruselData.json';
import LandingTemplate from './landingTemplate.pug';
import './landing.scss';
import {
  User,
  landingButtonsText,
  GAME,
  pushButtonSound,
} from '../../GameState';

function goPlay(e) {
  if (e.target.type === 'button') {
    pushButtonSound();
    const regform = new RegForm();
    regform.render();
  }
}

export default class Home {
  constructor() {
    let buttonName1 = landingButtonsText.button1;
    let buttonName2 = landingButtonsText.button2;
    let buttonName3 = landingButtonsText.button3;
    const userName = User.name;
    if (userName !== '') {
      buttonName1 = `${userName}, ${landingButtonsText.button1.toLowerCase()}`;
      buttonName2 = `${userName}, ${landingButtonsText.button2.toLowerCase()}`;
      buttonName3 = `${userName}, ${landingButtonsText.button3.toLowerCase()}`;
    }
    this.page = LandingTemplate({
      content1: buttonName1,
      content2: buttonName2,
      content3: buttonName3,
      level: GAME.LEVEL,
      data: slideData,
    });
  }

  render() {
    document.getElementById('root').innerHTML = this.page;
    document.getElementById('landing').addEventListener('click', goPlay);
  }
}
