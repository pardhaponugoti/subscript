var SessionUtil = require('../util/sessionUtil.js');

var SessionBackendActions = {
  // on site load
  checkForUser: function() {
    SessionUtil.checkForSignIn();
  },

  // session create, users create
  signInUser: function(userParams, callback) {
    SessionUtil.signInUser(userParams, callback);
  },
  signUpUser: function(userParams, callback) {
    SessionUtil.signUpUser(userParams, callback);
  },

  //session destroy
  signOutUser: function(callback) {
    SessionUtil.signOutUser(callback);
  }

};


module.exports = SessionBackendActions;
