import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import {
  Navbar, Pages, Landing, Register, Score, FIRST_PAGE,
} from './GameState';

require('webpack-jquery-ui');
require('webpack-jquery-ui/css');

Pages.push(Landing);
Pages.push(Score);
Pages.push(Register);

const navbar = new Navbar(Pages);
const firstPage = new Pages[FIRST_PAGE]();

navbar.render();
firstPage.render();
