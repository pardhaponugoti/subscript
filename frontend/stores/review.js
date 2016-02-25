var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');

var ReviewStore = new Store(AppDispatcher);
var SessionConstants = require('../constants/sessionConstants.js');
var UserConstants = require('../constants/userConstants.js');

var _reviews = {};

ReviewStore.__onDispatch = function(payload) {

};

ReviewStore.addReview= function(review) {
  _reviews[review.id] = review;
};

ReviewStore.updateReviews = function(reviewsData) {
  _reviews = {};
  reviewsData.forEach(function(review) {
    _reviews[review.id] = review;
  });
};

ReviewStore.deleteReview = function(data) {
  var id = data.id;
  delete _reviews[id];
};

ReviewStore.all = function() {
  var reviews = [];
  for (var id in _reviews) {
    reviews.push(_reviews[id]);
  }
  return reviews;
};

module.exports = ReviewStore;
