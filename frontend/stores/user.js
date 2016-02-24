var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');
var UserStore = new Store(AppDispatcher);
var UserConstants = require('../constants/userConstants.js');

var _users = [];

UserStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case (UserConstants.RECEIVE_ALL_USERS):
      _users = payload.data;
      UserStore.__emitChange();
      break;
  }
};
