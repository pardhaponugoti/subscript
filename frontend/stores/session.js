var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');

var SessionStore = new Store(AppDispatcher);
var UserStore = require('./user.js');
var SessionConstants = require('../constants/sessionConstants.js');
var UserConstants = require('../constants/userConstants.js');

SessionStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case (SessionConstants.USER_SIGN_IN):
      window.localStorage.setItem('pardhauser', JSON.stringify(payload.data));
      SessionStore.__emitChange();
      break;
    case (SessionConstants.USER_SIGN_UP):
      window.localStorage.setItem('pardhauser', JSON.stringify(payload.data));
      SessionStore.__emitChange();
      break;
    case (SessionConstants.USER_SIGN_OUT):
      window.localStorage.setItem('pardhauser', JSON.stringify({}));
      SessionStore.__emitChange();
      break;
    case (UserConstants.UPDATE_USER):
      window.localStorage.setItem('pardhauser', JSON.stringify(payload.data));
      SessionStore.__emitChange();
      break;
    case (UserConstants.DELETE_USER):
      window.localStorage.setItem('pardhauser', JSON.stringify({}));
      SessionStore.__emitChange();
      break;
  }
};

SessionStore.currentUser = function() {
  return JSON.parse(window.localStorage.getItem('pardhauser'));
};

// SessionStore.newUser = function() {
//   return _newUser;
// };

SessionStore.loggedIn = function() {
  return SessionStore.currentUser().email !== undefined;
};

module.exports = SessionStore;
