export default class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    create() {

        let bg = this.add.sprite(0, 0, 'background').setOrigin(0,0);
        bg.alpha = 0.15;

        this.stateStatus = null;
        this._score = 0;
        this._time = 30;
		this._runOnce = false;

        this.initPlayer();
        this.initObjects();
        this.initCollisions();
        this.initUI();
        this.currentTimer = this.time.addEvent({
            delay: 1000,
            callback: function(){
                this._time--;
                this.textTime.setText(SAT.text['gameplay-timeleft']+this._time);
                if(!this._time) {
					SAT.Sfx.music.volume = 0.5;
                    this._runOnce = false;
                    this.stateStatus = 'gameover';
                }else{
                	if (this._time > 1 && this._time <= 3){
                		if(!SAT.Sfx.sounds['countdown'].isPlaying){
							SAT.Sfx.play('countdown');
							SAT.Sfx.music.volume = 0.3;
						}
					}
				}
            },
            callbackScope: this,
            loop: true
        });

        this.cameras.main.fadeIn(250);
        this.stateStatus = 'playing';
    }
	update(time, delta) {
		switch(this.stateStatus) {
			case 'gameover': {
				if(!this._runOnce) {
					this.stateGameover();
					this._runOnce = true;
				}
				break;
			}
			case 'playing': {
				this.statePlaying();
			}
			default: {
			}
		}
	}
	statePlaying() {
        if(this._time === 0) {
            this._runOnce = false;
            this.stateStatus = 'gameover';
        }
	}
	stateGameover() {
		this.currentTimer.paused =! this.currentTimer.paused;
		SAT.Storage.setHighscore('SAT-highscore',this._score);
		SAT.fadeOutIn(function(self){
			self.screenGameoverGroup.toggleVisible();
			self.screenGameoverScore.setText(SAT.text['gameplay-score']+self._score);
			self.gameoverScoreTween();
		}, this);
		this.screenGameoverBack.x = -this.screenGameoverBack.width-20;
		this.tweens.add({targets: this.screenGameoverBack, x: 100, duration: 500, delay: 250, ease: 'Back'});
		this.screenGameoverRestart.x = SAT.world.width+this.screenGameoverRestart.width+20;
		this.tweens.add({targets: this.screenGameoverRestart, x: SAT.world.width-100, duration: 500, delay: 250, ease: 'Back'});
	}
	initPlayer(){

		this.player = this.physics.add.image(SAT.world.width-(SAT.world.width / 2), SAT.world.height-45, 'catcher')
			.setScale(1.25)
			.setVelocity(0)
			.setBounce(20)
			.setGravityY(500)
			.setDepth(3)
			.setCollideWorldBounds(true, 100, 0);

		this.input.setDraggable(this.player.setInteractive());
		this.input.on('dragstart', function (pointer, obj) {
			obj.body.moves = false;
		});

		this.input.on('drag', function (pointer, obj, dragX, dragY) {
			obj.setPosition(dragX, SAT.world.height-45);
		});

		this.input.on('dragend', function (pointer, obj) {
			obj.body.moves = true;
		});
	}
	initObjects(){

		this.objectsGroup = this.physics.add.group().setDepth(2);
		this.bombsGroup = this.physics.add.group().setDepth(2);

		// Drop one edible food immediately when game starts
		let objectXaxis = Math.floor(Math.random() * 850) + 20;
		this.addObject(objectXaxis, -50);

		// continually make objects fall using timer
		this.time.addEvent({
			delay: 200,
			callback: ()=>{
				this.objectDrop();
			},
			callbackScope: this,
			loop: true,
		});

	}
	initCollisions(){

		this.playerColliderObj = this.physics.add.collider(this.player);

		// when player collides with objects, use the addPoints function to disable object and add points
		this.physics.add.overlap(
			this.player,
			this.objectsGroup,
			this.addPoints,
			null,
			this
		);

		// when player collides with bombs, use the removePoints function to disable object and remove points
		this.physics.add.overlap(
			this.player,
			this.bombsGroup,
			this.removePoints,
			null,
			this
		);

	}
    initUI() {
		var fontScore = { font: '38px '+SAT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 5 };
		var fontScoreWhite =  { font: '38px '+SAT.text['FONT'], fill: '#000', stroke: '#ffde00', strokeThickness: 5 };
		this.textScore = this.add.text(SAT.world.width-30, 45, SAT.text['gameplay-score']+this._score, fontScore);
		this.textScore.setOrigin(1,0).setDepth(3);

		this.textScore.y = -this.textScore.height-20;
		this.tweens.add({targets: this.textScore, y: 45, duration: 400, delay: 200, ease: 'Back'});

		this.textTime = this.add.text(30, 45, SAT.text['gameplay-timeleft']+this._time, fontScore).setDepth(3);
		this.textTime.setOrigin(0,1).setDepth(3);

		this.textTime.y = -this.textTime.height-20;
		this.tweens.add({targets: this.textTime, y: 90, duration: 400, ease: 'Back'});

		var fontTitle = { font: '48px '+SAT.text['FONT'], fill: '#000', stroke: '#ffde00', strokeThickness: 10 };

		this.screenGameoverGroup = this.add.group().setDepth(5);

        this.screenGameoverBg = this.add.sprite(0, 0, 'overlay').setDepth(5);
        this.screenGameoverBg.setAlpha(0.95);
        this.screenGameoverBg.setOrigin(0, 0);

		this.screenGameoverText = this.add.text(SAT.world.centerX, 100, SAT.text['gameplay-gameover'], fontTitle).setDepth(6);
		this.screenGameoverText.setOrigin(0.5,0);

		this.screenGameoverBack = new Button(100, SAT.world.height-100, 'button-mainmenu', this.stateBack, this).setDepth(6);
		this.screenGameoverBack.setOrigin(0,1);

		this.screenGameoverRestart = new Button(SAT.world.width-100, SAT.world.height-100, 'button-restart', this.stateRestart, this).setDepth(6);
		this.screenGameoverRestart.setOrigin(1,1);

		this.screenGameoverScore = this.add.text(SAT.world.centerX, 300, SAT.text['gameplay-score']+this._score, fontScoreWhite).setDepth(6);
		this.screenGameoverScore.setOrigin(0.5,0.5);

		this.screenGameoverGroup.add(this.screenGameoverBg);
		this.screenGameoverGroup.add(this.screenGameoverText);
		this.screenGameoverGroup.add(this.screenGameoverBack);
		this.screenGameoverGroup.add(this.screenGameoverRestart);
		this.screenGameoverGroup.add(this.screenGameoverScore);
		this.screenGameoverGroup.toggleVisible();
    }
	objectDrop() {
		if(this._time > 0) {
			let xAxis = Math.floor(Math.random() * 650) + 15;
			let objectOrBomb = Math.floor(Math.random() * 6);
			// create a bomb 50% of the time
			if (objectOrBomb >= 3) {
				this.addBomb(xAxis, -50);
			} else {
				this.addObject(xAxis, -50);
			}
		}
	}
	addObject(x, y) {
		let objects = [
			{name: 'object-barrel', points: 12},
			{name: 'object-chest', points: 24},
			{name: 'object-coin', points: 48},
			{name: 'object-gem', points: 7},
			{name: 'object-heart', points: 15},
			{name: 'object-key', points: 4},
			{name: 'object-leaf', points: 9},
			{name: 'object-potion', points: 1}
		];
		let randomIdx = Math.floor(Math.random() * 8);
		this.objectsGroup
			.create(x, y, objects[randomIdx].name)
			.setScale(0.75)
			.setData({points: objects[randomIdx].points})
			.setVelocity((Phaser.Math.Between(150, 1000), Phaser.Math.Between(-50, 50)));
	}
	addBomb(x, y) {
		let bombs = [
			{name: 'catcher-bomb', points: 10},
			{name: 'catcher-dynamite', points: 5},
			{name: 'catcher-nuke', points: 20}
		];
		let randomIdx = Math.floor(Math.random() * 3);
		this.bombsGroup
			.create(x, y, bombs[randomIdx].name)
			.setScale(0.75)
			.setData({points: bombs[randomIdx].points})
			.setVelocity((Phaser.Math.Between(-500, 500), Phaser.Math.Between(-60, 60)));
	}
    addPoints(player, object) {

		if(this._time === 0) {
			this.physics.world.colliders.destroy();
			return;
		}

		SAT.Sfx.play('coin');

		this._score += object.getData('points');
        this.textScore.setText(SAT.text['gameplay-score']+this._score);

		var posX = this.player.x;
		var posY = this.player.y;

		var pointsMarker = this.add.text(posX, posY, `+${object.getData('points')}`, { font: '38px '+SAT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 10 });
		pointsMarker.setOrigin(0, 0);
        this.tweens.add({targets: pointsMarker, alpha: 0, y: posY-100, duration: 1000, ease: 'Linear'});
		object.disableBody(true, true);
        // this.cameras.main.shake(100, 0.01, true);
    }
	removePoints(player, object) {

		if(this._time === 0) {
			this.physics.world.colliders.destroy();
			return;
		}

		SAT.Sfx.play('explosion');

		this._score -= object.getData('points');
		this.textScore.setText(SAT.text['gameplay-score']+this._score);

		var posX = this.player.x;
		var posY = this.player.y;

		var pointsMarker = this.add.text(posX, posY, `-${object.getData('points')}`, { font: '38px '+SAT.text['FONT'], fill: '#ff4800', stroke: '#000', strokeThickness: 10 });
		pointsMarker.setOrigin(0, 0);
		this.tweens.add({targets: pointsMarker, alpha: 0, y: posY-100, duration: 1000, ease: 'Linear'});

		// Shake and show explosion image
		this.cameras.main.shake(100, 0.01, true);

		let particles = this.add.particles('fire');
		particles.setDepth(4);
		particles.createEmitter({
			alpha: { start: 0.5, end: 0 },
			scale: { start: 0.5, end: 0.75 },
			// tint: { start: 0xff945e, end: 0xff945e },
			speed: 30,
			accelerationY: -50,
			angle: { min: -85, max: -125 },
			rotate: { min: -180, max: 250 },
			lifespan: { min: 1000, max: 1005 },
			blendMode: 'COLOR_BURN',
			frequency: 50,
			maxParticles: 10
		}).startFollow(this.player);

		object.disableBody(true, true);

	}
	stateRestart() {
		SAT.Sfx.play('click');
        SAT.fadeOutScene('Game', this);
	}
	stateBack() {
		SAT.Sfx.play('click');
		SAT.fadeOutScene('MainMenu', this);
	}
	gameoverScoreTween() {
		this.screenGameoverScore.setText(SAT.text['gameplay-score']+'0');
		if(this._score) {
			this.pointsTween = this.tweens.addCounter({
				from: 0, to: this._score, duration: 2000, delay: 250,
				onUpdateScope: this, onCompleteScope: this,
				onUpdate: function(){
					this.screenGameoverScore.setText(SAT.text['gameplay-score']+Math.floor(this.pointsTween.getValue()));
				},
				onComplete: function(){
					var emitter = this.add.particles('particle');
					emitter.setDepth(10);
					emitter.createEmitter({
						x: this.screenGameoverScore.x+30,
						y: this.screenGameoverScore.y,
						speed: { min: -600, max: 600 },
						angle: { min: 0, max: 360 },
						scale: { start: 0.5, end: 3 },
						blendMode: 'ADD',
						active: true,
						lifespan: 2000,
						gravityY: 1000,
						quantity: 250
					}).explode();
				}
			});
		}
	}
};