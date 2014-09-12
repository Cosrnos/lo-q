var _ = require('underscore');
var logType = require('../logtype.js');

var _types = [];
var _defaults = [];
var _all = [];

var _loadDefaults = function() {
	_loadType('./_loq_bad.js');
	_loadType('./debug.js');
	_loadType('./error.js');
	_loadType('./exception.js');
	_loadType('./info.js');
	_loadType('./object.js');
	_loadType('./warning.js');
};

var _addType = function(typeObj) {
	_types.push(typeObj);
	_rebuildTypes();
};

var _addDefault = function(typeObj) {
	_defaults.push(typeObj);
	_rebuildTypes();
};

var _loadType = function(path) {
	_addType(require(path));
};

var _loadDefault = function(path) {
	_addType(require(path));
};

var _rebuildTypes = function() {
	_all = _types.concat(_defaults);
};

_loadDefaults();

module.exports = {
	applyDefaultTypes: function(logger) {
		_.each(_defaults, function(type) {
			logger.applyType(type);
		});
	},
	applyCustomTypes: function(logger) {
		_.each(_types, function(type) {
			logger.applyType(type);
		});
	},
	applyAllTypes: function(logger) {
		_.each(_all, function(type) {
			logger.applyType(type);
		});
	},
	applyTypes: function(logger) {
		this.applyAllTypes(logger);
	},
	addType: function(typeObj) {
		_addType(typeObj);
	}
};