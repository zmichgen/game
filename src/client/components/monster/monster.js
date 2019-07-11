/* eslint-disable import/no-cycle */
import leftArm1 from './images/leftArm1.png';
import leftLeg1 from './images/leftLeg1.png';
import rightLeg1 from './images/rightLeg1.png';
import body1 from './images/body1.png';
import head1 from './images/head1.png';
import rightArm1 from './images/rightArm1.png';
import weapon1 from './images/weapon1.png';

import leftArm2 from './images/leftArm2.png';
import leftLeg2 from './images/leftLeg2.png';
import rightLeg2 from './images/rightLeg2.png';
import body2 from './images/body2.png';
import head2 from './images/head2.png';
import rightArm2 from './images/rightArm2.png';
import weapon2 from './images/weapon2.png';

import leftArm3 from './images/leftArm3.png';
import leftLeg3 from './images/leftLeg3.png';
import rightLeg3 from './images/rightLeg3.png';
import body3 from './images/body3.png';
import head3 from './images/head3.png';
import rightArm3 from './images/rightArm3.png';
import weapon3 from './images/weapon3.png';

import names from './monsterNames.json';
import './monster.scss';
import { BaseMonster, monsterId } from '../../GameState';

const COUNT_OF_NAME_VARIANT = 11;
const COUNT_OF_ENEMIES = 3;

// return random number from 0 to 'to'
function randomIndex(to) {
  return Math.floor(Math.random() * to);
}

function randomName(to) {
  return [names.titul[randomIndex(to)], names.kind[randomIndex(to)], names.name[randomIndex(to)]].join(' ');
}

export default class Monster {
  constructor() {
    this.monsterChunks = [
      [rightArm1, rightArm2, rightArm3],
      [rightLeg1, rightLeg2, rightLeg3],
      [body1, body2, body3],
      [leftLeg1, leftLeg2, leftLeg3],
      [head1, head2, head3],
      [weapon1, weapon2, weapon3],
      [leftArm1, leftArm2, leftArm3],
    ];
    this.container = document.createElement('div');
    this.container.classList.add('monster');
    if (BaseMonster.name === '') {
      this.name = '';
      this.monster = [];
      this.level = 0;
    } else {
      this.name = BaseMonster.name;
      this.monster = BaseMonster.monster.slice();
    }
  }

  getNewMonster() {
    this.monster = this.monsterChunks.map((item, index) => {
      const element = new Image();
      element.src = item[randomIndex(COUNT_OF_ENEMIES)];
      element.id = monsterId[index];
      return element;
    });
    this.name = randomName(COUNT_OF_NAME_VARIANT);
    BaseMonster.name = this.name;
    BaseMonster.monster = this.monster.slice();
  }

  getName() {
    return this.name;
  }

  getMonster() {
    if (this.name === '') {
      this.getNewMonster();
    }
  }

  reset() {
    this.monster = [];
    this.name = '';
  }

  draw() {
    this.getMonster();
    this.monster.forEach((item, index) => {
      item.classList.add(['m', monsterId[index].split('-')[1], 'breath'].join('-'));
      this.container.appendChild(item);
    });
    document.getElementById('monster').innerHTML = '';
    document.getElementById('monster').appendChild(this.container);
  }
}
