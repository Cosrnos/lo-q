var logType;

module.exports = logType = function() {
	var name = 'internal';
	var prefixText = '';
	var defaultHandler = function() {
		//TODO: Improve this
		console.log.bind(console).apply(this, arguments);
	};

	this.background = -1;
	this.color = -1;
	this.level = 0;
	this.prefix = {
		color: -1,
		background: -1,
		styles: []
	};
	this.styles = [];
	this.handler = function() {
		defaultHandler.apply(this, arguments);
	};

	Object.defineProperty(this, 'name', {
		get: function() {
			return name;
		},

		set: function(value) {
			name = value;
			prefixText = (prefixText === '' ? value : prefixText);
		}
	});

	Object.defineProperty(this.prefix, 'text', {
		get: function() {
			return (prefixText === '' ? name : prefixText);
		},

		set: function(value) {
			prefixText = value;
		}
	});

	Object.defineProperty(this, 'defaultHandler', {
		writable: false,
		value: defaultHandler
	});
};