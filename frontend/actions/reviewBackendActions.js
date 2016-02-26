var ReviewUtil = require('../util/reviewUtil.js');

var ReviewBackendActions = {
  // create Review
  createReview: function(reviewParams, callback) {
    ReviewUtil.createReview(reviewParams, callback);
  },

  // edit Review
  editReview: function(reviewParams, callback) {
    ReviewUtil.editReview(reviewParams, callback);
  },

  // all reviews
  fetchAllReviews: function(callback) {
    ReviewUtil.fetchAllReviews(callback);
  }

};


module.exports = ReviewBackendActions;
