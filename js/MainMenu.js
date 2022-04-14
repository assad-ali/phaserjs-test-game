export default class MainMenu extends Phaser.Scene
{
	constructor() {
		super('MainMenu');
		this.bgFilesLoaded = false;
	}
	create() {

		let bg = this.add.sprite(0, 0, 'background').setOrigin(0,0);
		// bg.alpha = 0.25;

		// SAT.Storage.initUnset('SAT-highscore', 0);
		// var highscore = SAT.Storage.get('SAT-highscore');

		this.waitingForSettings = false;

		var title = this.add.sprite(SAT.world.centerX, SAT.world.centerY-50, 'title');
		title.setOrigin(0.5);

		this.input.keyboard.on('keydown', this.handleKey, this);

		this.tweens.add({targets: title, angle: title.angle-2, duration: 1000, ease: 'Sine.easeInOut' });
		this.tweens.add({targets: title, angle: title.angle+4, duration: 2000, ease: 'Sine.easeInOut', yoyo: 1, loop: -1, delay: 1000 });

		this.buttonSettings = new Button(20, 20, 'button-settings', this.clickSettings, this);
		this.buttonSettings.setOrigin(0, 0);

		// var buttonBrand = new Button(20, SAT.world.height-40, 'logo-brand', this.clickBrand, this, 'static');
		// buttonBrand.setOrigin(0, 1);

		this.buttonStart = new Button(SAT.world.width-20, SAT.world.height-20, 'button-start', this.clickStart, this);
		this.buttonStart.setOrigin(1, 1);

		// var fontHighscore = { font: '38px '+SAT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 5 };
		// var textHighscore = this.add.text(SAT.world.width-30, 60, SAT.text['menu-highscore']+highscore, fontHighscore);
		// textHighscore.setOrigin(1, 0);

		this.buttonStart.x = SAT.world.width+this.buttonStart.width+20;
		this.tweens.add({targets: this.buttonStart, x: SAT.world.width-20, duration: 500, ease: 'Back'});

		// buttonBrand.x = -buttonBrand.width-20;
		// this.tweens.add({targets: buttonBrand, x: 20, duration: 500, ease: 'Back'});

		this.buttonSettings.y = -this.buttonSettings.height-20;
		this.tweens.add({targets: this.buttonSettings, y: 20, duration: 500, ease: 'Back'});

		// textHighscore.y = -textHighscore.height-30;
		// this.tweens.add({targets: textHighscore, y: 40, duration: 500, delay: 100, ease: 'Back'});

		this.cameras.main.fadeIn(250);

		if(!this.bgFilesLoaded) {
			this.time.addEvent({
				delay: 500,
				callback: function() {
					this.startPreloadInTheBackground();
				},
				callbackScope: this
			}, this);
		}
	}
	handleKey(e) {
		switch(e.code) {
			case 'KeyS': {
				this.clickSettings();
				break;
			}
			case 'Enter': {
				this.clickStart();
				break;
			}
			default: {}
		}
	}
	// clickBrand() {
	// 	SAT.Sfx.play('click');
	// 	window.top.location.href = 'https://satellite.co.nz/';
	// }
	clickSettings() {
		if(this.bgFilesLoaded) {
			SAT.Sfx.play('click');
			if(this.loadImage) {
				this.loadImage.destroy();
			}
			SAT.fadeOutScene('Settings', this);
		}
		else {
			var animationFrames = this.anims.generateFrameNumbers('loader');
			animationFrames.pop();
			this.waitingForSettings = true;
			this.buttonSettings.setAlpha(0.1);
			var loadAnimation = this.anims.create({
				key: 'loading',
				frames: animationFrames,
				frameRate: 12,
				repeat: -1
			});
			this.loadImage = this.add.sprite(30, 30, 'loader').setOrigin(0,0).setScale(1.25);
			this.loadImage.play('loading');
		}
	}
	clickStart() {
		if(this.bgFilesLoaded) {
			SAT.Sfx.play('click');
			if(this.loadImage) {
				this.loadImage.destroy();
			}
			SAT.fadeOutScene('Game', this);
		}
		else {
			var animationFrames = this.anims.generateFrameNumbers('loader');
			animationFrames.pop();
			this.waitingForStart = true;
			this.buttonStart.setAlpha(0.1);
			var loadAnimation = this.anims.create({
				key: 'loading',
				frames: animationFrames,
				frameRate: 12,
				repeat: -1
			});
			this.loadImage = this.add.sprite(SAT.world.width-85, SAT.world.height-85, 'loader').setOrigin(1,1).setScale(1.25);
			this.loadImage.play('loading');
		}
	}
	startPreloadInTheBackground() {
		console.log('[SAT] Starting background loading...');
		this.load.image('./img/clickme');
		this.load.once('filecomplete', this.addFiles, this);
		this.load.start();
	}
	addFiles() {
		var resources = {
			'image': [
				['catcher', './img/catcher.png'],
				['catcher-bomb', './img/catcher-bomb.png'],
				['catcher-dynamite', './img/catcher-dynamite.png'],
				['catcher-nuke', './img/catcher-nuke.png'],
				['catcher-explosion', './img/catcher-explosion.png'],
				['object-barrel', './img/object-barrel.png'],
				['object-chest', './img/object-chest.png'],
				['object-coin', './img/object-coin.png'],
				['object-gem', './img/object-gem.png'],
				['object-heart', './img/object-heart.png'],
				['object-key', './img/object-key.png'],
				['object-leaf', './img/object-leaf.png'],
				['object-potion', './img/object-potion.png'],
				['clickme', './img/clickme.png'],
				['overlay', './img/overlay.png'],
				['fire', './img/fire.png'],
				['particle', './img/particle.png'],
			],
			'spritesheet': [
				['button-continue', './img/button-continue.png', {frameWidth:180,frameHeight:180}],
				['button-mainmenu', './img/button-mainmenu.png', {frameWidth:180,frameHeight:180}],
				['button-restart', './img/button-tryagain.png', {frameWidth:180,frameHeight:180}],
				['button-achievements', './img/button-achievements.png', {frameWidth:110,frameHeight:110}],
				['button-pause', './img/button-pause.png', {frameWidth:80,frameHeight:80}],
				['button-credits', './img/button-credits.png', {frameWidth:80,frameHeight:80}],
				['button-sound-on', './img/button-sound-on.png', {frameWidth:80,frameHeight:80}],
				['button-sound-off', './img/button-sound-off.png', {frameWidth:80,frameHeight:80}],
				['button-music-on', './img/button-music-on.png', {frameWidth:80,frameHeight:80}],
				['button-music-off', './img/button-music-off.png', {frameWidth:80,frameHeight:80}],
				['button-back', './img/button-back.png', {frameWidth:70,frameHeight:70}]
			],
			'audio': [
				['coin', ['./sfx/coin.m4a','./sfx/coin.mp3','./sfx/coin.ogg']],
				['explosion', ['./sfx/explosion.m4a','./sfx/explosion.mp3','./sfx/explosion.ogg']],
				['countdown', ['./sfx/countdown.m4a','./sfx/countdown.mp3','./sfx/countdown.ogg']],
				['sound-click', ['./sfx/audio-button.m4a','./sfx/audio-button.mp3','./sfx/audio-button.ogg']],
				['music-theme', ['./sfx/music-bitsnbites-liver.m4a','./sfx/music-bitsnbites-liver.mp3','./sfx/music-bitsnbites-liver.ogg']]
			]
		};
		for(var method in resources) {
			resources[method].forEach(function(args) {
				var loader = this.load[method];
				loader && loader.apply(this.load, args);
			}, this);
		};
		this.load.on('complete', function(){
			console.log('[SAT] All files loaded in the background.');
			this.bgFilesLoaded = true;
			SAT.Sfx.manage('music', 'init', this);
			SAT.Sfx.manage('sound', 'init', this);
			if(this.waitingForSettings) {
				this.clickSettings();
			}
			if(this.waitingForStart) {
				this.clickStart();
			}
		}, this);
	}
}