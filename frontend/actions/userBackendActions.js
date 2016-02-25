var UserUtil = require('../util/userUtil.js');

var UserBackendActions = {
  fetchAllUsers: function() {
    UserUtil.fetchAllUsers();
  },
  updateUser: function(userData) {
    UserUtil.updateUser(userData);
  },
  deleteUser: function(userId) {
    UserUtil.deleteUser(userId);
  }
};

module.exports = UserBackendActions;
