import Button from './utils/Button';
window.Button = Button;

import './utils/SFX';
import './utils/Storage';
import './utils/Lang';

SAT.fadeOutIn = function(passedCallback, context) {
	context.cameras.main.fadeOut(250);
	context.time.addEvent({
		delay: 250,
		callback: function() {
			context.cameras.main.fadeIn(250);
			passedCallback(context);
		},
		callbackScope: context
	});
}
SAT.fadeOutScene = function(sceneName, context) {
	context.cameras.main.fadeOut(250);
	context.time.addEvent({
		delay: 250,
		callback: function() {
			context.scene.start(sceneName);
		},
		callbackScope: context
	});
};