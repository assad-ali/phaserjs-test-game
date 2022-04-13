SAT.Sfx = {
	manage: function(type, mode, game, button, label) {
		switch(mode) {
			case 'init': {
				SAT.Storage.initUnset('SAT-'+type, true);
				SAT.Sfx.status = SAT.Sfx.status || [];
				SAT.Sfx.status[type] = SAT.Storage.get('SAT-'+type);
				if(type == 'sound') {
					SAT.Sfx.sounds = [];
					SAT.Sfx.sounds['countdown'] = game.sound.add('countdown');
					SAT.Sfx.sounds['explosion'] = game.sound.add('explosion');
					SAT.Sfx.sounds['click'] = game.sound.add('sound-click');
					SAT.Sfx.sounds['coin'] = game.sound.add('coin');

					SAT.Sfx.sounds['countdown'].volume = 0.6;
					SAT.Sfx.sounds['explosion'].volume = 0.3;
					SAT.Sfx.sounds['coin'].volume = 0.1;
				}
				else { // music
					if(!SAT.Sfx.music || !SAT.Sfx.music.isPlaying) {
						SAT.Sfx.music = game.sound.add('music-theme');
						SAT.Sfx.music.volume = 0.5;
					}
				}
				break;
			}
			case 'on': {
				SAT.Sfx.status[type] = true;
				break;
			}
			case 'off': {
				SAT.Sfx.status[type] = false;
				break;
			}
			case 'switch': {
				SAT.Sfx.status[type] =! SAT.Sfx.status[type];
				break;
			}
			default: {}
		}
		SAT.Sfx.update(type, button, label);

		if(type == 'music' && SAT.Sfx.music) {
			if(SAT.Sfx.status['music']) {
				if(!SAT.Sfx.music.isPlaying) {
					SAT.Sfx.music.play({loop:true});
				}
			}
			else {
				SAT.Sfx.music.stop();
			}
		}

		SAT.Storage.set('SAT-'+type, SAT.Sfx.status[type]);
	},
	play: function(audio) {
		if(audio == 'music') {
			if(SAT.Sfx.status['music'] && SAT.Sfx.music && !SAT.Sfx.music.isPlaying) {
				SAT.Sfx.music.play({loop:true});
			}
		}
		else { // sound
			if(SAT.Sfx.status['sound'] && SAT.Sfx.sounds && SAT.Sfx.sounds[audio]) {
				SAT.Sfx.sounds[audio].play();
			}
		}
	},
	update: function(type, button, label) {
		if(button) {
			if(SAT.Sfx.status[type]) {
				button.setTexture('button-'+type+'-on');
			}
			else {
				button.setTexture('button-'+type+'-off');
			}
		}
		if(label) {
			if(SAT.Sfx.status[type]) {
				label.setText(SAT.Lang.text[SAT.Lang.current][type+'-on']);
			}
			else {
				label.setText(SAT.Lang.text[SAT.Lang.current][type+'-off']);
			}
		}
	}
};