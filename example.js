var loq = require('./source/lo-q');

var myFunc = function() {
	throw new Error("This is a sample exception");
};

var testObj = {
	key1: 'value1',
	key2: 42,
	obj1: {
		testarray: [32, 33, 58, {
			array_obj_key: 1,
			array_obj_thing: 2
		}]
	}
};


loq.log('This is a basic "INFO" log');
loq.info('This does the same as above');
loq.debug('Debug logs that can be toggled by setting the logging threshold');
loq.threshold = 2;
loq.debug("This statement won't show up.");
loq.warn("This is a warning!");
loq.error("This is an error that gives me a handy stack trace for better debugging.");

try {
	myFunc();
} catch (exception) {
	loq.exception(exception);
}

// You can also log out objects
// Lo-q will color code them and
// automatically indent them for you

loq.object(testObj);

var myLogType = {
	name: 'good',
	level: 2,
	_cmd: ['good'],
	prefix: {
		text: 'OK',
		color: 2,
		background: 16
	}
}

loq.addCustomType(myLogType);

loq.good("Custom log types are neat!")