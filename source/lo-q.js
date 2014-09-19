var _ = require('underscore');

var _logger = require('./logger.js');
var _logtype = require('./logtype.js');
var _style = require('./style.js');
var _loggers = [];

var _types = require('./types/index.js');

var _initializeLogTypes = function(logger) {
	_types.applyTypes(logger);
};

// Initiate logging instance as base loQ

var loQ = new _logger();
_initializeLogTypes(loQ);


loQ.create = function(opts) {
	var newLogger = new _logger();
	_initializeLogTypes(newLogger);

	return _loggers[_loggers.push(_.defaults(newLogger, opts)) - 1];
};

loQ.addCustomType = function(typeObj) {
	_types.addType(typeObj);
	loQ.applyType(typeObj);
};

module.exports = loQ;