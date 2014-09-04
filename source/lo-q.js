var _ = require('underscore');

var _logger = require('./logger.js');
var _logtype = require('./logtype.js');
var _style = require('./style.js');

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

	return _.defaults(newLogger, opts);
};

module.exports = loQ;