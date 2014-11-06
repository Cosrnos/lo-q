var _ = require('underscore');
var clc = require('cli-color');

module.exports = {
	name: 'EXCEPTION',
	level: 4,
	_cmd: ['exception', 'ex'],
	prefix: {
		text: 'EXCEPTION',
		color: "15",
		background: "1"
	},
	_setup: function(logger) {
		logger.loq_trace_limit = 10;
	},
	handler: function() {
		var args = Array.prototype.slice.call(arguments);
		var self = this;
		_.each(args, function(arg) {
			if (arg.stack) {
				logException.bind(self)(arg);
			}
		});
	}
};

function logException(ex) {
	var splitted = ex.stack.split("\n");
	var limit = 0;

	limit = splitted.length - this.loq_trace_limit;

	if (limit > 0) {
		splitted.splice(splitted.length - limit, limit);
		splitted[splitted.length - 1] = splitted[splitted.length - 1] + "...";
	}

	stack = splitted.join('\r\n');

	this._log(clc.bgXterm(1)(clc.xterm(15)(stack)));
}