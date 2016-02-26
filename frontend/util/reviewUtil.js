var ReviewFrontendActions = require('../actions/reviewFrontendActions.js');

var ReviewUtil = {
  // create new review
  createReview: function(reviewParams, callback) {
    $.ajax({
      url : "/api/reviews",
      type: "POST",
      data: reviewParams,
      success: function(data) {
        if (callback) {
          callback();
        }
        ReviewFrontendActions.receiveNewReview(data);
      }
    });
  },

  // all reviews (on app load)
  fetchAllReviews: function(callback) {
    $.ajax({
      url : "/api/reviews",
      type: "GET",
      success: function(data) {
        if (callback) {
          callback();
        }
        ReviewFrontendActions.receiveAllReviews(data);
      }
    });
  }
};

module.exports = ReviewUtil;
