classAccordingToValidation = function(from, to) {
  if (moment(to) < moment(from)){
    return 'errorLabel';
  } else {
    return 'hidden';
  }
},
calculateBudget = function(from, to, amount){
  var today = moment();
  var initialDay = moment(from);
  var finalDay = moment(to);
  var diffDays = 1;
  if (today < initialDay || today > finalDay){
    diffDays = finalDay.diff(initialDay, 'days');
  } else {
    diffDays = finalDay.diff(today, 'days');
  }
  return (amount / diffDays).toFixed(2);
},
sumOfExpenses = function(expenses) {
  var total = 0;
  for (var i = 0; i < expenses.length; i++){
    total += Number(expenses[i].price);
  }
  console.log(total);
  return total;
}