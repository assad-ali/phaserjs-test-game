export default class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }
    preload() {
		// this.add.sprite(0, 0, 'background').setOrigin(0, 0);

		// this.stage.backgroundColor = "#fffff";
		let bg = this.add.sprite(0, 0, 'background').setOrigin(0,0);
		// bg.alpha = 0.25;


        // var logoBrand = this.add.sprite(SAT.world.centerX, SAT.world.centerY-100, 'logo-brand');
		// logoBrand.setOrigin(0.5, 0.5);
		var loadingBg = this.add.sprite(SAT.world.centerX, SAT.world.centerY+100, 'loading-background');
		loadingBg.setOrigin(0.5, 0.5);

		var progress = this.add.graphics();
		this.load.on('progress', function (value) {
			progress.clear();
			progress.fillStyle(0xffde00, 1);
			progress.fillRect(loadingBg.x-(loadingBg.width*0.5)+20, loadingBg.y-(loadingBg.height*0.5)+10, 540 * value, 25);
		});

		var resources = {
			'image': [
				['title', 'img/title.png']
			],
			'spritesheet': [
				['button-start', 'img/button-start.png', {frameWidth:180,frameHeight:180}],
				// ['button-settings', 'img/button-settings.png', {frameWidth:80,frameHeight:80}],
				['loader', 'img/loader.png', {frameWidth:45,frameHeight:45}]
			]
		};
		for(var method in resources) {
			resources[method].forEach(function(args) {
				var loader = this.load[method];
				loader && loader.apply(this.load, args);
			}, this);
		};
    }
    create() {
		SAT.fadeOutScene('MainMenu', this);
	}
}