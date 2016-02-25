var SessionFrontendActions = require('../actions/sessionFrontendActions.js');

var SessionUtil = {
  // on page load
  checkForSignIn : function(callback) {
    $.ajax({
      url : "/api/session/new",
      type: "GET",
      success: function(data) {
        SessionFrontendActions.receiveUserSignIn(data);
        if (callback) {
          callback();
        }
      }
    });
  },

  // session create and users create
  signUpUser : function(userParams, callback) {
    $.ajax({
      url : "/api/users",
      type: "POST",
      data: userParams,
      success: function(data) {
        SessionFrontendActions.receiveUserSignUp(data);
        if (callback) {
          callback(data.id);
        }
      }
    });
  },
  signInUser : function(userParams, callback) {
    $.ajax({
      url : "/api/session",
      type: "POST",
      data: userParams,
      success: function(data) {
        SessionFrontendActions.receiveUserSignIn(data);
        if (callback) {
          callback(data.id);
        }
      }
    });
  },

  // session destroy
  signOutUser : function(callback) {
    $.ajax({
      url : "/api/session",
      type: "DELETE",
      success: function(data) {
        if(callback) {
          callback();
        }
        SessionFrontendActions.signOutUser();
      }
    });
  },

};


module.exports = SessionUtil;
