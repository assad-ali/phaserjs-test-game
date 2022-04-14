import './css/theme.css';
import Phaser from 'phaser';
import './js/utils.js';
import Boot from './js/Boot';
import Preloader from './js/Preloader';
import Settings from './js/Settings';
import MainMenu from './js/MainMenu';
import Story from './js/Story';
import Game from './js/Game';

const config = {
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 640,
		height: 960
	},
	physics: {
		default: 'arcade',
		arcade: {
			fps: 60,
			gravity: { y: 200 }
			// debug: true
		}
	},
	scene: [Boot, Preloader, Settings, MainMenu, Story, Game],
	backgroundColor: '#ffffff'
};

const game = new Phaser.Game(config);
window.focus();