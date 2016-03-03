var UserUtil = require('../util/userUtil.js');

var UserBackendActions = {
  fetchAllUsers: function() {
    UserUtil.fetchAllUsers();
  },
  updateUser: function(userData, successCallback, errorCallback) {
    UserUtil.updateUser(userData, successCallback, errorCallback);
  },
  deleteUser: function(userId, callback) {
    UserUtil.deleteUser(userId, callback);
  }
};

module.exports = UserBackendActions;
