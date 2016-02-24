var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');
var UserStore = new Store(AppDispatcher);
var UserConstants = require('../constants/userConstants.js');
var SessionConstants = require('../constants/sessionConstants.js');

var _users = {};

UserStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case (UserConstants.RECEIVE_ALL_USERS):
      UserStore.updateUsers(payload.data);
      UserStore.__emitChange();
      break;
    case (SessionConstants.USER_SIGN_UP):
      UserStore.addUser(payload.data);
      UserStore.__emitChange();
      break;
    case (UserConstants.UPDATE_USER):
      UserStore.addUser(payload.data);
      UserStore.__emitChange();
      break;
  }
};

UserStore.addUser= function(user) {
  _users[user.id] = user;
};

UserStore.updateUsers = function(usersData) {
  _users = {};
  usersData.forEach(function(user) {
    _users[user.id] = user;
  });
};

UserStore.all = function() {
  var users = [];
  for (var id in _users) {
    users.push(_users[id]);
  }
  return users;
};

UserStore.findById = function(id) {
  return _users[id];
};

module.exports = UserStore;
