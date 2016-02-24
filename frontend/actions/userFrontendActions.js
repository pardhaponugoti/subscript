var AppDispatcher = require('../dispatcher.js');
var UserConstants = require('../constants/userConstants.js');

var UserFrontendActions = {
  // User create, users create
  receiveAllUsers: function(usersData) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_ALL_USERS,
      data: usersData
    });
  }

};

module.exports = UserFrontendActions;
