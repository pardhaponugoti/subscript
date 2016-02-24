var SessionUtil = require('../util/sessionUtil.js');

var SessionBackendActions = {
  // on site load
  checkForUser: function() {
    SessionUtil.checkForSignIn();
  },

  // session create, users create
  signInUser: function(userParams) {
    SessionUtil.signInUser(userParams);
  },
  signUpUser: function(userParams) {
    SessionUtil.signUpUser(userParams);
  },

  //session destroy
  signOutUser: function() {
    SessionUtil.signOutUser();
  }

};


module.exports = SessionBackendActions;
