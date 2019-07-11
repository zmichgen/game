/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
import navbar from './navbarTemplate.pug';
import './navbar.scss';
import { Sound, menuItems, pushButtonSound } from '../../GameState';

function SoundEffectToggle() {
  if (Sound.effect) {
    Sound.effect = false;
    document.getElementById('page-3').innerText = 'Звук : выкл';
  } else {
    Sound.effect = true;
    document.getElementById('page-3').innerText = 'Звук : вкл';
  }
}

let Pages = [];

export default class NavBar {
  constructor(_pages) {
    const menuItem4 = Sound.effect ? 'Звук : вкл' : 'Звук : выкл';
    menuItems.push(menuItem4);
    this.menuItems = menuItems.slice();
    Pages = _pages.slice();
  }

  pageSwitch(event) {
    if (event.target.type === 'button') {
      if (event.target.id.split('-')[1] < 3) {
        pushButtonSound();
        const indexOfPage = event.target.id.split('-')[1];
        this.page = new Pages[indexOfPage]();
        this.page.render();
      } else {
        SoundEffectToggle();
      }
    }
  }

  disable() {
    document.querySelectorAll('.menubtn').forEach((item) => {
      if (item.id.split('-')[1] !== '3') {
        item.classList.add('disabled');
        item.setAttribute('disabled', 'disabled');
      }
    });
  }

  enable() {
    document.querySelectorAll('.menubtn').forEach((item) => {
      item.classList.remove('disabled');
      item.removeAttribute('disabled');
    });
  }

  render() {
    const element = document.querySelector('#nav');
    element.innerHTML = navbar({ items: this.menuItems });
    element.disable = this.disable;
    element.enable = this.enable;
    document.querySelector('nav').addEventListener('click', this.pageSwitch);
  }
}
