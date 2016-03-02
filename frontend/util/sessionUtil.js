var SessionFrontendActions = require('../actions/sessionFrontendActions.js');

var SessionUtil = {
  // on page load
  checkForSignIn : function(callback) {
    $.ajax({
      url : "/api/session/new",
      type: "GET",
      success: function(data) {
        console.log("userDataSuccess:" + data);
        SessionFrontendActions.receiveUserSignIn(data);
        if (callback) {
          callback();
        }
      },
      error: function(data) {
        console.log("userDataError:" + data);
        SessionFrontendActions.signOutUser();
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
