var UserFrontendActions = require('../actions/userFrontendActions.js');

var UserUtil = {
  // on page load
  fetchAllUsers: function() {
    console.log("signinuser");
    $.ajax({
      url : "/api/users",
      type: "GET",
      success: function(data) {
        UserFrontendActions.receiveAllUsers(data);
      }
    });
  }

};


module.exports = UserUtil;
