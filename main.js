classAccordingToValidation = function(from, to) {
  if (moment(to) < moment(from)){
    return 'errorLabel';
  } else {
    return 'hidden';
  }
};

calculateDailyBudget = function(from, to, amount, expenses){
  var diffDays = differenceBetweenDays(from, to);
  var realbudget = amount - sumOfExpenses(expenses);
  return (realbudget / diffDays).toFixed(2);
};

differenceBetweenDays = function(from, to){
  var today = moment().startOf('day');
  var initialDay = moment(from).startOf('day');
  var finalDay = moment(to).startOf('day');
  var diff = 1;
  if (today < initialDay || today > finalDay){
    diff += finalDay.diff(initialDay, 'days');
  } else {
    diff += finalDay.diff(today, 'days');
  }
  return diff;
};

sumOfExpenses = function(expenses) {
  var total = 0;
  for (var i = 0; i < expenses.length; i++){
    total += Number(expenses[i].price);
  }
  return total;
};
