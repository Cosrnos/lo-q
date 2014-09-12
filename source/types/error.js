module.exports = {
	name: 'error',
	level: 4,
	_cmd: ['error'],
	prefix: {
		text: 'ERROR',
		color: "196"
	},
	_setup: function(logger) {
		logger.traceLimit = 4;
	},
	handler: function() {
		var args = Array.prototype.slice.call(arguments);
		var stack = new Error().stack;
		var splitted = stack.split("\n");
		var limit = 0;

		splitted.splice(0, 5);
		limit = splitted.length - this.traceLimit;
		if (limit > 0) {
			splitted.splice(this.traceLimit - 1, limit);
			splitted[splitted.length - 1] = splitted[splitted.length - 1] + "...";
		}

		stack = splitted.join('\r\n');

		this._log.apply(this, args);
		this._log(stack);
	}
};