module.exports = {
	name: 'error',
	level: 4,
	_cmd: ['error'],
	prefix: {
		text: 'ERROR',
		color: "196"
	},
	_setup: function(logger) {
		logger.trace_limit = 4;
	},
	handler: function() {
		var args = Array.prototype.slice.call(arguments);
		var stack = new Error().stack;
		var splitted = stack.split("\n");
		var limit = 0;

		splitted.splice(0, 5); // Remove mr bot trace
		limit = splitted.length - logger.trace_limit;
		if (limit > 0) {
			splitted.splice(logger.trace_limit - 1, limit);
			splitted[splitted.length - 1] = splitted[splitted.length - 1] + "...";
		}

		stack = splitted.join('\r\n');

		error_log_type.default_handler.apply(this, args);
		error_log_type.default_handler(stack);
	}
};