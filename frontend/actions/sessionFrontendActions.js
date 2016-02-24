var AppDispatcher = require('../dispatcher.js');
var SessionConstants = require('../constants/sessionConstants.js');

var SessionFrontendActions = {
  // session create, users create
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
  },

  // session destroy
  signOutUser: function() {
    AppDispatcher.dispatch({
      actionType: SessionConstants.USER_SIGN_OUT
    });
  }
};

module.exports = SessionFrontendActions;
