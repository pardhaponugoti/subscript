var UserUtil = require('../util/userUtil.js');

var UserBackendActions = {
  fetchAllUsers: function() {
    UserUtil.fetchAllUsers();
  },
  updateUser: function(userData, callback) {
    UserUtil.updateUser(userData, callback);
  },
  deleteUser: function(userId, callback) {
    UserUtil.deleteUser(userId, callback);
  }
};

module.exports = UserBackendActions;
