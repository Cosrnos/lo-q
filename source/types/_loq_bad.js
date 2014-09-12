var _ = require('underscore');

module.exports = {
	name: 'LOQ ERROR',
	level: 4,
	_cmd: ['_loq_bad'],
	prefix: {
		text: 'LOQ INTERNAL',
		color: "15",
		background: "62"
	},
	_setup: function(logger) {
		logger.loq_trace_limit = 10;
	},
	handler: function() {
		var args = Array.prototype.slice.call(arguments);
		var stack = new Error().stack;
		var splitted = stack.split("\n");
		var limit = 0;

		_.each(args, function(arg) {
			if (arg.stack) {
				splitted = arg.stack.split("\n");
			}
		});

		limit = splitted.length - this.loq_trace_limit;
		if (limit > 0) {
			splitted.splice(this.trace_limit - 1, limit);
			splitted[splitted.length - 1] = splitted[splitted.length - 1] + "...";
		}

		stack = splitted.join('\r\n');

		this._log.apply(this, args);
		this._log(stack);
		this._log("Please share this information at [https://github.com/Cosrnos/lo-q]");
	}
};