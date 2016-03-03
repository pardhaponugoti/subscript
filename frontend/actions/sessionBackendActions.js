var SessionUtil = require('../util/sessionUtil.js');

var SessionBackendActions = {
  // on site load
  checkForUser: function() {
    SessionUtil.checkForSignIn();
  },

  // session create, users create
  signInUser: function(userParams, successCallback, errorCallback) {
    SessionUtil.signInUser(userParams, successCallback, errorCallback);
  },
  signUpUser: function(userParams, successCallback, errorCallback) {
    SessionUtil.signUpUser(userParams, successCallback, errorCallback);
  },

  //session destroy
  signOutUser: function(callback) {
    SessionUtil.signOutUser(callback);
  }

};


module.exports = SessionBackendActions;
