var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');

var SessionStore = new Store(AppDispatcher);
var UserStore = require('./user.js');
var SessionConstants = require('../constants/sessionConstants.js');
var UserConstants = require('../constants/userConstants.js');

//Get initial from localStorage and set to local variable
var _currentUser = _currentUser || JSON.parse(window.localStorage.getItem('pardhauser')) || {};

SessionStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case (SessionConstants.USER_SIGN_IN):
      SessionStore.signInUser(payload.data);
      SessionStore.__emitChange();
      break;
    case (SessionConstants.USER_SIGN_UP):
      SessionStore.signInUser(payload.data);
      SessionStore.__emitChange();
      break;
    case (SessionConstants.USER_SIGN_OUT):
      SessionStore.signOutUser();
      SessionStore.__emitChange();
      break;
    case (UserConstants.UPDATE_USER):
      SessionStore.signInUser(payload.data);
      SessionStore.__emitChange();
      break;
    case (UserConstants.DELETE_USER):
      SessionStore.signOutUser();
      SessionStore.__emitChange();
      break;
  }
};

SessionStore.signInUser = function(data) {
  _currentUser = data;
  window.localStorage.setItem('pardhauser', JSON.stringify(data));
};

SessionStore.signOutUser = function() {
  _currentUser = {};
  window.localStorage.setItem('pardhauser', JSON.stringify({}));
};

SessionStore.currentUser = function() {
  return _currentUser;
};

SessionStore.loggedIn = function() {
  return _currentUser.email !== undefined;
};

module.exports = SessionStore;
