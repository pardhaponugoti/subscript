var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');
var SessionStore = new Store(AppDispatcher);

var SessionConstants = require('../constants/sessionConstants.js');


var _currentUser = {};

SessionStore.__onDispatch = function(payload) {
  console.log("session store");
  switch (payload.actionType) {
    case (SessionConstants.USER_SIGN_IN):
      _currentUser = payload.data;
      SessionStore.__emitChange();
      break;
  }
};

SessionStore.currentUser = function() {
  return _currentUser;
};

SessionStore.loggedIn = function() {
  return _currentUser.email !== undefined;
};

module.exports = SessionStore;
