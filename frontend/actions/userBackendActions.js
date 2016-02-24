var UserUtil = require('../util/userUtil.js');

var UserBackendActions = {
  fetchAllUsers: function() {
    UserUtil.fetchAllUsers();
  }
};

module.exports = UserBackendActions;
