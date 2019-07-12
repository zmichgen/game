/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */

import axios from 'axios';
import TaskTemplate from './task5template.pug';
import './task5style.scss';
import Battle from '../battle/battleElement';
import burstSound from './audio/burst.mp3';


const alfabet = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
  'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
];

const colors = [
  'green', 'goldenrod', 'blue', 'orange', 'red', 'cyan', 'magenta', 'slateblue',
];

let rightAnswer = '';
let magic = 0;
let count = 4;
let INT_ID = 0;
let leftShift = 65;
let round = 0;
let totalRound = 0;
let arrayOfLetter = [];
let MaxMismatch = 0;
let mismatch = 0;

function burst() {
  const audio = new Audio(burstSound);
  audio.play();
}

function maxMismatch() {
  return Math.floor(Math.random() * 6 + 5);
}

function timer(t) {
  return new Promise(((resolve) => {
    setTimeout(() => {
      resolve();
    }, t);
  }));
}

function randomColor() {
  return colors[Math.floor(Math.random() * 8)];
}

function getElement(event) {
  if (event.target.tagName === 'SPAN') {
    return event.target.parentElement;
  }
  return event.target;
}

function randomLetter() {
  return alfabet[Math.floor(Math.random() * 26)];
}

function deleteBalloon() {
  document.querySelector('.balloon').remove();
}

function balloonBurst(element) {
  const status = element.getAttribute('data-correct') === 'true';
  const gameAreaCoord = document.getElementById('game-area').getBoundingClientRect();
  const elementAbsoluteCoord = element.getBoundingClientRect();
  const elemLeft = Math.floor(elementAbsoluteCoord.left - gameAreaCoord.left);
  const elemTop = Math.floor(elementAbsoluteCoord.top - gameAreaCoord.top);
  const newElement = document.createElement('div');
  newElement.classList.add('balloon-burst');
  newElement.style.top = `${elemTop}px`;
  newElement.style.left = `${elemLeft}px`;
  timer(0)
    .then(() => {
      element.remove();
      burst();
      document.getElementById('game-area').append(newElement);
      return timer(1000);
    })
    .then(() => {
      newElement.remove();
    });
  return status;
}

class Balloon {
  constructor(letter, left) {
    const balloon = document.createElement('div');
    const color = randomColor();
    balloon.setAttribute('data-correct', (letter === arrayOfLetter[round]) ? 'true' : 'false');
    balloon.classList.add('balloon', 'fly');
    balloon.style.left = left;
    balloon.style.color = color;
    balloon.style.background = color;
    balloon.style.boxShadow = `inset 10px 10px 10px dark${color}`;
    balloon.innerHTML = `<span>${letter}</span>`;
    balloon.addEventListener('animationend', deleteBalloon);
    document.getElementById('game-area').appendChild(balloon);
  }
}

function win() {
  timer(0)
    .then(() => {
      clearInterval(INT_ID);
      return timer(2000);
    })
    .then(() => {
      document.getElementById('game-area').innerHTML = '<h2>УРА! ПОБЕДА!!!</h2>';
      return timer(2000);
    })
    .then(() => {
      count = 4;
      round = 0;
      $('#task-window').modal('hide');
      const battle = new Battle(magic, true);
      battle.run();
    });
}

function loose() {
  timer(0)
    .then(() => {
      clearInterval(INT_ID);
      return timer(2000);
    })
    .then(() => {
      document.getElementById('game-area').innerHTML = '<h2>ТЫ ПРОИГРАЛ....</h2>';
      return timer(2000);
    })
    .then(() => {
      count = 4;
      round = 0;
      $('#task-window').modal('hide');
      const battle = new Battle(magic, false);
      battle.run();
    });
}

class BalloonGame {
  addBalloon() {
    let letter = randomLetter();
    if (letter !== arrayOfLetter[round]) {
      mismatch += 1;
      if (mismatch > MaxMismatch) {
        letter = arrayOfLetter[round];
        mismatch = 0;
      }
    }
    this.bal = new Balloon(letter, `${leftShift}px`);
    leftShift += 250;
    if (leftShift > 565) leftShift = 50;
  }

  addCount() {
    this.count = document.createElement('button');
    this.count.id = 'countLives';
    this.count.classList.add('btn', 'btn-outline-info');
    this.count.innerText = `Жизни : ${count}`;
    document.getElementById('task-area').appendChild(this.count);
  }

  go() {
    INT_ID = setInterval(() => {
      this.addBalloon();
    }, 1000);
  }

  stopGame() {
    clearInterval(INT_ID);
  }

  shot(e) {
    const element = getElement(e);
    if (element.hasAttribute('data-correct')) {
      this.status = balloonBurst(element);
      MaxMismatch = maxMismatch();
      if (this.status) {
        document.getElementById(`letter-${round}`).style.display = 'block';
        round += 1;
        if (round !== totalRound) {
          clearInterval(INT_ID);
          new BalloonGame().go();
        } else {
          win();
        }
      } else {
        count -= 1;
        if (count === 0) {
          loose();
        }
        document.getElementById('countLives').innerText = `Жизни : ${count}`;
      }
    }
  }


  start() {
    document.getElementById('game-area').addEventListener('click', this.shot);
    this.go();
    this.addCount();
    document.getElementById('start').remove();
  }
}

function randomIndex(toNumber) {
  return Math.floor(Math.random() * toNumber);
}

function playIt(word) {
  const synth = window.speechSynthesis;
  const message = new SpeechSynthesisUtterance(word);
  message.rate = 0.6;
  synth.speak(message);
}

function getTaskData(Dictionary) {
  return Dictionary[randomIndex(Dictionary.length)].word;
}

export default class Task5 {
  constructor(magicNumber) {
    magic = magicNumber;
    MaxMismatch = maxMismatch();
  }

  solveTask(e) {
    if (e.target.id === 'playIt') {
      playIt(rightAnswer);
      this.it = true;
    }
    if (e.target.id === 'start') {
      this.game = new BalloonGame();
      this.game.start();
    }
  }


  render() {
    axios('./public/dictionary2.json')
      .then(res => getTaskData(res.data))
      .then((taskData) => {
        rightAnswer = taskData;
        arrayOfLetter = rightAnswer.toUpperCase().split('');
        totalRound = arrayOfLetter.length;
        this.TaskElement = TaskTemplate({
          title: 'Собери услышанное слово лопая шарики с нужными буквами в том порядке, в каком они расположены в слове',
          gameWord: arrayOfLetter,
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
