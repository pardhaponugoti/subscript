var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');

var ReviewStore = new Store(AppDispatcher);
var ReviewConstants = require('../constants/reviewConstants.js');

var _reviews = [];
var _reviewsByUserId = {};
var _reviewsBySubscriptionId = {};

ReviewStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case (ReviewConstants.RECEIVE_NEW_REVIEW):
      console.log("ReviewReceivedByStore");
      ReviewStore.addReview(payload.data);
      ReviewStore.__emitChange();
      break;
    // case (ReviewConstants.UPDATE_REVIEW):
    //   ReviewStore.updateReview(payload.data);
    //   ReviewStore.updateReviews(_reviews);
    //   ReviewStore.__emitChange();
    //   break;
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
  if (_reviewsBySubscriptionId[review.subscription_id] === undefined) {
    _reviewsBySubscriptionId[review.subscription_id] = [review];
  } else {
    _reviewsBySubscriptionId[review.subscription_id].push(review);
  }
};

ReviewStore.updateReview = function(review) {
  _reviews[review.id] = review;
};

ReviewStore.updateReviews = function(reviewsData) {
  _reviews = {};
  _reviewsByUserId = {};
  _reviewsBySubscriptionId = {};

  reviewsData.forEach(function(review) {
    _reviews[review.id] = review;

    if (_reviewsByUserId[review.author_id] === undefined) {
      _reviewsByUserId[review.author_id] = [review];
    } else {
      _reviewsByUserId[review.author_id].push(review);
    }

    if (_reviewsBySubscriptionId[review.subscription_id] === undefined) {
      _reviewsBySubscriptionId[review.subscription_id] = [review];
    } else {
      _reviewsBySubscriptionId[review.subscription_id].push(review);
    }
  });

  console.log("finished updating reviews");
};

ReviewStore.deleteReview = function(data) {
  var id = data.id;
  delete _reviews[id];
};

ReviewStore.findByUserId = function(userId) {
  console.log("finding by user id");
  if (_reviewsByUserId === {}) {
    return undefined;
  } else if (_reviewsByUserId[userId] === undefined) {
    return [];
  } else {
    return _reviewsByUserId[userId];
  }
};

ReviewStore.findBySubscriptionId = function(subscriptionId) {
  if (_reviewsBySubscriptionId === {}) {
    return undefined;
  } else if (_reviewsBySubscriptionId[subscriptionId] === undefined) {
    return [];
  } else {
    return _reviewsBySubscriptionId[subscriptionId];
  }
};

// ReviewStore.returnChron

ReviewStore.all = function() {
  var reviews = [];
  for (var id in _reviews) {
    reviews.push(_reviews[id]);
  }
  return reviews;
};

module.exports = ReviewStore;
