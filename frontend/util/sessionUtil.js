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
  signUpUser : function(userParams, successCallback, errorCallback) {
    $.ajax({
      url : "/api/users",
      type: "POST",
      data: userParams,
      success: function(data) {
        successCallback(data.id);
        SessionFrontendActions.receiveUserSignUp(data);
      },
      error: function(data) {
        errorCallback(data.responseText);
      }
    });
  },
  signInUser : function(userParams, successCallback, errorCallback) {
    $.ajax({
      url : "/api/session",
      type: "POST",
      data: userParams,
      success: function(data) {
        successCallback(data.id);
        SessionFrontendActions.receiveUserSignIn(data);
      },
      error: function(data) {
        errorCallback(data.responseText);
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
