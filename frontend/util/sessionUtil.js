var SessionFrontendActions = require('../actions/sessionFrontendActions.js');
var SessionConstants = require('../constants/sessionConstants.js');

var SessionUtil = {
  // on page load
  checkForSignIn : function() {
    $.ajax({
      url : "/api/session/new",
      type: "GET",
      success: function(data) {
        SessionFrontendActions.receiveUserSignIn(data);
      }
    });
  },

  // session create and users create
  signUpUser : function(userParams) {
    $.ajax({
      url : "/api/users",
      type: "POST",
      data: userParams,
      success: function(data) {
        SessionFrontendActions.receiveUserSignUp(data);
      }
    });
  },
  signInUser : function(userParams) {
    $.ajax({
      url : "/api/session",
      type: "POST",
      data: userParams,
      success: function(data) {
        SessionFrontendActions.receiveUserSignIn(data);
      }
    });
  },

  // session destroy
  signOutUser : function() {
    $.ajax({
      url : "/api/session",
      type: "DELETE",
      success: function(data) {
        console.log(data.message);
        SessionFrontendActions.signOutUser();
      }
    });
  },

};


module.exports = SessionUtil;
