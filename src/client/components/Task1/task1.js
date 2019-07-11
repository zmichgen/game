/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */
import TaskTemplate from './task1template.pug';
import './task1style.scss';
import { pushButtonSound } from '../../GameState';
import Battle from '../battle/battleElement';

let rightAnswer = 0;
let magic = 0;

export default class Task {
  constructor(magicNumber) {
    magic = magicNumber;
    const toNumber = Math.floor(Math.random() * 100 + 10);
    this.firstNumber = Math.floor(Math.random() * toNumber + 1);
    this.secondNumber = Math.floor(Math.random() * toNumber + 1);

    if (this.firstNumber < this.secondNumber) {
      const temp = this.firstNumber;
      this.firstNumber = this.secondNumber;
      this.secondNumber = temp;
    }

    const operation = Math.floor(Math.random() * 2);
    this.operator = '';
    this.result = 0;
    switch (operation) {
    case 0: {
      rightAnswer = this.firstNumber + this.secondNumber;
      this.operator = '+';
      break;
    }
    case 1: {
      rightAnswer = this.firstNumber - this.secondNumber;
      this.operator = '-';
      break;
    }
    default: break;
    }
    this.TaskElement = TaskTemplate({
      title: 'Реши Задачу',
      btnName: 'Закрыть',
      first: this.firstNumber,
      second: this.secondNumber,
      operator: this.operator,
    });
  }

  solveTask(e) {
    if (e.target.type === 'button') {
      pushButtonSound();
      this.userAnswer = parseInt(document.getElementById('user-answer').value, 10);
      $('#task-window').modal('hide');
      if (this.userAnswer === rightAnswer) {
        this.battle = new Battle(magic, true);
      } else {
        this.battle = new Battle(magic, false);
      }
      this.battle.run();
    }
  }

  render() {
    document.getElementById('task-window').innerHTML = this.TaskElement;
    document.getElementById('task-area').addEventListener('click', this.solveTask);
    $('#task-window').modal('show');
  }
}
