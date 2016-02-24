var SessionFrontendActions = require('../actions/sessionFrontendActions.js');

var SessionUtil = {
  // on page load
  checkForSignIn : function() {
    console.log("checkforsignin");
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
    console.log("signupuser");
    console.log(userParams);
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
    console.log("signinuser");
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
    console.log("signoutuser");
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
