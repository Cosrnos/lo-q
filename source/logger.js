var _ = require('underscore');
var clc = require('cli-color');

var logType = require('./logtype.js');
var config = require('./config.js');

var _defaultLog = console.log.bind(console);
var logger;

/**
 * Exports
 */
logger = function() {
	var self = this;

	this.threshold = 0;
	this.config = new config();
	this._logTypes = [];
	this._log = _defaultLog;
	this.applyType = function(options) {
		var lt = new logType();
		var prefix = _.defaults(_.extend(lt.prefix, options.prefix), options.prefix);

		// There has to be a better way of doing this...
		lt = _.extend(lt, options);
		lt = _.defaults(lt, options);
		lt.prefix = prefix;

		if (!self._logTypes[lt.name]) {
			self._logTypes[lt.name] = lt;
		} else {
			self.warn('A log type that has already been defined cannot be overwritten. Tried overwriting ' + lt.name);
		}

		if (lt.hasOwnProperty('_cmd')) {
			if (typeof lt._cmd === 'string') {
				lt._cmd = [lt._cmd];
			}

			// Add the command(s) to the Logger object
			_.each(lt._cmd, function bind_log_commands(command) {
				self[command] = function custom_log_command() {
					var args = Array.prototype.slice.call(arguments);
					args.unshift(lt);
					_log.apply(self, args);
				};
			});

			delete lt._cmd;
		}

		self._logTypes.push(lt);

		return lt;
	};
};


/**
 * calls the log function manually with a reference of a custom logger and what you want to log
 */
logger.prototype.call = function() {
	_log.apply(this, arguments);
};



/**
 * A collection of all log types without risking overwrite
 */
Object.defineProperty(logger.prototype, 'logType', {
	get: function() {
		return this._logTypes;
	},

	set: function() {
		this.warn("You cannot overwrite the value of the logger.logType global.");
	}
});


/**
 * Default entry. Logs the given params and applies styles as necessary
 */
function _log() {
	try {
		var args = Array.prototype.slice.call(arguments);

		if (args && args[0]) {
			if (args[0] instanceof logType) {
				return _processLogType.apply(this, args);
			}

			_defaultLog.apply(this, args);
		} else {
			this.warn('Cannot call log with empty parameters');
		}
	} catch (ex) {
		this._loq_bad("Lo-Q Internal error: ", ex);
		return this;
	}
};

/**
 * Finds log type info and applies as necessary
 */
function _processLogType() {
	var args = Array.prototype.slice.call(arguments);
	var type = {};
	var prefix = "";

	if (args && args[0]) {
		if (args[0].name) {
			type = args.shift();

			if (type.level < logger.threshold) {
				return;
			}

			if (type.color !== -1) {
				args = _.map(args, function(item) {
					return clc.xterm(parseInt(type.color, 10))(item);
				});
			}

			if (type.background !== -1) {
				args = _.map(args, function(item) {
					return clc.bgXterm(parseInt(type.background, 10))(item);
				});
			}

			if (type.styles.length > 0) {
				_.each(type.styles, function(style) {
					args = _.map(args, function(item) {
						return clc[style](item);
					})
				})
			}

			if (type.prefix.text) {
				prefix = '[' + type.prefix.text + ']';

				if (type.prefix.color !== -1) {
					prefix = clc.xterm(parseInt(type.prefix.color, 10))(prefix);
				}

				if (type.prefix.background !== -1) {
					prefix = clc.bgXterm(parseInt(type.prefix.background, 10))(prefix);
				}

				if (type.prefix.styles.length > 0) {
					_.each(type.prefix.styles, function(style) {
						prefix = clc[style](prefix);
					});
				}

				args.unshift(prefix);
			}

			if (type.handler) {
				type.handler.apply(this, args);
			} else {
				_defaultLog.apply(this, args);
			}
		} else {
			logger.warn('Cannot call _processLogType with non log type first parameter.');
		}
	} else {
		logger.warn('Cannot call _processLogType with empty parameters');
	}

	return logger;
};

module.exports = logger;