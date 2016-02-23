var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');
var UserStore = new Store(AppDispatcher);

var _users = [];
