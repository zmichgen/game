/* eslint-disable import/no-cycle */
import leftArm from './images/leftArm.png';
import leftLeg from './images/leftLeg.png';
import rightLeg from './images/rightLeg.png';
import body from './images/body.png';
import head from './images/head.png';
import rightArm from './images/rightArm.png';
import './santa.scss';
import { santaId } from '../../GameState';


export default class Santa {
  constructor() {
    this.santa = [leftArm, leftLeg, rightLeg, body, head, rightArm];
    this.container = document.createElement('div');
    this.container.classList.add('santa');
  }

  draw() {
    this.sprite = this.santa.map((item, index) => {
      const element = new Image();
      element.src = item;
      element.id = santaId[index];
      element.classList.add(['s', santaId[index].split('-')[1], 'breath'].join('-'));
      return element;
    });

    this.sprite.forEach((item) => {
      this.container.appendChild(item);
    });

    document.getElementById('santa').appendChild(this.container);
  }
}
