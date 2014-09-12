var _ = require('underscore');
var clc = require('cli-color');
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
		var context = this;
		var buffer = new bufferModel();
		// We don't need the prefix
		args.shift();
		_.each(args, function(obj) {
			logObject(context, buffer, obj);
		});
	}
};

function bufferModel() {
	var buffer = "";
	var level = 0;

	this.add = function(val) {
		buffer += val;
	};

	this.push = function(context, val) {
		val = val || "";
		this.add(val);
		this.flush(context);
	};

	this.get = function() {
		return buffer;
	};

	this.put = function(newBuff) {
		buffer = newBuff;
	}

	this.flush = function(context) {
		context._log(buffer);
		this.clear();
	};

	this.clear = function() {
		buffer = "";
	}

	this.addLevel = function() {
		level++;
	};

	Object.defineProperty(this, 'isEmpty', {
		get: function() {
			return (buffer.replace(/\s/g, '').length === 0);
		}
	})
}

function logObject(context, buffer, obj, level) {
	level = level || 1;

	if (level === 1) {
		buffer.add("{");
		level += 1;
	}
	if (_.isObject(obj)) {
		_.each(obj, function(value, key) {
			buffer.push(context);
			buffer.add(getIndentation(level));
			buffer.add(clc.xterm(context.config.colors.object.key)(key) + " : ");
			parseValue(context, buffer, level, value);
		});
	}

	if (level - 1 === 1) {
		buffer.clear();
		buffer.push(context, '}');
	}
}

function parseValue(context, buffer, level, value) {
	if (_.isArray(value)) {
		buffer.add("[ ");
		log_array(context, buffer, value, level + 1);
		trimComma(buffer);
		buffer.push(context, " ]")
	} else if (_.isString(value)) {
		buffer.add('"' + clc.xterm(context.config.colors.string)(value) + '", ');
	} else if (_.isObject(value)) {
		buffer.add('{');
		logObject(context, buffer, value, level + 1);
		trimComma(buffer);
		if (!buffer.isEmpty) {
			buffer.push(context);
			buffer.add(getIndentation(level));
		}
		buffer.add('}');
	} else {
		buffer.add(clc.xterm(context.config.colors.object.value)(value) + ", ");
	}
}

function getIndentation(level) {
	level = level || 1;

	return (Array(level).join('  ')).slice(-level)
}

function trimComma(buffer) {
	var buff = buffer.get().split('');

	if (buff[buff.length - 1] === ' ' && buff[buff.length - 2] === ',') {
		buff.splice(buff.length - 2);
	}

	buffer.put(buff.join(''));
	return;
}

function log_array(context, buffer, array, level) {
	level = level || 1;

	if (level === 1) {
		buffer.add('[');
		level++;
	}

	if (_.isArray(array)) {
		_.each(array, function(value) {
			parseValue(context, buffer, level, value);
		});
	}

	if (level - 1 === 1) {
		buffer.push(']');
	}
}