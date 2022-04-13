SAT.Storage = {
	availability: function() {
		if(!(!(typeof(window.localStorage) === 'undefined'))) {
			console.log('localStorage not available');
			return null;
		}
	},
	get: function(key) {
		this.availability();
		try {
			return JSON.parse(localStorage.getItem(key));
		}
		catch(e) {
			return window.localStorage.getItem(key);
		}
	},
	set: function(key, value) {
		this.availability();
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
		}
		catch(e) {
			if(e == QUOTA_EXCEEDED_ERR) {
				console.log('localStorage quota exceeded');
			}
		}
	},
	initUnset: function(key, value) {
		if(this.get(key) === null) {
			this.set(key, value);
		}
	},
	getFloat: function(key) {
		return parseFloat(this.get(key));
	},
	setHighscore: function(key, value) {
		if(value > this.getFloat(key)) {
			this.set(key, value);
		}
	},
	remove: function(key) {
		this.availability();
		window.localStorage.removeItem(key);
	},
	clear: function() {
		this.availability();
		window.localStorage.clear();
	}
};