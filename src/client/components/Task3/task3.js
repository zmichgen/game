/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */

import axios from 'axios';
import TaskTemplate from './task3template.pug';
import './task3style.scss';
import Battle from '../battle/battleElement';
import {
  pushButtonSound,
} from '../../GameState';

let rightAnswer = [];
let magic = 0;

function randomIndex(toNumber) {
  return Math.floor(Math.random() * toNumber);
}

function getTaskData(Dictionary) {
  return Dictionary[randomIndex(Dictionary.length)];
}

export default class Task3 {
  constructor(magicNumber) {
    magic = magicNumber;
  }

  solveTask(e) {
    if (e.target.type === 'button') {
      pushButtonSound();
      this.userAnswer = document.getElementById('user-answer').value.toLowerCase();
      $('#task-window').modal('hide');
      if (rightAnswer.includes(this.userAnswer)) {
        this.battle = new Battle(magic, true);
      } else {
        this.battle = new Battle(magic, false);
      }
      this.battle.run();
    }
  }

  render() {
    axios('./public/dictionary2.json')
      .then(res => getTaskData(res.data))
      .then((taskData) => {
        rightAnswer = taskData.translate.slice();
        this.TaskElement = TaskTemplate({
          title: 'Переведи слово на русский язык',
          btnName: 'Закрыть',
          englishWord: taskData.word.toUpperCase(),
        });
        return this.TaskElement;
      })
      .then((element) => {
        document.getElementById('task-window').innerHTML = element;
        document.getElementById('task-area').addEventListener('click', this.solveTask);
        $('#task-window').modal('show');
      });
  }
}
