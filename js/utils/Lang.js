SAT.Lang = {
	current: 'en',
	options: ['en', 'pl'],
	parseQueryString: function(query) {
		var vars = query.split('&');
		var query_string = {};
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');
			if (typeof query_string[pair[0]] === 'undefined') {
				query_string[pair[0]] = decodeURIComponent(pair[1]);
			} else if (typeof query_string[pair[0]] === 'string') {
				var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
				query_string[pair[0]] = arr;
			} else {
				query_string[pair[0]].push(decodeURIComponent(pair[1]));
			}
		}
		return query_string;
	},
	updateLanguage: function(lang) {
		var query = window.location.search.substring(1);
		var qs = SAT.Lang.parseQueryString(query);
		if(qs && qs['lang']) {
			console.log('LANG: '+qs['lang']);
			SAT.Lang.current = qs['lang'];
		} else {
			if(lang) {
				SAT.Lang.current = lang;
			}
			else {
				SAT.Lang.current = navigator.language;
			}
		}
		if(SAT.Lang.options.indexOf(SAT.Lang.current) == -1) {
			SAT.Lang.current = 'en';
		}
	},
	text: {
		'en': {
			'FONT': 'Berlin',
			'settings': 'SETTINGS',
			'sound-on': 'Sound: ON',
			'sound-off': 'Sound: OFF',
			'music-on': 'Music: ON',
			'music-off': 'Music: OFF',
			'keyboard-info': 'Press K for keyboard shortcuts',
			'credits': 'CREDITS',
			'madeby': 'SAT made by',
			'team': 'THE TEAM',
			'coding': 'coding',
			'design': 'design',
			'testing': 'testing',
			'musicby': 'Music by',
			'key-title': 'KEYBOARD SHORTCUTS',
			'key-settings-title': 'Settings',
			'key-settings-onoff': 'S - show/hide settings',
			'key-audio': 'A - turn sound on/off',
			'key-music': 'M - turn music on/off',
			'key-credits': 'C - show/hide credits',
			'key-shortcuts': 'K - show/hide keyboard shortcuts',
			'key-menu': 'Main menu',
			'key-start': 'Enter - start game',
			'key-continue': 'Enter - continue',
			'key-gameplay': 'Gameplay',
			'key-button': 'Enter - activate CLICK ME button',
			'key-pause': 'P - turn pause screen on/off',
			'key-pause-title': 'Pause screen',
			'key-back': 'B - back to main menu',
			'key-return': 'P - return to the game',
			'key-gameover': 'Game over screen',
			'key-try': 'T - try again',
			'gameplay-score': 'Score: ',
			'gameplay-timeleft': 'Time left: ',
			'gameplay-paused': 'PAUSED',
			'gameplay-gameover': 'GAME OVER',
			'menu-highscore': 'Highscore: ',
			'screen-story-howto': 'Story / how to play\nscreen'
		},
		'pl': {
			'FONT': 'Arial',
			'settings': 'USTAWIENIA',
			'sound-on': 'D??wi??k: W??.',
			'sound-off': 'D??wi??k: WY??.',
			'music-on': 'Muzyka: W??.',
			'music-off': 'Muzyka: WY??.',
			'keyboard-info': 'Wci??nij K by zobaczy?? skr??ty klawiszowe',
			'credits': 'AUTORZY',
			'madeby': 'SAT stworzone przez',
			'team': 'ZESP????',
			'coding': 'kodowanie',
			'design': 'grafika',
			'testing': 'testowanie',
			'musicby': 'Muzyka autorstwa',
			'key-title': 'SKR??TY KLAWISZOWE',
			'key-settings-title': 'Ustawienia',
			'key-settings-onoff': 'S - poka??/ukryj ustawienia',
			'key-audio': 'A - w????cz/wy????cz d??wi??k',
			'key-music': 'M - w????cz/wy????cz muzyk??',
			'key-credits': 'C - poka??/ukryj autor??w',
			'key-shortcuts': 'K - poka??/ukryj skr??ty klawiszowe',
			'key-menu': 'Menu g????wne',
			'key-start': 'Enter - zacznij gr??',
			'key-continue': 'Enter - kontynuuj',
			'key-gameplay': 'Rozgrywka',
			'key-button': 'Enter - aktywuj przycisk CLICK ME',
			'key-pause': 'P - w????cz/wy????cz pauz??',
			'key-pause-title': 'Ekran pauzy',
			'key-back': 'B - powr??t do menu g????wnego',
			'key-return': 'P - powr??t do gry',
			'key-gameover': 'Ekran ko??ca gry',
			'key-try': 'T - spr??buj ponownie',
			'gameplay-score': 'Wynik: ',
			'gameplay-timeleft': 'Pozosta??y czas: ',
			'gameplay-paused': 'PAUZA',
			'gameplay-gameover': 'KONIEC GRY',
			'menu-highscore': 'Rekord: ',
			'screen-story-howto': 'Ekran fabu??y / jak gra??'
		}
	}
};