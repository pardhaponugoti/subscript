var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');
var SubscriptionStore = new Store(AppDispatcher);

var SubscriptionConstants = require('../constants/subscriptionConstants.js');

var _subscriptions = {};

SubscriptionStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case (SubscriptionConstants.RECEIVE_ALL_SUBSCRIPTIONS):
      SubscriptionStore.updateSubscriptions(payload.data);
      SubscriptionStore.__emitChange();
      break;
  }

};

SubscriptionStore.addSubscription= function(subscription) {
  _subscriptions[subscription.id] = subscription;
};

SubscriptionStore.updateSubscriptions = function(subscriptionsData) {
  _subscriptions = {};
  subscriptionsData.forEach(function(subscription) {
    _subscriptions[subscription.id] = subscription;
  });
};

SubscriptionStore.deleteSubscription = function(data) {
  var id = data.id;
  delete _subscriptions[id];
};

SubscriptionStore.all = function() {
  var subscriptions = [];
  for (var id in _subscriptions) {
    subscriptions.push(_subscriptions[id]);
  }
  return subscriptions;
};

SubscriptionStore.findById = function(id) {
  return _subscriptions[id];
};

module.exports = SubscriptionStore;
