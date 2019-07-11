/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
import { Promise } from 'q';
import axios from 'axios';
import './battleStyle.scss';

import {
  User, BaseMonster, URL_DB, REDUCE_SANTA_HP,
  reduceMonster, Score, monsterId, santaId, GameScreen, Sound,
} from '../../GameState';


import MsgBox from '../messageBox/messageBox';
import LoaderShow from '../loaderShow/loadershow';

import effect0 from './images/fireDragon.gif';
import effect1 from './images/romashki.gif';
import effect2 from './images/greenDay.gif';
import effect3 from './images/storm.gif';

import shotAudio from './audio/shot.mp3';
import screamMonster from './audio/monster-scream.mp3';
import SantaShotAudio from './audio/santa-audio.mp3';

const effects = [
  effect0,
  effect1,
  effect2,
  effect1,
  effect2,
  effect3,
];
let effect = effects[0];

function saveUserProgress() {
  const loaderShow = new LoaderShow();
  loaderShow.show();
  axios.post(`${URL_DB}/edit`, User).then((res) => {
    loaderShow.hide();
    if (res.data === 'error') {
      const msg = new MsgBox('Внимание! Что-то пошло не так...', 'Игра не сохранена. Сервер не доступен...');
      msg.show();
    } else {
      const msg = new MsgBox('Игра сохранена.', `Переход на ${User.level} уровень. Ты заработал ${User.score} баллов и вернул ${User.toys} игрушку на елку! Тебя ждут новые испытания!`);
      msg.show();
    }
  });
  return 'ok';
}


function reduceHp(barId) {
  const reducer = (barId === 'userHP') ? REDUCE_SANTA_HP : reduceMonster.hp;
  const barEl = document.getElementById(barId);
  const HPvalue = parseInt(barEl.style.width, 10);
  if (HPvalue > 0) {
    const HPtemp = HPvalue - reducer;
    const oldStyle = `bg-hp-${HPvalue}`;
    const newStyle = (HPtemp < 0) ? 'bg-hp-0' : `bg-hp-${HPtemp}`;
    const Hp = (HPtemp < 0) ? '0%' : `${(HPtemp)}%`;
    barEl.style.width = Hp;
    barEl.classList.replace(oldStyle, newStyle);
    return HPtemp;
  }
  return HPvalue;
}

function timer(t) {
  return new Promise(((resolve) => {
    setTimeout(() => {
      resolve();
    }, t);
  }));
}

function monsterAfterShot() {
  monsterId.forEach((item) => {
    const piece = item.split('-')[1];
    const oldClass = ['m', piece, 'shot'].join('-');
    const newClass = ['m', piece, 'breath'].join('-');
    document.getElementById(item).classList.replace(oldClass, newClass);
  });
}

function monsterShot() {
  monsterId.forEach((item) => {
    const piece = item.split('-')[1];
    const oldClass = ['m', piece, 'breath'].join('-');
    const newClass = ['m', piece, 'shot'].join('-');
    document.getElementById(item).classList.replace(oldClass, newClass);
  });
}

function monsterDamage() {
  monsterId.forEach((item) => {
    const piece = item.split('-')[1];
    const oldClass = ['m', piece, 'breath'].join('-');
    const newClass = ['m', piece, 'break'].join('-');
    document.getElementById(item).classList.replace(oldClass, newClass);
  });
}

function monsterAfterDamage() {
  monsterId.forEach((item) => {
    const piece = item.split('-')[1];
    const oldClass = ['m', piece, 'break'].join('-');
    const newClass = ['m', piece, 'breath'].join('-');
    document.getElementById(item).classList.replace(oldClass, newClass);
  });
}

function santaBreak() {
  santaId.forEach((item) => {
    const piece = item.split('-')[1];
    const oldClass = ['s', piece, 'breath'].join('-');
    const newClass = ['s', piece, 'break'].join('-');
    document.getElementById(item).classList.replace(oldClass, newClass);
  });
}

function santaShot() {
  santaId.forEach((item) => {
    const piece = item.split('-')[1];
    const oldClass = ['s', piece, 'breath'].join('-');
    const newClass = ['s', piece, 'shot'].join('-');
    document.getElementById(item).classList.replace(oldClass, newClass);
  });
}

function santaAfterShot() {
  santaId.forEach((item) => {
    const piece = item.split('-')[1];
    const oldClass = ['s', piece, 'shot'].join('-');
    const newClass = ['s', piece, 'breath'].join('-');
    document.getElementById(item).classList.replace(oldClass, newClass);
  });
}

function santaAfterBreak() {
  santaId.forEach((item) => {
    const piece = item.split('-')[1];
    const oldClass = ['s', piece, 'break'].join('-');
    const newClass = ['s', piece, 'breath'].join('-');
    document.getElementById(item).classList.replace(oldClass, newClass);
  });
}

function moveMonster() {
  timer(0)
    .then(() => {
      monsterShot();
      if (Sound.effect) {
        const scream = new Audio(screamMonster);
        scream.play();
      }
      return timer(2500);
    })
    .then(() => {
      monsterAfterShot();
      if (Sound.effect) {
        const audioeffect = new Audio(shotAudio);
        audioeffect.play();
      }
      document.getElementById('se-santa').src = effect;
      santaBreak();
      return timer(2000);
    })
    .then(() => {
      santaAfterBreak();
      document.getElementById('se-santa').src = '';
      User.hp = reduceHp('userHP');
      return timer(1000);
    })
    .then(() => {
      if (User.hp === 0) {
        const gameOver = new MsgBox('Игра окончена', 'Ты проиграл!  Попробуй еще раз...');
        gameOver.show();
        document.querySelectorAll('.menubtn').forEach((item) => {
          item.classList.remove('disabled');
          item.removeAttribute('disabled');
        });
        User.hp = 100;
        const score = new Score();
        score.render();
      }
    });
}

function moveSanta() {
  timer(0)
    .then(() => {
      santaShot();
      if (Sound.effect) {
        const santaShotEffect = new Audio(SantaShotAudio);
        santaShotEffect.play();
      }
      return timer(2000);
    })
    .then(() => {
      santaAfterShot();
      if (Sound.effect) {
        const audioeffect = new Audio(shotAudio);
        audioeffect.play();
      }
      document.getElementById('se-monster').src = effect;
      monsterDamage();
      return timer(2000);
    })
    .then(() => {
      document.getElementById('se-monster').src = '';
      monsterAfterDamage();
      BaseMonster.hp = reduceHp('monsterHP');
      return timer(1000);
    })
    .then(() => {
      if (BaseMonster.hp <= 0) {
        BaseMonster.name = '';
        User.score += 100;
        User.toys += 1;
        User.level += 1;
        return saveUserProgress();
      }
      return 'no';
    })
    .then((data) => {
      if (data === 'ok') {
        const game = new GameScreen();
        game.render();
      }
    });
}

export default class Battle {
  constructor(magicNumber, result) {
    this.result = result;
    effect = effects[magicNumber];
  }

  run() {
    if (this.result === true) {
      moveSanta();
    } else {
      moveMonster();
    }
  }
}
