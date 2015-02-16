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

	describe('#sumOfExpenses', function(){
		it('returns zero if there is no expense in the list', function(){
			var total = sumOfExpenses([]);
			assert.equal(total, 0);
		});
		it('returns 10 when there\'s one expense with price of 10', function(){
			var expenses = [{price: 10}];
			assert.equal(sumOfExpenses(expenses), 10);
		});
		it('returns the sum of expenses when there are two expenses', function(){
			var expenses = [{price: 10}, {price: 5}];
			assert.equal(sumOfExpenses(expenses), 15);
		});
	});

	describe('#differenceBetweenDays', function(){
		it('returns 1 when the initial and final day are the same', function(){
			var day = moment("2015-01-25");
			assert.equal(differenceBetweenDays(day, day), 1);
		});
		it('returns 2 when the final date is one day after the first', function(){
			var firstDay = moment("2015-01-25");
			var finalDay = moment("2015-01-26");
			assert.equal(differenceBetweenDays(firstDay, finalDay), 2);
		});
		it('returns 30 when there is a period of one month', function(){
			var firstDay = moment("2015-01-01");
			var finalDay = moment("2015-01-30");
			assert.equal(differenceBetweenDays(firstDay, finalDay), 30);
		});
		it('returns 2 when the final day is tomorrow', function(){
			var firstDay = moment().subtract(10, 'days');
			var finalDay = moment().add(1, 'days');
			assert.equal(differenceBetweenDays(firstDay, finalDay), 2);
		});
	});

	describe('#calculateDailyBudget', function(){
		describe('there\'s no expense in the period', function(){
			var expenses = [];
			it ('returns 10 when the budget is 10 for a period of one day', function(){
				var day = moment("2015-01-25");
				var dailyBudget = calculateDailyBudget(day, day, 10, expenses);
				assert.equal(dailyBudget, 10);
			});
			it ('returns 20 when the budget is 140 for a period of one week', function(){
				var dailyBudget = calculateDailyBudget(moment("2015-02-01"), moment("2015-02-07"), 140, expenses);
				assert.equal(dailyBudget, 20);
			});
		});

		describe('the expenses sum is 50', function(){
			var expenses = [{price: 50}];
			it ('returns 10 when the budget is 60 for a period of one day', function(){
				var day = moment("2015-01-25");
				var dailyBudget = calculateDailyBudget(day, day, 60, expenses);
				assert.equal(dailyBudget, 10);
			});
			it ('returns 20 when the budget is 190 for a period of one week', function(){
				var dailyBudget = calculateDailyBudget(moment("2015-02-01"), moment("2015-02-07"), 190, expenses);
				assert.equal(dailyBudget, 20);
			});
		});
	});
});
