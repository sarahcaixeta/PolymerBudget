classAccordingToValidation = function(from, to) {
  if (moment(to) < moment(from)){
    return 'errorLabel';
  } else {
    return 'hidden';
  }
}