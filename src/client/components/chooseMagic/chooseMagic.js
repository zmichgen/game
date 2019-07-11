/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */

import './chooseMagic.scss';
import chooseMagicTemplate from './chooseTemplate.pug';
import magicTypes from './magicTypes.json';
import {
  pushButtonSound,
} from '../../GameState';
import Task1 from '../Task1/task1';
import Task2 from '../Task2/task2';
import Task3 from '../Task3/task3';
import Task4 from '../Task4/task4';
import Task5 from '../Task5/task5';

const tasks = [
  Task1,
  Task2,
  Task3,
  Task4,
  Task5,
];

function RandomTask(arrayOfTasks) {
  const index = Math.floor(Math.random() * arrayOfTasks.length);
  return arrayOfTasks[index];
}

export default class ChooseMagic {
  constructor() {
    const types = [...magicTypes.types];
    this.element = chooseMagicTemplate({ title: 'Выбери заклинание', btnName: 'Закрыть', btns: types });
  }

  goToTask(e) {
    if (e.target.type === 'button') {
      pushButtonSound();
      let Task = {};
      this.targetId = e.target.id;
      const magicNumber = e.target.id.split('-')[2];
      $('#chooseMagic').modal('hide');
      if (magicNumber > 4) {
        Task = RandomTask(tasks);
      } else {
        Task = tasks[magicNumber];
      }
      const task = new Task(magicNumber);
      task.render();
    }
  }

  show() {
    document.getElementById('chooseMagic').innerHTML = this.element;
    document.getElementById('btn-area').addEventListener('click', this.goToTask);
    $('#chooseMagic').modal('show');
  }
}
