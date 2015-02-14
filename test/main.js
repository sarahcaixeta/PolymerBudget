var assert = require('assert');

// FIXME: move to a more serious module loader (browserify, AMD, ES6)
moment = require('moment');

// FIXME: see above
require('../main');

describe('main', function() {
	describe('#classAccordingToValidation', function() {
		it('returns `hidden` when the first day is before the second', function(){
      var firstDay = moment("2015-02-01").toDate();
      var secondDay = moment("2016-02-01").toDate();
			var className = classAccordingToValidation(firstDay, secondDay);
      assert.equal(className, 'hidden');
		});
		it('returns `errorLabel` when the first day is after the second', function(){
			var firstDay = moment("2015-02-01").toDate();
			var secondDay = moment("2016-02-01").toDate();
			var className = classAccordingToValidation(secondDay, firstDay);
			assert.equal(className, 'errorLabel');
		});
	});
});
