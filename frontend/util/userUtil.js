var UserFrontendActions = require('../actions/userFrontendActions.js');

var UserUtil = {
  // on page load
  fetchAllUsers: function() {
    $.ajax({
      url : "/api/users",
      type: "GET",
      success: function(data) {
        UserFrontendActions.receiveAllUsers(data);
      }
    });
  },
  updateUser: function(userData, callback) {
    $.ajax({
      url: "/api/users/" + userData.id,
      type: 'PATCH',
      data: userData,
      success: function(data) {
        UserFrontendActions.updateCurrentUser(data);
        if (callback) {
          callback();
        }
      }
    });
  },
  deleteUser: function(userId, callback) {
    $.ajax({
      url: "/api/users/" + userId,
      type: 'DELETE',
      data: {id: userId},
      success: function(data) {
        UserFrontendActions.deleteCurrentUser(data);
        if (callback) {
          callback();
        }
      }
    });
  }

};


module.exports = UserUtil;
