var SubscriptionFrontendActions = require('../actions/subscriptionFrontendActions.js');

var SubscriptionUtil = {
  fetchAllSubscriptions: function() {
    $.ajax({
      url: "/api/subscriptions",
      type: "GET",
      success: function(data) {
        SubscriptionFrontendActions.receiveAllSubscriptions(data);
      }
    });
  }
};

module.exports = SubscriptionUtil;
