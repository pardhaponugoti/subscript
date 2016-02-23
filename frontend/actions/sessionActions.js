var SessionUtil = require('../util/sessionUtil.js');
var Dispatcher = require('../dispatcher.js');
var SessionConstants = require('../constants/sessionConstants.js');

var SessionActions = {
  signInUser: function(userParams) {
    SessionUtil.signInUser(userParams);
  },
  receiveSignIn: function(userData) {
    console.log(userData);
    Dispatcher.dispatch({
      actionType: SessionConstants.USER_SIGN_IN,
      data: userData
    });
  }
};

module.exports = SessionActions;
