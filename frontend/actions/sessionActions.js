var SessionUtil = require('../util/sessionUtil.js');
var AppDispatcher = require('../dispatcher.js');
var SessionConstants = require('../constants/sessionConstants.js');

var SessionActions = {
  signInUser: function(userParams) {
    SessionUtil.signInUser(userParams);
  },
  signUpUser: function(userParams) {
    SessionUtil.signUpUser(userParams);
  },
  checkForUser: function() {
    SessionUtil.checkForSignIn();
  },
  receiveUserSignIn: function(userData) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.USER_SIGN_IN,
      data: userData
    });
  },
  receiveUserSignUp: function(userData) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.USER_SIGN_UP,
      data: userData
    });
  }
};

module.exports = SessionActions;
