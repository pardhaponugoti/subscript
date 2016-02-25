var SessionFrontendActions = require('../actions/sessionFrontendActions.js');

var SessionUtil = {
  // on page load
  checkForSignIn : function(callback) {
    $.ajax({
      url : "/api/session/new",
      type: "GET",
      success: function(data) {
        if (callback) {
          callback();
        }
        SessionFrontendActions.receiveUserSignIn(data);
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
        if (callback) {
          callback(data.id);
        }
        SessionFrontendActions.receiveUserSignUp(data);
      }
    });
  },
  signInUser : function(userParams, callback) {
    $.ajax({
      url : "/api/session",
      type: "POST",
      data: userParams,
      success: function(data) {
        if (callback) {
          callback(data.id);
        }
        SessionFrontendActions.receiveUserSignIn(data);
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
