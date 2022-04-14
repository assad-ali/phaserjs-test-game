export default class Settings extends Phaser.Scene {
	constructor() {
		super('Settings');
	}
	create() {
		this.add.sprite(0, 0, 'background').setOrigin(0, 0);
		this.screenName = 'settings';
		// this.input.keyboard.on('keydown', this.handleKey, this);

		this.buttonBack = new Button(20, 20, 'button-back', this.clickBack, this);
		this.buttonBack.setOrigin(0, 0);
		this.buttonBack.y = -this.buttonBack.height-20;
		this.tweens.add({targets: this.buttonBack, y: 20, duration: 500, ease: 'Back'});

		var fontTitle = { font: '46px '+SAT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 7, align: 'center' };
		var fontSubtitle = { font: '38px '+SAT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 5, align: 'center' };
		var fontSmall = { font: '28px '+SAT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 4, align: 'center' };
		var titleSettings = this.add.text(SAT.world.centerX, 60, SAT.text['settings'], fontTitle);
		titleSettings.setOrigin(0.5, 0.5);
		var offsetLeft = 130;

		this.buttonSound = new Button(offsetLeft+40, 250, 'button-sound-on', this.clickSound, this);
		this.buttonSound.setOrigin(0.5, 0.5);
		this.textSound = this.add.text(offsetLeft+30+this.buttonSound.width, 250, SAT.text['sound-on'], fontSubtitle);
		this.textSound.setOrigin(0, 0.5);

		this.buttonMusic = new Button(offsetLeft+40, 375, 'button-music-on', this.clickMusic, this);
		this.buttonMusic.setOrigin(0.5, 0.5);
		this.textMusic = this.add.text(offsetLeft+30+this.buttonMusic.width, 375, SAT.text['music-on'], fontSubtitle);
		this.textMusic.setOrigin(0, 0.5);

		// this.buttonCredits = new Button(offsetLeft+40, 500, 'button-credits', this.clickCredits, this);
		// this.buttonCredits.setOrigin(0.5, 0.5);
		// this.textCredits = this.add.text(offsetLeft+30+this.buttonCredits.width, 500, SAT.text['credits'], fontSubtitle);
		// this.textCredits.setOrigin(0, 0.5);

		// this.bannerBeer = new Button(SAT.world.centerX, SAT.world.height-60, 'banner-beer', this.clickBeer, this, 'static');
		// this.bannerBeer.setOrigin(0.5, 1);

		// if(document.monetization && document.monetization.state === 'started') {
		// 	this.bannerBeer.destroy();
		// 	this.add.text(SAT.world.centerX, SAT.world.height-60, 'Thank you\nfor supporting SAT!', fontSubtitle).setOrigin(0.5, 1);
		// }

		// if(document.monetization) {
		// 	if(document.monetization.state === 'started') {
		// 		if(this.bannerBeer) {
		// 			this.bannerBeer.destroy();
		// 		}
		// 		this.add.text(SAT.world.centerX, SAT.world.height-60, 'Thank you\nfor supporting SAT\nwith Web Monetization!', fontSubtitle).setOrigin(0.5, 1);
		// 	} else {
		// 		document.monetization.addEventListener('monetizationstart', function(event) {
		// 			if(this.bannerBeer) {
		// 				this.bannerBeer.destroy();
		// 			}
		// 			this.add.text(SAT.world.centerX, SAT.world.height-60, 'Thank you\nfor supporting SAT\nwith Web Monetization!', fontSubtitle).setOrigin(0.5, 1);
		// 		}, this);
		// 	}
		// }

		SAT.Sfx.update('sound', this.buttonSound, this.textSound);
		SAT.Sfx.update('music', this.buttonMusic, this.textMusic);

		this.buttonSound.setScale(0.5);
		this.tweens.add({targets: this.buttonSound, scaleX: 1, scaleY: 1, duration: 500, delay: 0, ease: 'Cubic.easeOut' });
		this.textSound.setScale(0.5);
		this.tweens.add({targets: this.textSound, scaleX: 1, scaleY: 1, duration: 500, delay: 0, ease: 'Cubic.easeOut' });
		this.buttonMusic.setScale(0.5);
		this.tweens.add({targets: this.buttonMusic, scaleX: 1, scaleY: 1, duration: 500, delay: 250, ease: 'Cubic.easeOut' });
		this.textMusic.setScale(0.5);
		this.tweens.add({targets: this.textMusic, scaleX: 1, scaleY: 1, duration: 500, delay: 250, ease: 'Cubic.easeOut' });

		// this.buttonCredits.setScale(0.5);
		// this.tweens.add({targets: this.buttonCredits, scaleX: 1, scaleY: 1, duration: 500, delay: 500, ease: 'Cubic.easeOut' });
		//
		// this.textCredits.setScale(0.5);
		// this.tweens.add({targets: this.textCredits, scaleX: 1, scaleY: 1, duration: 500, delay: 500, ease: 'Cubic.easeOut' });

		// if(this.sys.game.device.os.desktop) {
		// 	this.helpText = this.add.text(SAT.world.centerX, SAT.world.height-250, SAT.text['keyboard-info'], fontSmall);
		// 	this.helpText.setOrigin(0.5,1);
		// 	this.helpText.setScale(0.5);
		// 	this.tweens.add({targets: this.helpText, scaleX: 1, scaleY: 1, duration: 500, delay: 750, ease: 'Cubic.easeOut' });
		// }

		// var offsetTopCredits = 20;
		// var offsetTopCrew = 550;
		// this.containerCredits = this.add.container(0, SAT.world.height);
		// var creditsBg = this.add.sprite(0, 0, 'background');
		// creditsBg.setOrigin(0, 0);
		// var creditsBack = new Button(20, 20, 'button-back', function(){this.clickBack('credits');}, this);
		// creditsBack.setOrigin(0, 0);

		// var titleCredits = this.add.text(SAT.world.centerX, offsetTopCredits+40, SAT.text['credits'], fontTitle);
		// titleCredits.setOrigin(0.5);
		// var titleCreditsText = this.add.text(SAT.world.centerX, offsetTopCredits+170, SAT.text['madeby'], fontSubtitle);
		// titleCreditsText.setOrigin(0.5,0);
		// var titleCreditsLogo = new Button(SAT.world.centerX, offsetTopCredits+270, 'logo-enclave', this.clickEnclave, this, 'noframes');
		// titleCreditsLogo.setOrigin(0.5,0);
		// var titleCreditsUrl = this.add.text(SAT.world.centerX, offsetTopCredits+400, 'enclavegames.com', fontSubtitle);
		// titleCreditsUrl.setOrigin(0.5,0);
		// titleCreditsUrl.setInteractive({ useHandCursor: true });
		// titleCreditsUrl.on('pointerdown', function() { this.clickEnclave(); }, this);

		// var titleCrew = this.add.text(SAT.world.centerX, offsetTopCrew, SAT.text['team'], fontSubtitle);
		// titleCrew.setOrigin(0.5,0);
		// var titleCrewAndrzej = this.add.text(SAT.world.centerX, offsetTopCrew+80, 'Andrzej Mazur - '+SAT.text['coding'], fontSubtitle);
		// titleCrewAndrzej.setOrigin(0.5,0);
		// var titleCrewEwa = this.add.text(SAT.world.centerX, offsetTopCrew+140, 'Ewa Mazur - '+SAT.text['design'], fontSubtitle);
		// titleCrewEwa.setOrigin(0.5,0);
		// var titleCrewKasia = this.add.text(SAT.world.centerX, offsetTopCrew+200, 'Kasia Mazur - '+SAT.text['testing'], fontSubtitle);
		// titleCrewKasia.setOrigin(0.5,0);
		// var titleCreditsMusic = this.add.text(SAT.world.centerX, offsetTopCrew+320, SAT.text['musicby']+' Bensound', fontSubtitle);
		// titleCreditsMusic.setOrigin(0.5,0);

		// this.containerCredits.add([creditsBg,creditsBack,titleCredits,titleCreditsText,titleCreditsLogo,titleCreditsUrl]);
		// this.containerCredits.add([titleCrew,titleCrewAndrzej,titleCrewEwa,titleCrewKasia,titleCreditsMusic]);

		// this.containerKeyboard = this.add.container();
		// this.containerKeyboard.y = SAT.world.height;

		// var offsetTopKeyboard = 20;
		// var keyboardBg = this.add.sprite(0, 0, 'background');
		// keyboardBg.setOrigin(0,0);
		// var titleKeyboard = this.add.text(SAT.world.centerX, offsetTopKeyboard+40, SAT.text['key-title'], fontTitle);
		// titleKeyboard.setOrigin(0.5);
		// var titleKeySettingsTitle = this.add.text(SAT.world.centerX, offsetTopKeyboard+90, SAT.text['key-settings-title'], fontSubtitle);
		// titleKeySettingsTitle.setOrigin(0.5,0);
		// var titleKeySettings = this.add.text(SAT.world.centerX, offsetTopKeyboard+140, SAT.text['key-settings-onoff'], fontSmall);
		// titleKeySettings.setOrigin(0.5,0);
		// var titleKeyAudio = this.add.text(SAT.world.centerX, offsetTopKeyboard+180, SAT.text['key-audio'], fontSmall);
		// titleKeyAudio.setOrigin(0.5,0);
		// var titleKeyMusic = this.add.text(SAT.world.centerX, offsetTopKeyboard+220, SAT.text['key-music'], fontSmall);
		// titleKeyMusic.setOrigin(0.5,0);
		// var titleKeyCredits = this.add.text(SAT.world.centerX, offsetTopKeyboard+260, SAT.text['key-credits'], fontSmall);
		// titleKeyCredits.setOrigin(0.5,0);
		// var titleKeyKeyboard = this.add.text(SAT.world.centerX, offsetTopKeyboard+300, SAT.text['key-shortcuts'], fontSmall);
		// titleKeyKeyboard.setOrigin(0.5,0);
		//
		// var titleKeyMenuTitle = this.add.text(SAT.world.centerX, offsetTopKeyboard+350, SAT.text['key-menu'], fontSubtitle);
		// titleKeyMenuTitle.setOrigin(0.5,0);
		// var titleKeySettings2 = this.add.text(SAT.world.centerX, offsetTopKeyboard+400, SAT.text['key-settings-onoff'], fontSmall);
		// titleKeySettings2.setOrigin(0.5,0);
		// var titleKeyStart = this.add.text(SAT.world.centerX, offsetTopKeyboard+440, SAT.text['key-start'], fontSmall);
		// titleKeyStart.setOrigin(0.5,0);
		//
		// var titleKeyGameTitle = this.add.text(SAT.world.centerX, offsetTopKeyboard+490, SAT.text['key-gameplay'], fontSubtitle);
		// titleKeyGameTitle.setOrigin(0.5,0);
		// var titleKeyButton = this.add.text(SAT.world.centerX, offsetTopKeyboard+540, SAT.text['key-button'], fontSmall);
		// titleKeyButton.setOrigin(0.5,0);
		// var titleKeyPause = this.add.text(SAT.world.centerX, offsetTopKeyboard+580, SAT.text['key-pause'], fontSmall);
		// titleKeyPause.setOrigin(0.5,0);
		//
		// var titleKeyPauseTitle = this.add.text(SAT.world.centerX, offsetTopKeyboard+630, SAT.text['key-pause-title'], fontSubtitle);
		// titleKeyPauseTitle.setOrigin(0.5,0);
		// var titleKeyBack = this.add.text(SAT.world.centerX, offsetTopKeyboard+680, SAT.text['key-back'], fontSmall);
		// titleKeyBack.setOrigin(0.5,0);
		// var titleKeyRestart = this.add.text(SAT.world.centerX, offsetTopKeyboard+720, SAT.text['key-return'], fontSmall);
		// titleKeyRestart.setOrigin(0.5,0);
		//
		// var titleKeyOverTitle = this.add.text(SAT.world.centerX, offsetTopKeyboard+770, SAT.text['key-gameover'], fontSubtitle);
		// titleKeyOverTitle.setOrigin(0.5,0);
		// var titleKeyBack2 = this.add.text(SAT.world.centerX, offsetTopKeyboard+820, SAT.text['key-back'], fontSmall);
		// titleKeyBack2.setOrigin(0.5,0);
		// var titleKeyRestart2 = this.add.text(SAT.world.centerX, offsetTopKeyboard+860, SAT.text['key-try'], fontSmall);
		// titleKeyRestart2.setOrigin(0.5,0);
		//
		// this.containerKeyboard.add([keyboardBg,titleKeyboard,titleKeySettingsTitle,titleKeySettings]);
		// this.containerKeyboard.add([titleKeyAudio,titleKeyMusic,titleKeyCredits,titleKeyKeyboard]);
		// this.containerKeyboard.add([titleKeyMenuTitle,titleKeySettings2,titleKeyStart,titleKeyGameTitle]);
		// this.containerKeyboard.add([titleKeyButton,titleKeyPause,titleKeyPauseTitle,titleKeyBack]);
		// this.containerKeyboard.add([titleKeyRestart,titleKeyOverTitle,titleKeyBack2,titleKeyRestart2]);

		this.cameras.main.fadeIn(250);
	}
	// handleKey(e) {
	// 	switch(e.code) {
	// 		case 'KeyA': {
	// 			this.clickSound();
	// 			break;
	// 		}
	// 		case 'KeyM': {
	// 			this.clickMusic();
	// 			break;
	// 		}
	// 		case 'KeyC': {
	// 			if(this.screenName == 'settings') {
	// 				this.clickCredits();
	// 			}
	// 			else { // this.screenName == 'credits'
	// 				this.clickBack('credits');
	// 			}
	// 			break;
	// 		}
	// 		case 'KeyS': {
	// 			this.clickBack();
	// 			break;
	// 		}
	// 		case 'KeyK': {
	// 			if(this.screenName == 'settings') {
	// 				this.clickKeyboard();
	// 			}
	// 			else { // this.screenName == 'keyboard'
	// 				this.clickBack('keyboard');
	// 			}
	// 			break;
	// 		}
	// 		default: {}
	// 	}
	// }
	clickSound() {
		SAT.Sfx.play('click');
		SAT.Sfx.manage('sound', 'switch', this, this.buttonSound, this.textSound);
	}
	clickMusic() {
		SAT.Sfx.play('click');
		SAT.Sfx.manage('music', 'switch', this, this.buttonMusic, this.textMusic);
	}
	// clickCredits() {
	// 	SAT.Sfx.play('click');
	// 	this.tweens.add({targets: this.containerCredits, y: 0, duration: 750, ease: 'Cubic.easeOut' });
	//
	// 	this.buttonBack.input.enabled = false;
	// 	this.buttonSound.input.enabled = false;
	// 	this.buttonMusic.input.enabled = false;
	// 	this.buttonCredits.input.enabled = false;
	// 	if(this.bannerBeer && this.bannerBeer.input) {
	// 		this.bannerBeer.input.enabled = false;
	// 	}
	// 	this.screenName = 'credits';
	// }
	// clickBeer() {
	// 	console.log('Beer clicked!');
	// 	SAT.Sfx.play('click');
	// 	window.top.location.href = 'https://www.paypal.me/end3r';
	// }
	// clickKeyboard() {
	// 	SAT.Sfx.play('click');
	// 	this.tweens.add({targets: this.containerKeyboard, y: 0, duration: 750, ease: 'Cubic.easeOut' });
	//
	// 	this.buttonBack.input.enabled = false;
	// 	this.buttonSound.input.enabled = false;
	// 	this.buttonMusic.input.enabled = false;
	// 	this.buttonCredits.input.enabled = false;
	// 	if(this.bannerBeer && this.bannerBeer.input) {
	// 		this.bannerBeer.input.enabled = false;
	// 	}
	// 	this.screenName = 'keyboard';
	// }
	clickBack(name) {
		SAT.Sfx.play('click');
		if(name) {
			this.buttonBack.input.enabled = true;
			this.buttonSound.input.enabled = true;
			this.buttonMusic.input.enabled = true;
			// this.buttonCredits.input.enabled = true;
			// if(this.bannerBeer && this.bannerBeer.input) {
			// 	this.bannerBeer.input.enabled = true;
			// }
			// if(name == 'credits') {
			// 	this.tweens.add({targets: this.containerCredits, y: SAT.world.height, duration: 750, ease: 'Cubic.easeIn' });
			// }
			// else if(name == 'keyboard') {
			// 	this.tweens.add({targets: this.containerKeyboard, y: SAT.world.height, duration: 750, ease: 'Cubic.easeIn' });
			// }
			this.screenName = 'settings';
		}
		else {
			SAT.fadeOutScene('MainMenu', this);
		}
	}
	// clickEnclave() {
	// 	SAT.Sfx.play('click');
	// 	window.top.location.href = 'https://enclavegames.com/';
	// }
};