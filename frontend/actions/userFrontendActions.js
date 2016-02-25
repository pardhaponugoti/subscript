var AppDispatcher = require('../dispatcher.js');
var UserConstants = require('../constants/userConstants.js');

var UserFrontendActions = {
  // On Load, User Create
  receiveAllUsers: function(usersData) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_ALL_USERS,
      data: usersData
    });
  },

  // User update
  updateCurrentUser: function(userData) {
    AppDispatcher.dispatch({
      actionType: UserConstants.UPDATE_USER,
      data: userData
    });
  },

  // User delete
  deleteCurrentUser: function(data) {
    AppDispatcher.dispatch({
      actionType: UserConstants.DELETE_USER,
      data: data
    });
  }

};

module.exports = UserFrontendActions;
