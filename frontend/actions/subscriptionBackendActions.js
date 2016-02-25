var SubscriptionUtil = require('../util/subscriptionUtil.js');

var SubscriptionBackendActions = {
  // on site load
  fetchAllSubscriptions: function() {
    SubscriptionUtil.fetchAllSubscriptions();
  },

  // subscription create
  createSubscription: function(subscriptionParams, callback) {
    SubscriptionUtil.createSubscription(subscriptionParams, callback);
  }

};


module.exports = SubscriptionBackendActions;
