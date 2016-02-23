var SessionActions = require('../actions/sessionActions.js');
var Dispatcher = require('../dispatcher.js');
var SessionConstants = require('../constants/sessionConstants.js');

var SessionUtil = {
  signInUser : function(userParams) {
    $.ajax({
      url : "/api/session",
      type: "POST",
      data: userParams,
      success: function(data) {
        Dispatcher.dispatch({
          actionType: SessionConstants.USER_SIGN_IN,
          data: data
        });
      },
      error: function(data) {
        console.log("Incorrect Details");
      }
    });
  },
  checkForSignIn : function() {
    $.ajax({
      url : "/api/session/new",
      type: "GET",
      success: function(data) {
        Dispatcher.dispatch({
          actionType: SessionConstants.USER_SIGN_IN,
          data: data
        });
      },
      error: function(data) {
        console.log("Incorrect Details");
      }
    });
  }

};


module.exports = SessionUtil;
