var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');

var ReviewStore = new Store(AppDispatcher);
var ReviewConstants = require('../constants/reviewConstants.js');

var _reviews = {};

ReviewStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case (ReviewConstants.RECEIVE_NEW_REVIEW):
      console.log("ReviewReceivedByStore");
      ReviewStore.addReview(payload.data);
      ReviewStore.__emitChange();
      break;
    case (ReviewConstants.RECEIVE_ALL_REVIEWS):
      console.log("allReviewsReceivedByStore");
      ReviewStore.updateReviews(payload.data);
      ReviewStore.__emitChange();
      break;
  }
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
