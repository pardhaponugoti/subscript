var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');

var ReviewStore = new Store(AppDispatcher);
var ReviewConstants = require('../constants/reviewConstants.js');

var _reviews = {};
var _reviewsByUserId = {};

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
  if (_reviewsByUserId[review.author_id] === undefined) {
    _reviewsByUserId[review.author_id] = [review];
  } else {
    _reviewsByUserId[review.author_id].push(review);
  }
};

ReviewStore.updateReviews = function(reviewsData) {
  _reviews = {};
  reviewsData.forEach(function(review) {
    _reviews[review.id] = review;

    if (_reviewsByUserId[review.author_id] === undefined) {
      _reviewsByUserId[review.author_id] = [review];
    } else {
      _reviewsByUserId[review.author_id].push(review);
    }
  });
};

ReviewStore.deleteReview = function(data) {
  var id = data.id;
  delete _reviews[id];
};

ReviewStore.findByUserId = function(userId) {
  if (_reviewsByUserId === {}) {
    return undefined;
  } else if (_reviewsByUserId[userId] === undefined) {
    return [];
  } else {
    return _reviewsByUserId[userId];
  }
};

ReviewStore.all = function() {
  var reviews = [];
  for (var id in _reviews) {
    reviews.push(_reviews[id]);
  }
  return reviews;
};

module.exports = ReviewStore;
