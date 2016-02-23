var SessionActions = require('../actions/sessionActions.js');
var SessionConstants = require('../constants/sessionConstants.js');

var SessionUtil = {
  signUpUser : function(userParams) {
    $.ajax({
      url : "/api/users",
      type: "POST",
      data: userParams,
      success: function(data) {
        SessionActions.receiveUserSignUp(data);
      },
      error: function(data) {
        console.log("Incorrect Details");
      }
    });
  },
  signInUser : function(userParams) {
    $.ajax({
      url : "/api/session",
      type: "POST",
      data: userParams,
      success: function(data) {
        SessionActions.receiveUserSignIn(data);
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
        debugger;
        SessionActions.receiveUserSignIn(data);
      },
      error: function(data) {
        console.log("Incorrect Details");
      }
    });
  }

};


module.exports = SessionUtil;
