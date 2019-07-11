/* eslint-disable import/no-cycle */
import * as _ from 'lodash';
import Landing from './screens/landing/landing';
import Navbar from './components/navigation/navbar';
import Score from './screens/score/score';
import Register from './screens/register/reg';
import GameScreen from './screens/gameScreen/gameScreen';

import pushButtonAudio from './audio/button-push.mp3';

export const menuItems = [
  'Об игре',
  'Рекорды',
  'Вход / Регистрация',
];

export const Sound = {
  effect: true,
};

export const FIRST_PAGE = 0; // initial page (Landing)

export const User = { // initial User state
  name: '',
  login: '',
  password: '',
  score: 0,
  level: 0,
  toys: 0,
  hp: 100,
};

export const User1 = {
  name: 'Петрович',
  login: 'ппп',
  password: '111',
  score: 0,
  level: 0,
  toys: 0,
  hp: 100,
};

export const BaseMonster = {
  name: '',
  monster: [],
  hp: 100,
};

export const monsterId = [
  'monster-rightArm',
  'monster-rightLeg',
  'monster-body',
  'monster-leftLeg',
  'monster-head',
  'monster-weapon',
  'monster-leftArm',
];
export const santaId = [
  'santa-leftArm',
  'santa-leftLeg',
  'santa-rightLeg',
  'santa-body',
  'santa-head',
  'santa-rightArm',
];
export const NEW_VISIT = true;
export const MAX_HP = 100;
const localServ = false;
const HEROKU = 'https://sleepy-atoll-27552.herokuapp.com/user';
const LOCAL = 'http://localhost:5000/user';
export const Pages = [];
export const GAME = {
  LEVEL: 0,
};
export const MAX_TOYS = 21;
export const CALL_TEXT = 'помоги Деду Морозу нарядить Ёлку!';
export const URL_DB = localServ ? LOCAL : HEROKU;
export const WELCOM_MES = 'Добро пожаловать, ';
export const WELCOM_BACK_MES = 'С возвращением, ';
export const reduceMonster = {
  hp: 45,
};
export const REDUCE_SANTA_HP = 10;
export const TO_NUMBER = 100; // generate number from 0 to TO_NUMBER
export const landingButtonsText = {
  button1: 'НАЙДИ ИГРУШКИ',
  button2: 'В БОЙ',
  button3: 'ИСПЫТАЙ СВОЮ УДАЧУ!',
};

export function pushButtonSound() {
  if (Sound.effect) {
    const pushAudio = new Audio(pushButtonAudio);
    pushAudio.play();
  }
}


export {
  Landing, Navbar, Score, Register, GameScreen, _,

};
