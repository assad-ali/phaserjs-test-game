export default class Boot extends Phaser.Scene {
	constructor() {
		super('Boot');
	}
	preload() {
		this.load.image('background', './img/background.png');
		this.load.image('logo-brand', './img/logo-brand.png');
		this.load.image('loading-background', './img/loading-background.png');
	}
	create() {
		SAT.world = {
			width: this.cameras.main.width,
			height: this.cameras.main.height,
			centerX: this.cameras.main.centerX,
			centerY: this.cameras.main.centerY
		};
		SAT.Lang.updateLanguage('en');
		SAT.text = SAT.Lang.text[SAT.Lang.current];
		this.scene.start('Preloader');
	}
}