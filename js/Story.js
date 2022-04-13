export default class Story extends Phaser.Scene {
    constructor() {
        super('Story');
    }
    create() {

		var fontStory = { font: '48px '+SAT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 7, align: 'center' };
		var textStory = this.add.text(SAT.world.centerX, 200, SAT.text['screen-story-howto'], fontStory);
		textStory.setOrigin(0.5,0);

		var buttonContinue = new Button(SAT.world.width-20, SAT.world.height-20, 'button-continue', this.clickContinue, this);
		buttonContinue.setOrigin(1,1);

		buttonContinue.x = SAT.world.width+buttonContinue.width+20;
		this.tweens.add({targets: buttonContinue, x: SAT.world.width-20, duration: 500, ease: 'Back'});

		this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		this.keyEnter.on('down', function(key, event) { this.clickContinue(); }, this);

		this.cameras.main.fadeIn(250, 0, 0, 0);
	}
	clickContinue() {
		SAT.Sfx.play('click');
		SAT.fadeOutScene('Game', this);
	}
};