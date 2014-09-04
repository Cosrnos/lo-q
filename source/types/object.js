var _ = require('underscore');

module.exports = {
	name: 'object',
	level: 999,
	_cmd: ['object'],
	prefix: {
		text: 'OBJECT',
		color: '232',
		background: '231'
	},
	handler: function() {
		var args = Array.prototype.slice.call(arguments);
		// We don't need the prefix
		args.shift();
		_.each(args, log_object);
	}
};

function log_object(obj, level) {
	level = level || 1;

	if (level === 1) {
		object_log_type.default_handler('{');
	}
	if (_.isObject(obj)) {
		_.each(obj, function(value, key) {
			var toLog = "";
			for (var i = 0; i < level; i++) {
				toLog += "  ";
			}
			toLog += clc.xterm(logger.config.colors.object.key)(key) + " : ";
			if (_.isArray(value)) {
				toLog += "[";
				object_log_type.default_handler(toLog);
				log_array(value, level + 1);
				toLog = "";
				for (var i = 0; i < level; i++) {
					toLog += "  ";
				}
				toLog += "]"
			} else if (_.isString(value)) {
				toLog += '"' + clc.xterm(logger.config.colors.string)(value) + '",';
			} else if (_.isObject(value)) {
				object_log_type.default_handler(toLog);
				log_object(value, level + 1);
				toLog = "";
				for (var i = 0; i < level; i++) {
					toLog += "  ";
				}
			} else {
				toLog += clc.xterm(logger.config.colors.object.value)(value) + ",";
			}

			object_log_type.default_handler(toLog);
		});
	}
	if (level === 1) {
		object_log_type.default_handler('}');
	}
}

function log_array(array, level) {
	level = level || 1;

	if (level === 1) {
		object_log_type.default_handler('[');
	}

	if (_.isArray(array)) {
		_.each(array, function(value) {
			var toLog = "";
			for (var i = 0; i < level; i++) {
				toLog += "  ";
			}
			if (_.isArray(value)) {
				toLog += "[";
				object_log_type.default_handler(toLog);
				log_array(value, level + 1);
				toLog = "";
				for (var i = 0; i < level; i++) {
					toLog += "  ";
				}
				toLog += "]"

			} else if (_.isString(value)) {
				toLog += '"' + clc.xterm(logger.config.colors.string)(value) + '",';
			} else if (_.isObject(value)) {
				toLog += "{";
				object_log_type.default_handler(toLog);
				log_object(value, level + 1);
				toLog = "";
				for (var i = 0; i < level; i++) {
					toLog += "  ";
				}
				toLog += "}"
			} else {
				toLog += clc.xterm(logger.config.colors.object.value)(value) + ",";
			}

			object_log_type.default_handler(toLog);
		});
	}

	if (level === 1) {
		object_log_type.default_handler(']');
	}
}