var AppDispatcher = require('../dispatcher.js');
var SessionConstants = require('../constants/sessionConstants.js');

var SessionFrontendActions = {
  // session create, users create
  receiveUserSignUp: function(userData) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.USER_SIGN_UP,
      data: userData
    });
  },
  receiveUserSignIn: function(userParams) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.USER_SIGN_IN,
      data: userParams
    });
  },

  // session destroy
  signOutUser: function() {
    console.log("Actions");
    AppDispatcher.dispatch({
      actionType: SessionConstants.USER_SIGN_OUT
    });
  }
};

module.exports = SessionFrontendActions;
