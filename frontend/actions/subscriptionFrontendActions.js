var AppDispatcher = require('../dispatcher.js');
var SubscriptionConstants = require('../constants/subscriptionConstants.js');

var SubscriptionFrontendActions = {
  receiveAllSubscriptions: function(data) {
    AppDispatcher.dispatch({
      actionType: SubscriptionConstants.RECEIVE_ALL_SUBSCRIPTIONS,
      data: data
    });
  }
};

module.exports = SubscriptionFrontendActions;
