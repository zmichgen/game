/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */

import axios from 'axios';
import TaskTemplate from './task2template.pug';
import './task2style.scss';
import Battle from '../battle/battleElement';

let rightAnswer = [];
let magic = 0;

function randomIndex(toNumber) {
  return Math.floor(Math.random() * toNumber);
}

function mixIt(word) {
  const array = word.slice();
  const len = array.length;
  for (let i = 0; i < len; i += 1) {
    const index1 = Math.floor(Math.random() * len);
    const index2 = Math.floor(Math.random() * len);
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
  }
  return array;
}

function getAnswer() {
  const letterArray = [];
  document.querySelectorAll('.letter').forEach((item) => {
    letterArray.push(item.id.split('-')[2]);
  });
  return letterArray.join('');
}

function getTaskData(Dictionary) {
  return Dictionary[randomIndex(Dictionary.length)].word;
}

export default class Task1 {
  constructor(magicNumber) {
    magic = magicNumber;
  }

  solveTask(e) {
    if (e.target.type === 'button') {
      const answer = getAnswer().toLowerCase();
      $('#task-window').modal('hide');
      if (rightAnswer === answer) {
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
        rightAnswer = taskData;
        const wordArray = mixIt(rightAnswer.toUpperCase().split(''));
        this.TaskElement = TaskTemplate({
          title: 'Собери слово из букв',
          btnName: 'Закрыть',
          gameWord: wordArray,
        });
        return this.TaskElement;
      })
      .then((element) => {
        document.getElementById('task-window').innerHTML = element;
        document.getElementById('task-area').addEventListener('click', this.solveTask);
        $('#game-word').sortable();
        $('#game-word').disableSelection();
        $('#task-window').modal('show');
      });
  }
}
