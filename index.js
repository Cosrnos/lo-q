var logger = require('./source/lo-q.js');
logger.debug('test');
logger.log('test');
logger.info('test');
logger.warn('test');
logger.error('This is an error');
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

logger.object(testObj);

try {
	throw new Error("This is a sample exception");
} catch (ex) {
	logger.ex(ex);
}