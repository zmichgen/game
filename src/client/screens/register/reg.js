/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */

import axios from 'axios';
import regformTemplate from './reg.template.pug';
import './reg.scss';
import {
  User, CALL_TEXT, URL_DB, MAX_HP, NEW_VISIT, GameScreen,
  pushButtonSound,
} from '../../GameState';

import MsgBox from '../../components/messageBox/messageBox';
import LoaderShow from '../../components/loaderShow/loadershow';

function setUser(data) {
  User.name = data.name;
  User.login = data.login;
  User.password = data.password;
  User.score = data.score;
  User.level = data.level;
  User.toys = data.toys;
  User.novice = data.novice || false;
  User.hp = MAX_HP;
}

function startGame() {
  document.getElementById('page-2').innerText = 'Играть';
  document.getElementById('userName').innerText = `${User.name}, ${CALL_TEXT}`;
  const newGame = new GameScreen();
  newGame.render();
}

export default class RegForm {
  constructor() {
    this.element = regformTemplate();
  }

  addUser() {
    pushButtonSound();
    const userData = {};
    userData.password = document.getElementById('inputPasswordr').value;
    userData.login = document.getElementById('inputLoginr').value;
    userData.name = document.getElementById('inputNamer').value;
    if (userData.name === '' || userData.login === '' || userData.password === '') {
      this.msg = new MsgBox('Внимание!', 'Необходимо заполнить все поля...');
      $('#msgBox').modal('show');
    } else {
      document.getElementById('inputPasswordr').value = '';
      document.getElementById('inputLoginr').value = '';
      document.getElementById('inputNamer').value = '';
      userData.score = 0;
      userData.level = 0;
      userData.toys = 0;
      userData.novice = NEW_VISIT;
      this.loadershow = new LoaderShow();
      this.loadershow.show();
      axios.post(`${URL_DB}/add`, userData).then((res) => {
        this.loadershow.hide();
        if (res.data === 'error') {
          this.msg = new MsgBox('Внимание! Что-то пошло не так...', 'Пользователь с таким логином уже существует или нет связи с сервером! Попробуй другой ЛОГИН');
          $('#msgBox').modal('show');
        } else {
          setUser(userData);
          startGame();
        }
      });
    }
  }

  getUser() {
    pushButtonSound();
    User.password = document.getElementById('inputPassworde').value;
    User.login = document.getElementById('inputLogine').value;
    if (User.login === '' || User.password === '') {
      this.msg = new MsgBox('Внимание!', 'Необходимо заполнить все поля...');
      $('#msgBox').modal('show');
    } else {
      document.getElementById('inputPassworde').value = '';
      document.getElementById('inputLogine').value = '';
      this.loadershow = new LoaderShow();
      this.loadershow.show();
      axios.post(`${URL_DB}/login`, User)
        .then((res) => {
          this.loadershow.hide();
          if (res.data) {
            setUser(res.data);
            startGame();
          } else {
            this.msg = new MsgBox('Внимание! Что-то пошло не так...', 'Пользователя с таким логином и паролем нет в базе данных... Вспомни свой ЛОГИН и ПАРОЛЬ');
            $('#msgBox').modal('show');
          }
        });
    }
  }

  render() {
    if (User.name === '') {
      document.getElementById('root').innerHTML = this.element;
      document.getElementById('registerButton').addEventListener('click', this.addUser);
      document.getElementById('inputButton').addEventListener('click', this.getUser);
    } else {
      startGame();
    }
  }
}
