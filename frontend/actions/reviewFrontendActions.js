var AppDispatcher = require('../dispatcher.js');
var ReviewConstants = require('../constants/reviewConstants.js');

var ReviewFrontendActions = {
  // review create
  receiveNewReview: function(reviewData) {
    AppDispatcher.dispatch({
      actionType: ReviewConstants.RECEIVE_NEW_REVIEW,
      data: reviewData
    });
  },

  // update Review
  updateReview: function(reviewData) {
    AppDispatcher.dispatch({
      actionType: ReviewConstants.RECEIVE_ALL_REVIEWS,
      data: reviewData
    });
  },

  //delete Review
  deleteReview: function(reviewsData) {
    AppDispatcher.dispatch({
      actionType: ReviewConstants.RECEIVE_ALL_REVIEWS,
      data: reviewsData
    });
  },

  // all reviews
  receiveAllReviews: function(reviewsData) {
    AppDispatcher.dispatch({
      actionType: ReviewConstants.RECEIVE_ALL_REVIEWS,
      data: reviewsData
    });
  }
};

module.exports = ReviewFrontendActions;
