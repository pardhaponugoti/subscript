var AppDispatcher = require('../dispatcher.js');
var UserConstants = require('../constants/userConstants.js');

var UserFrontendActions = {
  // User create, users create
  receiveAllUsers: function(usersData) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_ALL_USERS,
      data: usersData
    });
  },

  // User update
  updateCurrentUser: function(userData) {
    console.log("updatecurrentuser");
    AppDispatcher.dispatch({
      actionType: UserConstants.UPDATE_USER,
      data: userData
    });
  }

};

module.exports = UserFrontendActions;
