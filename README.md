lo-q
===

Lo-Q is a node logging library that allows you to better structure your logs for consitency and readability.

Install
--------

>npm install lo-q

Basics
--------

Lo-q comes pre-packaged with basic log types to help make the most of your logs. Simply require the module and you can start logging more intelligently.

```
var loq = require('lo-q');

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
```

The above code will produce something similar to the image below, depending on your terminal settings.

![A cool console](http://i.imgur.com/oZoD1nm.png)

Log Types
--------

Lo-Q provides a simple API for creating custom log types as well! Define your log type as a simple object and pass it to your logger to add a log type to it.

### Example
```
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

loq.good("Custom log types are neat!");
```

![Custom log types are neat](http://i.imgur.com/pehKWY5.png)

the <code>color</code> and <code>background</code> fields can be applied to the main object or the prefix object to modify how lo-q displays them. A color must be a number corresponding to the desired XTerm color code.

**Note** This API is subject to change pretty quickly. For more info check out the issues section in GitHub

--------
Contributing
--------

As of right now lo-q is just a module I made for the sake of creating a module but I would love to expand on it and add more features as well as cooler built in log methods. If you have any ideas open a GitHub issue. Pull requests are more than welcome and by all means report any bugs. Feel free to improve upon the documentation if you would like as well!

Feel free to reach out to me [on twitter](http://twitter.com/cosrnos) as well!