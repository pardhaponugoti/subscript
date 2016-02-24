var UserUtil = require('../util/userUtil.js');

var UserBackendActions = {
  fetchAllUsers: function() {
    UserUtil.fetchAllUsers();
  },
  updateUser: function(userData) {
    UserUtil.updateUser(userData);
  }
};

module.exports = UserBackendActions;
