/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */

import axios from 'axios';
import TaskTemplate from './task4template.pug';
import './task4style.scss';
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
  return Dictionary[randomIndex(Dictionary.length)].word;
}

export default class Task4 {
  constructor(magicNumber) {
    magic = magicNumber;
  }

  solveTask(e) {
    if (e.target.id === 'checkIt') {
      pushButtonSound();
      this.userAnswer = document.getElementById('user-answer').value.toLowerCase();
      $('#task-window').modal('hide');
      if (rightAnswer === this.userAnswer) {
        this.battle = new Battle(magic, true);
      } else {
        this.battle = new Battle(magic, false);
      }
      this.battle.run();
    }
    if (e.target.id === 'playIt') {
      const synth = window.speechSynthesis;
      const message = new SpeechSynthesisUtterance();
      message.lang = 'en-US';
      message.text = rightAnswer;
      message.pitch = 0.8;
      message.rate = 0.6;
      message.volume = 150;
      synth.speak(message);
    }
  }

  render() {
    axios('./public/dictionary2.json')
      .then(res => getTaskData(res.data))
      .then((taskData) => {
        rightAnswer = taskData;
        this.TaskElement = TaskTemplate({
          title: 'Введи услышанное слово',
          btnName: 'Закрыть',
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
