var ReviewUtil = require('../util/reviewUtil.js');

var ReviewBackendActions = {
  // create Review
  createReview: function(reviewParams, successCallback, errorCallback) {
    ReviewUtil.createReview(reviewParams, successCallback, errorCallback);
  },

  // edit Review
  editReview: function(reviewParams, successCallback, errorCallback) {
    ReviewUtil.editReview(reviewParams, successCallback, errorCallback);
  },

  // delete Review
  deleteReview: function(reviewId, callback) {
    ReviewUtil.deleteReview(reviewId, callback);
  },

  // all reviews
  fetchAllReviews: function(callback) {
    ReviewUtil.fetchAllReviews(callback);
  }

};


module.exports = ReviewBackendActions;
